import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
//https://mariusschulz.com/blog/importing-json-modules-in-typescript
// import allPractices from './seed_data/practice.json'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.PracticeCreateArgs['data'][] = allPractices;

    // console.log(
    //   "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    // )

    // // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // await db.practice.createMany({data})

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
