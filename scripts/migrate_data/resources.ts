import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';
import {fetch} from 'undici'

import {createClient} from '@supabase/supabase-js'

interface ResourceV1 {
  "_id": {
    "$oid": string,
  },
  "__v": number,
  "description": string, //"CRS-E-Entite-v-FR.pdf"
  "mimetype": string, //"application/pdf",
  "originalname": string, //"CRS-E-Entite-v-FR.pdf"
  "size": string, //"485983",
  "titre": string,
  "url_thumbnail": string, //"https://podcast.mines-nantes.fr/cartographie_beta/uploads/1490877768779_CRS-E-Entite-v-FR.thumbnail.png",
  "url": string, //"https://podcast.mines-nantes.fr/cartographie_beta/uploads/1490877768756_CRS-E-Entite-v-FR.pdf",
}

const readJsonFile = async (path) => {
  const file = await fs.open(path);
  console.log(`Found file at path. Reading file…`)
  const fileContent = await file.readFile({encoding: 'utf-8'});
  const json = JSON.parse(fileContent);
  console.log(`Found ${json.length} items on file.`)
  file.close();
  return json
}

const mapResource = (resourceV1: ResourceV1) => {
  //Fallback si y'a pas de filename pour supabase
  const urlName = resourceV1.titre || resourceV1.url.match(/.*(\/.*)$/)?.[0] || resourceV1.url
  return {
    idv1: resourceV1._id.$oid,
    name: resourceV1.titre || resourceV1.originalname || resourceV1.description || urlName,
    url: resourceV1.url,
    filename: resourceV1.originalname || urlName,
    description: resourceV1.description,
  }
}
/**
 * args :
 * - resourcesPath : path/to/resources.json
 */
export default async ({ args }) => {
  try {
    console.log(args)

    const resources: [ResourceV1] = await readJsonFile(args.resourcesPath);
    //Création du client supabase
    console.log(`Creating supabase client with .env val : SUPABASE_URL and SUPABASE_SERVICE_KEY (service key with all rights)`);
    //@ts-expect-error
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }})
    if(!process.env.CTP_SUPABASE_RESOURCE_BUCKET)
      throw "No CTP_SUPABASE_RESOURCE_BUCKET in .env"

    const BUCKET = process.env.CTP_SUPABASE_RESOURCE_BUCKET;

    const { data, error } = await supabase.storage.createBucket(BUCKET)
    //@ts-ignore { message: 'The resource already exists', status: 400 }
    if(error.status == 400){
      console.log("Bucket already exists");
      const { data, error } = await supabase.storage.emptyBucket(BUCKET)
      console.log("Bucket cleared");
    }
    else if(error) {
      throw error;
    }
    else console.log("Bucket created : ", data);

    async.mapLimit(resources, 4, async (resource) => {
      try{
        let _resource = mapResource(resource);
        //https://dev.to/antoine_m/upload-media-to-supabase-from-remote-url-with-nodejs-5h45
        const urlMatch = _resource.url.match(/^(\/uploads\/)|http(s)?\:\/\/(?:www\.)?cartotalents\.fr/)
        if(urlMatch){
          //Si l'URL est relative, on append le nom de domaine
          const urlToFetch = `${urlMatch[0] == "/uploads/" ? "https://www.cartotalents.fr":""}${_resource.url}`
          console.log(`Fetching ${urlToFetch}`)
          const res = await fetch(urlToFetch).catch(error => {throw error})
          if(!res)
              return "URL invalid"
          const file = await res.blob()
          // console.log("File : ", file)

          //@ts-expect-error File is a blob
          const { data, error } = await supabase.storage.from(BUCKET).upload(_resource.filename, file)
          if(error)
            return error;

          const { publicURL } = supabase.storage.from(BUCKET).getPublicUrl(_resource.filename)
          // console.log("Public Url : ", publicURL)
          _resource.url = publicURL
        }

        let db_resource = await db.resource.create({ data: _resource});
        // console.log("Resource : ", db_resource)
        return db_resource
      }
      catch(e) {
        return e
      }
    }, (err, results) => {
      if (err) console.error(err)
      // results is now an array of the response bodies
      console.log(`Inserted ${results.length} resources`)
    })
  }
  catch (err) {
    console.error(err)
  }
}