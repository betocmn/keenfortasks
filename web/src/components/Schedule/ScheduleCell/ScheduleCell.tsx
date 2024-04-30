import type { FindScheduleById, FindScheduleByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Schedule from 'src/components/Schedule/Schedule'

export const QUERY: TypedDocumentNode<
  FindScheduleById,
  FindScheduleByIdVariables
> = gql`
  query FindScheduleById($id: String!) {
    schedule: schedule(id: $id) {
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

export const Empty = () => <div>Schedule not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindScheduleByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  schedule,
}: CellSuccessProps<FindScheduleById, FindScheduleByIdVariables>) => {
  return <Schedule schedule={schedule} />
}
