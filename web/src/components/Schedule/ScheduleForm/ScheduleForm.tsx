import type { EditScheduleById, UpdateScheduleInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormSchedule = NonNullable<EditScheduleById['schedule']>

interface ScheduleFormProps {
  schedule?: EditScheduleById['schedule']
  onSave: (data: UpdateScheduleInput, id?: FormSchedule['id']) => void
  error: RWGqlError
  loading: boolean
}

const ScheduleForm = (props: ScheduleFormProps) => {
  const onSubmit = (data: FormSchedule) => {
    props.onSave(data, props?.schedule?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormSchedule> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.schedule?.accountId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="agentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Agent id
        </Label>

        <NumberField
          name="agentId"
          defaultValue={props.schedule?.agentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="agentId" className="rw-field-error" />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.schedule?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>

        <DatetimeLocalField
          name="endTime"
          defaultValue={formatDatetime(props.schedule?.endTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endTime" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ScheduleForm
