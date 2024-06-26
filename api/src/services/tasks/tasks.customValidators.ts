import type { CreateTaskInput, UpdateTaskInput } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { CustomValidator } from 'src/lib/interfaces'

class TaskValidator implements CustomValidator {
  async validateCreateInput(
    input: CreateTaskInput
  ): Promise<ValidationError | null> {
    const { scheduleId, startTime, duration } = input

    const errors = await Promise.all([
      this.validateOverlappingTasks(scheduleId, new Date(startTime), duration),
      this.validateTaskDuration(scheduleId, new Date(startTime), duration),
      this.validateTaskBoundaries(scheduleId, new Date(startTime), duration),
    ])

    const validationError = errors.find((error) => error !== null)
    return validationError || null
  }

  async validateUpdateInput(
    input: UpdateTaskInput,
    id: string
  ): Promise<ValidationError | null> {
    const { scheduleId, startTime, duration } = input

    const errors = await Promise.all([
      this.validateOverlappingTasks(
        scheduleId,
        new Date(startTime),
        duration,
        id
      ),
      this.validateTaskDuration(scheduleId, new Date(startTime), duration),
      this.validateTaskBoundaries(scheduleId, new Date(startTime), duration),
    ])

    const validationError = errors.find((error) => error !== null)
    return validationError || null
  }

  private async validateOverlappingTasks(
    scheduleId: string,
    newStartTime: Date,
    newDuration: number,
    taskIdToUpdate?: string
  ): Promise<ValidationError | null> {
    const newEndTime = new Date(newStartTime.getTime() + newDuration * 1000)

    /**
     * The conditions for overlapping tasks are as follows:
     * 1. The scheduleId of the existing task matches the scheduleId of the new task, AND
     * 2. The startTime of the new task is less than the endTime of any existing task for this schedule, AND
     * 3. The endTime of the new task is greater than the startTime of any existing task for this schedule.
     */
    const overlappingTask = await db.task.findFirst({
      where: {
        id: {
          not: taskIdToUpdate ? { equals: taskIdToUpdate } : undefined,
        },
        scheduleId,
        endTime: {
          gt: newStartTime,
        },
        startTime: {
          lt: newEndTime,
        },
      },
    })

    if (overlappingTask) {
      return new ValidationError('The task overlaps with an existing task.')
    }
    return null
  }

  private async validateTaskDuration(
    scheduleId: string,
    startTime: Date,
    duration: number
  ): Promise<ValidationError | null> {
    const schedule = await db.schedule.findFirst({
      where: {
        id: scheduleId,
      },
    })

    if (!schedule) {
      return new ValidationError('The specified schedule does not exist.')
    }

    const taskEndTime = new Date(startTime.getTime() + duration * 1000)

    if (taskEndTime > schedule.endTime) {
      return new ValidationError(
        'The task duration exceeds the schedule end time.'
      )
    }
    return null
  }

  private async validateTaskBoundaries(
    scheduleId: string,
    newStartTime: Date,
    newDuration: number
  ): Promise<ValidationError | null> {
    const schedule = await db.schedule.findFirst({
      where: {
        id: scheduleId,
      },
    })

    if (!schedule) {
      return new ValidationError('The specified schedule does not exist.')
    }

    const newEndTime = new Date(newStartTime.getTime() + newDuration * 1000)

    if (newStartTime < schedule.startTime || newEndTime > schedule.endTime) {
      return new ValidationError(
        'The task must fall within the schedule boundaries.'
      )
    }

    return null
  }
}

export const taskValidator = new TaskValidator()
