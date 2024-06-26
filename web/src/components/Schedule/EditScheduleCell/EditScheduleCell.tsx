import type {
  EditScheduleById,
  UpdateScheduleInput,
  UpdateScheduleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ScheduleForm from 'src/components/Schedule/ScheduleForm'

export const QUERY: TypedDocumentNode<EditScheduleById> = gql`
  query EditScheduleById($id: String!) {
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

const UPDATE_SCHEDULE_MUTATION: TypedDocumentNode<
  EditScheduleById,
  UpdateScheduleMutationVariables
> = gql`
  mutation UpdateScheduleMutation($id: String!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ schedule }: CellSuccessProps<EditScheduleById>) => {
  const [updateSchedule, { loading, error }] = useMutation(
    UPDATE_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Schedule updated')
        navigate(routes.schedules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateScheduleInput,
    id: EditScheduleById['schedule']['id']
  ) => {
    updateSchedule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Schedule {schedule?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm
          schedule={schedule}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
