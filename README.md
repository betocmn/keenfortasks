# README

KeenForTasks - A demo API for managing schedules and tasks via GraphQL or REST. It's written in Typescript, Node.js, PostgreSQL, Prisma and RedwoodJS and it's deployed as AWS Lambdas via Netlify.

> **Prerequisites**
> - [Node.js](https://nodejs.org/en/) (=20.x)
> - [Yarn](https://yarnpkg.com/) (>=1.22.21)
> - [Git](https://git-scm.com/)

## Demo & Examples

You can sign-up for an ugly web demo of the API calls. You can use agentId and accountID as 1 (they both already exist).

Go to https://keenfortasks.netlify.app/

### GraphQL Playground

Also, you can go to the GraphQL playground at https://keenfortasks.netlify.app/.netlify/functions/graphql (I would never expose this in production... This is just for DEMO purposes)

Example API Calls (with auth disabled for quick demo purposes):

[Create Schedule](https://keenfortasks.netlify.app/.netlify/functions/graphql?query=mutation+CreateSchedule+%7B%0A++createSchedule%28input%3A+%7B%0A++++accountId%3A+1%2C%0A++++agentId%3A+1%2C%0A++++startTime%3A+%222025-06-01T07%3A04%3A07.000Z%22%2C%0A++++endTime%3A+%222025-06-01T07%3A06%3A02.000Z%22%0A++%7D%29+%7B%0A++++id%0A++++accountId%0A++++agentId%0A++++startTime%0A++++endTime%0A++%7D%0A%7D%0A#)

[Create Task](https://keenfortasks.netlify.app/.netlify/functions/graphql?query=mutation+CreateTask+%7B%0A++createTask%28input%3A+%7B%0A++++accountId%3A+1%0A++++scheduleId%3A+%220efb1c05-ce65-4a4f-b4b2-8a8007314aef%22%0A++++startTime%3A+%222024-08-01T07%3A06%3A07.000Z%22%0A++++duration%3A+60%0A++++type%3A+work%0A++%7D%29+%7B%0A++++id%0A++++accountId%0A++++scheduleId%0A++++startTime%0A++++duration%0A++++type%0A++++createdAt%0A++++updatedAt%0A++%7D%0A%7D#)

### REST Playground

Again, enabled here for testing purposes: Go to the REST Swagger Playground at https://keenfortasks.netlify.app/.netlify/functions/rest/api/swagger.

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
- I have auth working, but intentionally enabled two endpoints listed on the top of this doc to "skipAuth" for demo purposes.
- I would definitely create a single `CreateScheduleAndTasks` mutation for better performance and validation.
- I used camelCases for some attribute names (which is different than the instructions), this was known and just for standard purposes with GraphQL and RedwoodJS.
- Must-Have TODOs: GraphQL snapshot tests, Cache, Rate Limiting, Logging & Monitoring, Role-based Access Control (RBAC), Timezone handling, IP Address Whitelisting...
