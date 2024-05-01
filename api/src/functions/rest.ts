import { useSofa } from '@graphql-yoga/plugin-sofa'

import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  graphiQLEndpoint: 'rest',
  extraPlugins: [
    useSofa({
      basePath: '/rest/api',
      swaggerUI: {
        endpoint: '/swagger',
      },
    }),
  ],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
