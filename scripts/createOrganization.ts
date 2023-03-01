import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  try {
    console.log(args)
    const organization = await db.organization.create({ data: { name: args.organizationName || "Default" }, select: { id: true } })
    return console.log(`Organization created with id ${organization.id}`);
  }
  catch (err) {
    console.error(err)
  }
}