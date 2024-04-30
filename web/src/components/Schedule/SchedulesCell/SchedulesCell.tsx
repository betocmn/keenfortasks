import type { FindSchedules, FindSchedulesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Schedules from 'src/components/Schedule/Schedules'

export const QUERY: TypedDocumentNode<
  FindSchedules,
  FindSchedulesVariables
> = gql`
  query FindSchedules {
    schedules {
      id
      accountId
      agentId
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No schedules yet. '}
      <Link to={routes.newSchedule()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindSchedules>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  schedules,
}: CellSuccessProps<FindSchedules, FindSchedulesVariables>) => {
  return <Schedules schedules={schedules} />
}
