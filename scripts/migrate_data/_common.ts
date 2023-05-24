import {createClient} from '@supabase/supabase-js'
import fs from 'fs/promises'
import cliProgress from 'cli-progress';

/**
 * Création du client supabase
 * @returns supabase : client supabase js
 */
export const createSupabaseClient = () => {
  console.log(`Creating supabase client with .env val : SUPABASE_URL and SUPABASE_SERVICE_KEY (service key with all rights)`);
  //@ts-expect-error
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }})
}
export const initSupabaseBucket = async (bucket, clearIfExists = false, isBucketPublic = true) => {
  if(!bucket)
    throw "No bucket passed"

  const supabaseClient = createSupabaseClient()

  const { data, error } = await supabaseClient.storage.createBucket(bucket, {public: isBucketPublic})
  //@ts-ignore { message: 'The resource already exists', status: 400 }
  if(error?.status == 400){
    console.log("Bucket already exists");
    if(clearIfExists){
      const { data, error } = await supabaseClient.storage.emptyBucket(bucket)
      console.log("Bucket cleared");
    }
  }
  else if(error) {
    throw error;
  }
  else console.log("Bucket created : ", data);

  return supabaseClient;
}
export const downloadToSupabase = async (url, supabaseClient, bucket) => {
  const urlMatch = url?.match(/^(\/uploads\/)|(\/avatars\/)|http(s)?\:\/\/(?:www\.)?cartotalents\.fr/)
  if(urlMatch){
    //Si l'URL est relative, on append le nom de domaine
    const urlToFetch = `${urlMatch[0].match(/(uploads)|(avatars)/) ? "https://www.cartotalents.fr":""}${url}`
    const filename = url.match(/(?:.*)\/(.*)$/)?.[1]

    // console.log(`Fetching ${urlToFetch}`)
    const res = await fetch(urlToFetch).catch(error => {throw error})
    if(!res)
        throw "URL invalid"
    const file = await res.blob()
    // console.log("File : ", file)

    const { data, error } = await supabaseClient.storage.from(bucket).upload(filename, file).catch(error => {throw error})
    // if(error)
    //   return error;

    const { publicURL } = supabaseClient.storage.from(bucket).getPublicUrl(filename)
    // console.log("Public Url : ", publicURL)
    return publicURL
  }
  return null
}
export const readJsonFile = async (path) => {
  const file = await fs.open(path);
  // console.log(`Found file at path. Reading file…`)
  const fileContent = await file.readFile({encoding: 'utf-8'});
  const json = JSON.parse(fileContent);
  // console.log(`Found ${json.length} items on file.`)
  file.close();
  return json
}


export const logErrorOnFile = async (data, path = "./scripts/migrate_data/error.log") => {
  const file = await fs.appendFile(path, JSON.stringify(data,null,2));
  // console.log(`Found file at path. Reading file…`)
}

export const createProgressBar = (name = "Items") => {
  // create a new progress bar instance and use shades_classic theme
  const bar = new cliProgress.SingleBar({
    format: ` {bar} | ${name} {value}/{total}`,
  }, cliProgress.Presets.shades_classic);
  return bar;
}

export const PromisifyScript = (script) => {
  return new Promise((resolve, reject) => {
    //Timeout pour laisser les logs de Redwood s'afficher sans chambouler la barre de progression
    setTimeout(async ()=> {
      try {
        script(resolve, reject)
      }
      catch (err) {
        console.error(err)
        reject(err)
      }
    }, 1000)
  });
}