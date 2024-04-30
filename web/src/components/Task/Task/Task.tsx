import type {
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  FindTaskById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_TASK_MUTATION: TypedDocumentNode<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
> = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

interface Props {
  task: NonNullable<FindTaskById['task']>
}

const Task = ({ task }: Props) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Task {task.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{task.id}</td>
            </tr>
            <tr>
              <th>Account id</th>
              <td>{task.accountId}</td>
            </tr>
            <tr>
              <th>Schedule id</th>
              <td>{task.scheduleId}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(task.startTime)}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{task.duration}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{formatEnum(task.type)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(task.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(task.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTask({ id: task.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(task.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Task
