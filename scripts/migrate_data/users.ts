import { db } from 'api/src/lib/db'
import fs from 'fs/promises'
import _ from 'lodash'
import async from 'async';

import { createProgressBar, createSupabaseClient, logErrorOnFile, readJsonFile } from "./_common";

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

interface PedagoV1 {
  _id: { $oid: string, },
  createdAt: { $date: string },
  updatedAt: { $date: string },
  avatar : String, //Avatar
  name: String, //Nom et prénom (champ texte brut)
  job_title: String, //Profession (Conseiller pédagogique, Ingénieur pédagogique, Responsable d’une structure d’appui à la pédagogie)
  experience_years : Number, //Nombre d’années d’expérience (nombre)

  email: String, //Adresse e-mail (champ texte brut type e-mail), éventuellement récupéré via Shibboleth
  eppn: String, //Récupéré par shibboleth
  phone : String, //Téléphone
  organization : {  //Etablissement
    name : String, // Nom (champ texte brut), normalisé via API Google maps
    address: String, // Adresse (champ texte brut), récupérée automatiquement via API Google maps
    logo : String, //Logo de l'établissement
    position: { //Longitude et latitude, récupérées automatiquement via API Google maps.
      latitude: Number,
      longitude: Number
    }
  },
  link_website : String, //Site web (champ texte brut type URL)
  structure: {
    name: String, //Nom de la structure (champ texte brut)
    contact: String //Coordonnées de la structure (champ texte brut)
  },
  contact_mode : String, //Mode de contact préféré, sélection parmi la liste suivante : E-mail professionnel, Téléphone professionnel, Contact via formulaire
  // hide_email : Boolean,
  free_description : String, //Description générale des méthodes d’accompagnement (champ texte brut)
  typologies_actions : [{$oid: String}],// [{type: mongoose.Schema.Types.ObjectId, ref: 'TypologieAction'}],
  technics : [{$oid: String}],// [{type: mongoose.Schema.Types.ObjectId, ref: 'Lexique'}],
  activities : [{$oid: String}],// [{type: mongoose.Schema.Types.ObjectId, ref: 'Lexique'}],
  methods : [{$oid: String}],// [{type: mongoose.Schema.Types.ObjectId, ref: 'Lexique'}],
  ressources : [{$oid: String}],// [{type: mongoose.Schema.Types.ObjectId, ref: 'Ressource'}],

  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
}

const mapUserV1toUserV2 = (userV1: UserV1, practices) => {
  const fullname = userV1.profile.name.split(" "),
        surname = fullname.shift(),
        name = fullname.join(" ");

  const _practices = _.merge(userV1.profile.methods, userV1.profile.technics, userV1.profile.activities)

  return {
    idv1: userV1._id.$oid,
    //@ts-expect-error
    createdAt: userV1.createdAt?.$date || userV1.createdAt,
    updatedAt: userV1.updatedAt.$date,
    email: userV1.email,
    eppn: userV1.profile.eppn,
    image: userV1.profile.avatar,
    name: name,
    surname: surname,
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
      connect: _practices.map(practice => ({cuid: practice.$oid}))
    }
  }
}

const mapPedagoV1toUserV2 = (pedagoV1: PedagoV1, practices) => {
  const fullname = pedagoV1.name.split(" "),
        surname = fullname.shift(),
        name = fullname.join(" ");

  const _practices = _.merge(pedagoV1.methods, pedagoV1.technics, pedagoV1.activities)

  return {
    idv1: pedagoV1._id.$oid,
    createdAt: pedagoV1.createdAt?.$date,
    updatedAt: pedagoV1.updatedAt.$date,
    email: pedagoV1.email,
    eppn: pedagoV1.eppn,
    image: pedagoV1.avatar,
    name: name,
    surname: surname,
    phone: pedagoV1.phone,
    showEmail: pedagoV1.contact_mode == "email",
    showPhone: pedagoV1.contact_mode == "phone",
    job: pedagoV1.job_title,
    department: "",
    shortPresentation: pedagoV1.free_description,
    presentation: pedagoV1.free_description,
    // subjects: pedagoV1.teaching_specialities,
    organization: {
      connectOrCreate: {
        create: {
          name: pedagoV1.organization.name,
          address: pedagoV1.organization.address,
          latitude: pedagoV1.organization.position.latitude,
          longitude: pedagoV1.organization.position.longitude
        },
        where: {
          name: pedagoV1.organization.name
        }
      }
    },
    practices: {
      connect: _practices.map(practice => ({cuid: practice.$oid}))
    }
  }
}
/**
 * args :
 * - usersPath : path/to/users.json
 * - pedagosPath : path/to/pedagos.json
 */
export default ({ args }) => {
  //Timeout pour laisser les logs de Redwood s'afficher sans chambouler la barre de progression
  setTimeout(async ()=> {
    try {
      console.log(args)

      const users: [UserV1] = await readJsonFile(args.usersPath);
      const pedagos: [PedagoV1] = await readJsonFile(args.pedagosPath);

      let usersMapped = [
        ...users.map(mapUserV1toUserV2),
        ...pedagos.map(mapPedagoV1toUserV2)
      ]
      // console.log(usersMapped);

      const supabase = createSupabaseClient()
      const _bar = createProgressBar()
      _bar.start(usersMapped.length, 0);

      async.mapLimit(usersMapped, 1, async (user) => {
        try{
          _bar.increment()
          const {data, error} = await supabase.auth.api.createUser({
            email: user.email,
            email_confirm: true,
            // app_metadata: {provider: "email", providers: ["email"]},
            // user_metadata: {}
          }).catch(error => {throw error});

          if(error){
            // console.error(error, user.email)
            //https://github.com/caolan/async/issues/1480#issuecomment-334329832
            return {isError:true, ...error, email: user};
          }
          const User = await db.user.create({ data: {cuid: data.id, ...user} }).catch(error => {throw error});

          return User;
          // supabase.auth.signUp({ email: user.email, password: "azerty" }).catch(err => console.error(err)).then(()=> callback(null, user) )
        }
        catch (e) {
          return {isError:true, e, user}
        }
      }, (err, results) => {
        _bar.stop();
        if(err)
          console.error(err);
        //Generated errors
        const errors = results.filter(result => result.isError);
        if(errors)
          logErrorOnFile(errors)

        console.log(`Inserted ${results.length - errors.length} users with ${errors.length} errors`)
      })
    }
    catch (err) {
      console.error(err)
    }
  }, 1000)
}