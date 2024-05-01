import type {
  QueryResolvers,
  MutationResolvers,
  TaskRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { taskValidator } from './tasks.customValidators'

export const tasks: QueryResolvers['tasks'] = () => {
  return db.task.findMany()
}

export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask: MutationResolvers['createTask'] = async ({
  input,
}) => {
  const { startTime, duration, ...rest } = input
  const endTime = new Date(new Date(startTime).getTime() + duration * 1000)

  // Run business-specific validations
  const customError = await taskValidator.validateCreateInput(input)
  if (customError) throw customError

  return db.task.create({
    data: {
      ...rest,
      startTime,
      endTime,
      duration,
    },
  })
}

export const updateTask: MutationResolvers['updateTask'] = async ({
  id,
  input,
}) => {
  const { startTime, duration, ...rest } = input
  const endTime =
    startTime && duration
      ? new Date(new Date(startTime).getTime() + duration * 1000)
      : undefined

  // Run business-specific validations
  const customError = await taskValidator.validateUpdateInput(input, id)
  if (customError) throw customError

  return db.task.update({
    where: { id },
    data: {
      ...rest,
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(duration && { duration }),
    },
  })
}

export const deleteTask: MutationResolvers['deleteTask'] = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task: TaskRelationResolvers = {
  Schedule: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).Schedule()
  },
  Account: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).Account()
  },
}
