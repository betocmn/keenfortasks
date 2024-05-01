import type {
  QueryResolvers,
  MutationResolvers,
  ScheduleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { scheduleValidator } from './schedules.customValidators'

export const schedules: QueryResolvers['schedules'] = () => {
  return db.schedule.findMany()
}

export const schedule: QueryResolvers['schedule'] = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  })
}

export const createSchedule: MutationResolvers['createSchedule'] = async ({
  input,
}) => {
  // Run business-specific validations
  const customError = await scheduleValidator.validateCreateInput(input)
  if (customError) throw customError

  return db.schedule.create({
    data: input,
  })
}

export const updateSchedule: MutationResolvers['updateSchedule'] = async ({
  id,
  input,
}) => {
  // Run business-specific validations
  const customError = await scheduleValidator.validateUpdateInput(input, id)
  if (customError) throw customError

  return db.schedule.update({
    data: input,
    where: { id },
  })
}

export const deleteSchedule: MutationResolvers['deleteSchedule'] = ({ id }) => {
  return db.schedule.delete({
    where: { id },
  })
}

export const Schedule: ScheduleRelationResolvers = {
  Account: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).Account()
  },
  Agent: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).Agent()
  },
  Task: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).Task()
  },
}
