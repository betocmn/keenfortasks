# README

KeenForTasks - A demo project for managing schedules and tasks. It's written in Typescript, Node.js, PostgreSQL, GraphQL, Prisma and RedwoodJS and it's deployed as AWS Lambdas via Netlify.

> **Prerequisites**
> - [Node.js](https://nodejs.org/en/) (=20.x)
> - [Yarn](https://yarnpkg.com/) (>=1.22.21)
> - [Git](https://git-scm.com/)


## Running the project for the first time

#### 1. Clone the repository and navigate to the project root:
```
git clone git@github.com:betocmn/keenfortasks.git
cd keenfortasks
```

#### 2. Make sure you have a postgres database up and running. You can use docker, for example:

##### 2.1 (optional) in dev container

```sh
POSTGRES_HOST_AUTH_METHOD=trust postgres -p 5432 >logfile 2>&1 &
```

##### 2.2 not in dev container

```
docker pull postgres
docker run --name async -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 -d postgres
```
Note that we're setting the database auth method to `trust`, that means that the database won't ask for passwords on authentication.

You will need the db connection details in the next step. Make sure you have an empty database for it.

#### 3. Create a `.env` on the project root and fill it out using `.env.example` as a base:

#### 4. Run the schema and migrations on your local database:
```
yarn rw prisma migrate dev
yarn rw data-migrate up
```
`rw` is short for `redwoodjs`

#### 5. Run the application:
```
yarn rw dev
```

Your browser should automatically open to http://localhost:8910.

But you can go to the GraphQL Playground at http://localhost:8911/graphql.

#### 6. Run the tests:
```
yarn rw test
```


## My Notes on Known Limitations & TODOs
- I chose RedwoodJS just for speed since I've been using it in the last few years. But with more time I would probably do it in nestjs + fastify.
- There's an easy plugin on Redwood to generate REST endpoints from the GraphQL definitions, I might come back to do this anyways.
- I used camelCases for some attribute names (which is different than the instructions), this was known and just for standard purposes with GraphQL and RedwoodJS.
- Must-Have TODOs: Cache, Rate Limiting, Logging & Monitoring, Role-based Access Control (RBAC), Timezone handling, IP Address Whitelisting
