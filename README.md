# CTP

Stack :
- Docker
- Redwood for API / front boilerplate
- with Prisma and PostgreSQL
- with Supabase connected on the same PostgreSQL instance
- Faktory to handle background work.

## Docker

Run either docker-engine for server or docker-desktop for local dev.

Best used in conjunction with Tailscale for drop-in public IP, that you can map with your custom domain for over-the-internet communication testing.

See [ctp-front-rp](https://github.com/bigood/ctp-front-rp) for multiple instances of webservers (relay & multiple CTPs) locally.

## Supabase

Setup :
- Download sources of supabase
- Tweak .env accordingly, and run the containers: `docker-compose up -d`
- Then back in redwood, apply prisma's migrations using `yarn rw dm` and `yarn rw prisma db seed`

Login / signup is then done through OTP (one time password).

Implementation heavily inspired by these tutorials :
- Self hosting : https://supabase.com/docs/guides/self-hosting/docker
- Redwood setup : https://supabase.com/docs/guides/getting-started/tutorials/with-redwoodjs
- Prisma setup : https://supabase.com/docs/guides/integrations/prisma

Needs activation of multi schema discovery on prismic, currently in preview :

```conf
previewFeatures = ["multiSchema"] //https://github.com/prisma/prisma/issues/1175#issuecomment-1336491410
```


*Note : for dev, consider using mailtrap.io on Supabase docker .env for mail sending.*

## Import data from V1


Migrate all the data by specifying paths on *.env* var `CTP_MIGRATE_PATHS`, and execute `yarn rw exec migrate_data/all`.

Or migrate specific models by specifying paths:

### Users and lexique

```bash
yarn rw exec migrate_data/users_lexiques
  \ --usersPath=/Users/maen/Cloud/Work/Carto/2022/res/users.json
  \ --lexiquesPath=/Users/maen/Cloud/Work/Carto/2022/res/lexiques.json
```

### Competences

```bash
yarn rw exec migrate_data/competences
  \ --competencesDisciplinairesPath=/Users/maen/Dev/CTP/backup/json_v1_120423/competence.json
  \ --competencesTransversalesPath=/Users/maen/Dev/CTP/backup/json_v1_120423/competencetransversales.json
```

## Faktory

Run a docker instance with script *Docker: start faktory worker*, or this command:

```bash
docker run --name ctp-faktory -it -v `pwd`/.faktory:/var/lib/faktory/db -p 127.0.0.1:7419:7419 -p 127.0.0.1:7420:7420 contribsys/faktory:latest /faktory -b :7419 -w :7420
```

Then execute script/faktoryWoerker with redwood CLI, using the script *Redwood: start faktory script* or this command:

```bash
yarn rw exec faktoryWorker
```

Uses this lib internally : https://github.com/jbielick/faktory_worker_node


## Redwood

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

### Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

### Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

### Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

### Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

### Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

### Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)


# Default values

Use these commands to create a default organization on a fresh install:

```bash
yarn rw exec createOrganization --name CTP
```
Then create a user using the standard flow on **/auth**, and give it admin role with:

```bash
yarn rw exec setUserAdmin --email mjuganaikloo@gmail.com
```