import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';
import { readJsonFile } from "./_common";

interface CompetenceV1 {
  "_id": {
    "$oid": string,
  },
  "__v": number,
  "title": string,
  "type": string,
  "referentiel": string,
  "url": string,
}

const mapCompetence = (competenceV1: CompetenceV1) => {
  return {
    idv1: competenceV1._id.$oid,
    name: competenceV1.title,
    type: competenceV1.type || "transversal",
    url: competenceV1.url
  }
}
/**
 * args :
 * - competencesDisciplinairesPath : path/to/competences.json
 * - competencesTransversalesPath : path/to/lexiques.json
 */
export default async ({ args }) => {
  try {
    console.log(args)

    const competencesDisciplinaires: [CompetenceV1] = await readJsonFile(args.competencesDisciplinairesPath);
    const competencesTransversales: [CompetenceV1] = await readJsonFile(args.competencesTransversalesPath);

    //Fusion des lexiques V1 et pratiques actuelles
    var competences = _.values(_.merge(_.keyBy(competencesDisciplinaires, '_id.$oid'), _.keyBy(competencesTransversales, '_id.$oid')));
    // console.log(mapLexiquePractice);

    const competencesMapped = competences.map(mapCompetence)
    // console.log(competencesMapped);

    async.mapLimit(competencesMapped, 1, async (competence) => {
        const Competence = await db.competence.create({ data: competence });
        console.log("Competence : ", competence.name)
        return Competence;
    }, (err, results) => {
      if (err) console.error(err)
      // results is now an array of the response bodies
      console.log(`Inserted ${results.length} competences`)
    })
  }
  catch (err) {
    console.error(err)
  }
}