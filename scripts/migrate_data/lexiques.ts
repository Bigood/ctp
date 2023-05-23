import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';

import { createProgressBar, logErrorOnFile, readJsonFile } from "./_common";

interface LexiqueV1 {
    "_id": { "$oid": string },
    "__v": number,
    "id": number,
    "title": string
    "synonym": string
    "description": string
    "short_description": string
    "weight": number,
    "sources": [ string ],
    "type": string
}
const mapLexique = (lexiqueV1: LexiqueV1) => {
  return {
    cuid: lexiqueV1._id.$oid,
    name: lexiqueV1.title,
    synonym: lexiqueV1.synonym?.split(","),
    description: lexiqueV1.description,
    shortDescription: lexiqueV1.short_description,
    sources: lexiqueV1.sources,
  }
}
/**
 * args :
 * - lexiquesPath : path/to/lexiques.json
 */
export default ({ args }) => {
  //Timeout pour laisser les logs de Redwood s'afficher sans chambouler la barre de progression
  setTimeout(async ()=> {
    try {
      console.log(args)
      const lexiques: [LexiqueV1] = await readJsonFile(args.lexiquesPath);
      const _bar = createProgressBar()
      _bar.start(lexiques.length, 0);
      const practices = lexiques.map(mapLexique)

      async.mapLimit(practices, 1, async (practice) => {// update the current value in your application..
        try{
          _bar.increment()
          const _practice = await db.practice.create({ data: practice }).catch(error => {throw error});
          return _practice;
        }
        catch (e) {
          return {isError:true, e, practice}
        }
      }, (err, results) => {
        _bar.stop();
        const errors = results.filter(result => result.isError);
        if(errors)
          logErrorOnFile(errors)
        console.log(`Inserted ${results.length - errors.length} initiatives with ${errors.length} errors`)
      })
    }
    catch (err) {
      console.error(err)
    }
  }, 1000)
}