import type { EditTaskById, UpdateTaskInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  DatetimeLocalField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormTask = NonNullable<EditTaskById['task']>

interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  const onSubmit = (data: FormTask) => {
    props.onSave(data, props?.task?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTask> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="accountId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account id
        </Label>

        <NumberField
          name="accountId"
          defaultValue={props.task?.accountId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="scheduleId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Schedule id
        </Label>

        <TextField
          name="scheduleId"
          defaultValue={props.task?.scheduleId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="scheduleId" className="rw-field-error" />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.task?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="duration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>

        <NumberField
          name="duration"
          defaultValue={props.task?.duration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="duration" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="task-type-0"
            name="type"
            defaultValue="break"
            defaultChecked={props.task?.type?.includes('break')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Break</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="task-type-1"
            name="type"
            defaultValue="work"
            defaultChecked={props.task?.type?.includes('work')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Work</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskForm
