import lexiques from "./lexiques"
import users from "./users"
import competences from "./competences"
import subjects from "./subjects";
import resources from "./resources";
import initiatives from "./initiatives";

export default async function(){
  let path = process.env.CTP_MIGRATION_FOLDER_PATH;
  if(!path)
    throw "No CTP_MIGRATION_FOLDER_PATH found"
  console.log("Paths : ", path)

  const paths = {
    "competencesDisciplinairesPath": path + "competences.json",
    "competencesTransversalesPath": path + "competencetransversales.json",
    "domainesDisciplinairesPath": path + "domainedisciplinaires.json",
    "usersPath": path + "users.json",
    "lexiquesPath": path + "lexiques.json",
    "pedagosPath": path + "pedagos.json",
    "initiativesPath": path + "ficheinitiatives.json",
    "resourcesPath": path + "ressources.json"
  }
  await lexiques({args:paths})
  await users({args:paths}) //Depends on lexiques
  await competences({args:paths})
  await subjects({args:paths})
  await resources({args:paths})
  await initiatives({args:paths}) //Depends on resources and lexiques
}