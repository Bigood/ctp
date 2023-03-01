import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'

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

interface UserV1 {
  "_id": {
    "$oid": string,
  },
  "updatedAt": {
    "$date": string,
  },
  "createdAt": string | { "$date": string },
  "email": string,
  "password": string,
  "profile": {
    "id": string,
    "eppn": string,
    "name": string,
    "address": string,
    "organization": string,
    "contact_mode": string,
    "teaching_years": string,
    "free_description": string,
    "list_methods": [
      string
    ],
    "list_activities": [string],
    "list_technics": [string],
    "position": {
      "longitude": number,
      "latitude": number
    },
    "activities": [ { "$oid": string }],
    "avatar": string,
    "hide_email": boolean,
    "link_ressources": [string],
    "methods": [{ "$oid": string } ],
    "ressources": [{ "$oid": string } ],
    "technics": [{ "$oid": string } ],
    "phone": string,
    "teaching_specialities": string,
    "domaines_disciplinaires": [ { "$oid": string, } ]
  },
  "tokens": [string],
  "__v": number
}

const readJsonFile = async (path) => {
  const file = await fs.open(path);
  console.log(`Found file at path. Reading file…`)
  const fileContent = await file.readFile({encoding: 'utf-8'});
  const json = JSON.parse(fileContent);
  console.log(`Found ${json.length} items on file.`)
  return json
}

const mapUserV1toUserV2 = (userV1: UserV1, practices) => {
  return {
    cuid: userV1._id.$oid,
    // cuid: String!,
    createdAt: userV1.createdAt?.$date || userV1.createdAt,
    updatedAt: userV1.updatedAt.$date,
    email: userV1.email,
    eppn: userV1.profile.eppn,
    image: userV1.profile.avatar,
    name: userV1.profile.name,
    surname: userV1.profile.name,
    phone: userV1.profile.phone,
    showEmail: !userV1.profile.hide_email,
    showPhone: userV1.profile.contact_mode == "phone",
    job: `Enseignant depuis ${userV1.profile.teaching_years} années`,
    department: "",
    shortPresentation: userV1.profile.free_description,
    presentation: userV1.profile.free_description,
    subjects: userV1.profile.teaching_specialities,
    organization: {
      connectOrCreate: {
        create: {
          name: userV1.profile.organization,
          address: userV1.profile.address,
          latitude: userV1.profile.position.latitude,
          longitude: userV1.profile.position.longitude
        },
        where: {
          name: userV1.profile.organization
        }
      }
    },
    practices: {
      connect: _.intersectionWith(practices, userV1.profile.methods, userV1.profile.technics, userV1.profile.activities, (a,b) => (a._id.$oid == b.$oid))
      .map(practice => practice.id)
    }
  }
}
/**
 * args :
 * - usersPath : path/to/users.json
 * - lexiquesPath : path/to/lexiques.json
 */
export default async ({ args }) => {
  try {
    console.log(args)

    const users: [UserV1] = await readJsonFile(args.usersPath);
    const lexiques: [LexiqueV1] = await readJsonFile(args.lexiquesPath);
    const practices = await db.practice.findMany({});

    // const mapLexiquePractice = _.intersectionWith(practices, lexiques, (a, b) => (a.name == b.title));

    //Fusion des lexiques V1 et pratiques actuelles
    var merged = _.merge(_.keyBy(practices, 'name'), _.keyBy(lexiques, 'title'));
    var mapLexiquePractice = _.values(merged);
    console.log(mapLexiquePractice);

    const usersMapped = users.map(user => mapUserV1toUserV2(user, mapLexiquePractice))
    // console.log(usersMapped);
    const usersCreated = await Promise.all(usersMapped.map(userMapped => db.user.create({ data: userMapped })))
    return console.log(`Users created ${usersCreated}`);
  }
  catch (err) {
    console.error(err)
  }
}