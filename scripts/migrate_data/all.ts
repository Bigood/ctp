import users_lexiques from "./users_lexiques"
import competences from "./competences"

export default async function(){
  const paths = process.env.CTP_MIGRATION_PATHS;
  if(!paths)
    throw "No CTP_MIGRATION_PATHS JSON object found"
  console.log("Paths : ", process.env.CTP_MIGRATION_PATHS)

  // await users_lexiques({args:paths})
  // await competences({args:paths})
}