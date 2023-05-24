import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';
import {fetch} from 'undici'

import {createClient} from '@supabase/supabase-js'
import { PromisifyScript, createProgressBar, initSupabaseBucket, readJsonFile } from "./_common";

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
  return PromisifyScript(async (resolve, reject) => {
    console.log(args)

    const resources: [ResourceV1] = await readJsonFile(args.resourcesPath);

    const supabase = await initSupabaseBucket(process.env.CTP_SUPABASE_RESOURCE_BUCKET, true)

    const _bar = createProgressBar("Resources")
    _bar.start(resources.length, 0);

    async.mapLimit(resources, 4, async (resource) => {
      try{
        _bar.increment();
        let _resource = mapResource(resource);
        //https://dev.to/antoine_m/upload-media-to-supabase-from-remote-url-with-nodejs-5h45
        const urlMatch = _resource.url.match(/^(\/uploads\/)|http(s)?\:\/\/(?:www\.)?cartotalents\.fr/)
        if(urlMatch){
          //Si l'URL est relative, on append le nom de domaine
          const urlToFetch = `${urlMatch[0] == "/uploads/" ? "https://www.cartotalents.fr":""}${_resource.url}`
          // console.log(`Fetching ${urlToFetch}`)
          const res = await fetch(urlToFetch).catch(error => {throw error})
          if(!res)
              return "URL invalid"
          const file = await res.blob()
          // console.log("File : ", file)

          //@ts-expect-error File is a blob
          const { data, error } = await supabase.storage.from(process.env.CTP_SUPABASE_RESOURCE_BUCKET).upload(_resource.filename, file)
          if(error)
            return error;

          const { publicURL } = supabase.storage.from(process.env.CTP_SUPABASE_RESOURCE_BUCKET).getPublicUrl(_resource.filename)
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
      _bar.stop();
      if (err) console.error(err)
      // results is now an array of the response bodies
      console.log(`Inserted ${results.length} resources`)
      resolve({results})
    })
  });
}