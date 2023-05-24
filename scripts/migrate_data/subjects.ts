import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';
import { PromisifyScript, createProgressBar, readJsonFile } from "./_common";


interface SubjectV1 {
  "_id": {
    "$oid": string,
  },
  "__v": number,
  "title": string
}


const mapSubject = (domaineV1: SubjectV1) => {
  return {
    idv1: domaineV1._id.$oid,
    name: domaineV1.title
  }
}
/**
 * args :
 * - domainesDisciplinairesPath : path/to/domaines.json
 */
export default async ({ args }) => {
  return PromisifyScript(async (resolve, reject) => {

    const domainesDisciplinaires: [SubjectV1] = await readJsonFile(args.domainesDisciplinairesPath);

    const _bar = createProgressBar("Subjects")
    _bar.start(domainesDisciplinaires.length, 0);

    async.mapLimit(domainesDisciplinaires, 10, async (domaine) => {
      _bar.increment();
      const subject = mapSubject(domaine);
      const Subject = await db.subject.create({ data: subject });
      // console.log("Subject : ", subject.name)
      return Subject;
    }, (err, results) => {
      _bar.stop();
      if (err) console.error(err)
      // results is now an array of the response bodies
      console.log(`Inserted ${results.length} domaines`)
      resolve({results})
    })
  });
}