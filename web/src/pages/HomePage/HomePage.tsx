import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata
        title="KeenForTasks"
        description="A demo project for managing schedules and tasks. It's written in Typescript, Node.js, PostgreSQL, GraphQL, Prisma and RedwoodJS and it's deployed as AWS Lambdas via Netlify."
      />

      <h1>KeenForTasks - Demo</h1>
      <ul>
        <li>
          <Link to={routes.login()}>Log-In</Link>
        </li>
        <li>
          <Link to={routes.signup()}>Sign-Up</Link>
        </li>
        <li>
          <Link to={routes.schedules()}>Manage Schedules</Link>
        </li>
        <li>
          <Link to={routes.tasks()}>Manage Tasks</Link>
        </li>
        <li>
          <a
            href="https://keenfortasks.netlify.app/.netlify/functions/graphql"
            target="_blank"
            rel="noreferrer"
          >
            GraphQL Docs & Playground
          </a>
        </li>
      </ul>
    </>
  )
}

export default HomePage
