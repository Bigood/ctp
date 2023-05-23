
import { PrismaClient } from '@prisma/client'
// import { db } from 'api/src/lib/db'
import _ from 'lodash'
import async from 'async';
import cliProgress from 'cli-progress';
import { initSupabaseBucket, readJsonFile, downloadToSupabase, logErrorOnFile } from './_common'

export const db = new PrismaClient({
  log: [],
})

interface InitiativeV1 {
  "_id": {
    "$oid": string,
  },
  "createdAt": {
    "$date": String
  },
  "updatedAt": {
    "$date": String
  },
  "__v": number,
  title: String, //Titre de l’initiative pédagogique (champ texte brut, 140 caractères maximum)
  organization : {
    name : String,
    address: String,
    logo : String, //Logo de l'établissement
    location: {
      index: '2dsphere',
      type: [Number]
    },
    position: {
      latitude: Number,
      longitude: Number
    }
  },
  email: String, //Adresse e-mail de l'utilisateur qui l'a fait, pour utilisation filtre instance
  publics : [String], //Licence, Master, Doctorat
  other_public : String, //Autre (champ texte brut, 30 caractères maximum)
  competences_cibles : [String], // Compétences disciplinaires, Compétences transversales
  description : String, //Description de l’initiative (champ texte brut, 800 caractères maximum)
  contact : String, //Contact personne ressource (champ texte brut, 120 caractères maximum) ex : nom, prénom, titre professionnel, établissement, mail professionnel, téléphone professionnel.
  photo_header : String, //Photo principale bannière
  photo_side : String, //Photo secondaire de côté
  image_typologies : String, //Image du canvas des typologies, pour affichage dans le print (pas de JS dans ce fichier)
  sidebar_background_color : String, //Couleur choisie par l'utilisateur pour la sidebar
  sidebar_text_color : String, //Couleur choisie par l'utilisateur pour le texte sur la sidebar
  domaines_disciplinaires : [{$oid: String}], //Domaines disciplinaires (cases à cocher, plusieurs choix possibles)
  competences_disciplinaires : [String], //Compétences disciplinaires (champ libre, 3 maximum)
  competences_transversales : [{$oid: String}], //Domaines disciplinaires (cases à cocher, plusieurs choix possibles)
  ressources : [{$oid: String}], //Domaines disciplinaires (cases à cocher, plusieurs choix possibles)
  user : {$oid: String},
  structure : {$oid: String},
  pedago : {$oid: String},
  typologies : [{$oid: String}], // Typologies, parmi les typos Lexique
  //Informations complémentaires ElenForWork
  keywords : [String], //Mots clés (tableau), possibilité d’ajouter jusqu’à 5 items - Mot clé (champ texte brut, 50 caractères maximum)
  ressources_text : String, //Ressources (champ texte brut) ex : pédagogiques, humaines, budgétaires
  flow : String, //Déroulement (champ texte brut)
  evaluation : String, //Evaluation des apprentissages (champ texte brut)
  strong_points : String, //Points forts (champ texte brut) ex : retours des étudiants, point de vue de l’enseignant
  more_details : String //Recommandations, spécificités, transférabilité (champ texte brut)
}

const mapInitiative = (initiativeV1: InitiativeV1) => {
  const authorId = (initiativeV1.user || initiativeV1.pedago)?.$oid,
        authorBestMatch = {where: authorId ? {idv1 : authorId} : {email: initiativeV1.email}}

  //Push other_public for creation or connection by Prisma, as other levels
  if(initiativeV1.other_public)
    initiativeV1.publics.push(initiativeV1.other_public)

  return {
    idv1: initiativeV1._id.$oid,
    updatedAt: initiativeV1?.updatedAt.$date,
    createdAt: initiativeV1?.createdAt.$date,

    image : initiativeV1.photo_header,
    title : initiativeV1.title,
    contact : initiativeV1.contact,

    descriptionMD : initiativeV1.description,
    resourcesMD : initiativeV1.ressources_text,
    conditionsMD : initiativeV1.flow,
    evaluationMD : initiativeV1.evaluation,
    strengthsMD : initiativeV1.strong_points,
    transferabilityMD : initiativeV1.more_details,

    practices: {
      connect: initiativeV1.typologies.map(practice => ({ cuid: practice.$oid }))
    },
    tags: {
      connectOrCreate: initiativeV1.keywords.map(tag => ({ create: { name: tag, }, where: { name: tag } }))
    },
    subjects: {
      connect: initiativeV1.domaines_disciplinaires.map(domaine => ({ idv1: domaine.$oid }))
    },
    levels: {
      connectOrCreate: initiativeV1.publics.map(_public => ({ create: { name: _public, }, where: { name: _public } }))
    },
    resources: {
      connect: initiativeV1.ressources.map(ressource => ({ idv1: ressource.$oid  }))
    },
    competences: {
      connect: initiativeV1.competences_transversales.map(competence => ({ idv1: competence.$oid  })),
      create: initiativeV1.competences_disciplinaires.map(competence => ({ name: competence, type: "disciplinaire"}))
    },
    //networks
    //sponsors
    author: {
      connect: {email: initiativeV1.email}
    },
  }
}
/**
 * args :
 * - initiativesPath : path/to/initiatives.json
 */
export default ({ args }) => {
  //Timeout pour laisser les logs de Redwood s'afficher sans chambouler la barre de progression
  setTimeout(async() =>{
    try {
      console.log(args)

      const initiatives: [InitiativeV1] = await readJsonFile(args.initiativesPath);
      const supabase = await initSupabaseBucket(process.env.CTP_SUPABASE_INITIATIVE_BUCKET, true)

      // create a new progress bar instance and use shades_classic theme
      const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      // start the progress bar with a total value of 200 and start value of 0
      bar1.start(initiatives.length, 0);

      async.mapLimit(initiatives, 1, async (initiative) => {
        try{
          bar1.increment()
          let _initiative = mapInitiative(initiative);
          //https://dev.to/antoine_m/upload-media-to-supabase-from-remote-url-with-nodejs-5h45
          _initiative.image = await downloadToSupabase(initiative.photo_header, supabase, process.env.CTP_SUPABASE_INITIATIVE_BUCKET).catch(error => {throw error});

          // console.log("Creating initiative : ", _initiative.idv1)
          let db_initiative = await db.initiative.create({ data: _initiative})

          return db_initiative
        }
        catch(error) {
          return {isError: true, initiative: initiative, error};
        }
      }, (err, results) => {
        // stop the progress bar
        bar1.stop();
        if (err) return console.error(err)
        // results is now an array of the response bodies
        const errors = results.filter(result => result.isError);
        console.log(`Inserted ${results.length - errors.length} initiatives with ${errors.length} errors`)

        logErrorOnFile(errors)
        // errors.map(error => console.error({initiative: error.initiative._id, error: error.error}))
      })
    }
    catch (err) {
      console.error(err)
    }
  }, 1000)
}