import type {
  DeleteScheduleMutation,
  DeleteScheduleMutationVariables,
  FindScheduleById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_SCHEDULE_MUTATION: TypedDocumentNode<
  DeleteScheduleMutation,
  DeleteScheduleMutationVariables
> = gql`
  mutation DeleteScheduleMutation($id: String!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`

interface Props {
  schedule: NonNullable<FindScheduleById['schedule']>
}

const Schedule = ({ schedule }: Props) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('Schedule deleted')
      navigate(routes.schedules())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Schedule {schedule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{schedule.id}</td>
            </tr>
            <tr>
              <th>Account id</th>
              <td>{schedule.accountId}</td>
            </tr>
            <tr>
              <th>Agent id</th>
              <td>{schedule.agentId}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(schedule.startTime)}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{timeTag(schedule.endTime)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(schedule.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(schedule.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSchedule({ id: schedule.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(schedule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Schedule
