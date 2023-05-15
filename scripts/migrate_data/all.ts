import users_lexiques from "./users_lexiques"
import competences from "./competences"
import subjects from "./subjects";

export default async function(){
  let paths = process.env.CTP_MIGRATION_PATHS;
  if(!paths)
    throw "No CTP_MIGRATION_PATHS JSON object found"
  try{
    paths = JSON.parse(paths);
  }
  catch(e) {
    throw e;
  }
  console.log("Paths : ", paths)

  await users_lexiques({args:paths})
  await competences({args:paths})
  await subjects({args:paths})
}