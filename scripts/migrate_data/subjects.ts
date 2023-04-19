import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';


interface SubjectV1 {
  "_id": {
    "$oid": string,
  },
  "__v": number,
  "title": string
}

const readJsonFile = async (path) => {
  const file = await fs.open(path);
  console.log(`Found file at path. Reading file…`)
  const fileContent = await file.readFile({encoding: 'utf-8'});
  const json = JSON.parse(fileContent);
  console.log(`Found ${json.length} items on file.`)
  return json
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
  try {
    console.log(args)

    const domainesDisciplinaires: [SubjectV1] = await readJsonFile(args.domainesDisciplinairesPath);


    async.mapLimit(domainesDisciplinaires, 10, async (domaine) => {
        const subject = mapSubject(domaine);
        const Subject = await db.subject.create({ data: subject });
        console.log("Subject : ", subject.name)
        return Subject;
    }, (err, results) => {
      if (err) console.error(err)
      // results is now an array of the response bodies
      console.log(`Inserted ${results.length} domaines`)
    })
  }
  catch (err) {
    console.error(err)
  }
}