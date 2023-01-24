import { db } from 'api/src/lib/db'

export default async ({args}) => {
  try {
    await db.user.update({
      data: {
        roles: "admin"
      },
      where: {
        email: args.email
      }
    })
    return console.log("User set as admin")
  }
  catch (err) {
    console.error(err)
  }
}