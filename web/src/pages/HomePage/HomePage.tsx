import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata
        title="KeenForTasks"
        description="A demo project for managing schedules and tasks. It's written in Typescript, Node.js, PostgreSQL, GraphQL, Prisma and RedwoodJS and it's deployed as AWS Lambdas via Netlify."
      />

      <h1>KeenForTasks</h1>

      <h3>APIs:</h3>
      <ul>
        <li>
          <a
            href="https://keenfortasks.netlify.app/.netlify/functions/graphql"
            target="_blank"
            rel="noreferrer"
          >
            GraphQL Docs & Playground
          </a>
        </li>
        <li>
          <a
            href="https://keenfortasks.netlify.app/.netlify/functions/rest/api/swagger"
            target="_blank"
            rel="noreferrer"
          >
            REST Docs & Playground
          </a>
        </li>
      </ul>

      <h3>DEMO: Web Forms to test the API:</h3>
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
      </ul>
    </>
  )
}

export default HomePage
