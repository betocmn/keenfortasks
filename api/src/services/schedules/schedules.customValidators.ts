import type { CreateScheduleInput, UpdateScheduleInput } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { CustomValidator } from 'src/lib/interfaces'

class ScheduleValidator implements CustomValidator {
  async validateCreateInput(
    input: CreateScheduleInput
  ): Promise<ValidationError | null> {
    const startTime = new Date(input.startTime)
    const endTime = new Date(input.endTime)

    const errors = await Promise.all([
      this.validateStartTimeNotInPast(startTime),
      this.validateScheduleTiming(startTime, endTime),
      this.validateScheduleDuration(startTime, endTime),
      this.validateOverlappingSchedules(startTime, endTime, input.agentId),
    ])

    const validationError = errors.find((error) => error !== null)
    return validationError || null
  }

  async validateUpdateInput(
    input: UpdateScheduleInput
  ): Promise<ValidationError | null> {
    // Similar validation logic as validateCreateInput
    // But you can also overwrite the below for custom validations.
    return await this.validateCreateInput(input as CreateScheduleInput)
  }

  private async validateStartTimeNotInPast(
    startTime: Date
  ): Promise<ValidationError | null> {
    const currentTime = new Date()
    if (startTime < currentTime) {
      return new ValidationError('The start time cannot be in the past.')
    }
    return null
  }

  private async validateScheduleTiming(
    startTime: Date,
    endTime: Date
  ): Promise<ValidationError | null> {
    if (startTime >= endTime) {
      return new ValidationError('The start time must be before the end time.')
    }
    return null
  }

  private async validateScheduleDuration(
    startTime: Date,
    endTime: Date
  ): Promise<ValidationError | null> {
    const MAX_DURATION_IN_HOURS = 40
    const scheduleDurationInHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

    if (scheduleDurationInHours > MAX_DURATION_IN_HOURS) {
      return new ValidationError(
        `The schedule duration cannot exceed ${MAX_DURATION_IN_HOURS} hours.`
      )
    }
    return null
  }

  private async validateOverlappingSchedules(
    newStartTime: Date,
    newEndTime: Date,
    agentId: number
  ): Promise<ValidationError | null> {
    /**
     * The conditions for overlapping schedules are as follows:
     * 1. The agentId of the existing schedule matches the agentId of the new schedule, AND
     * 2. The startTime of the new schedule is less than the endTime of any existing schedule for this agent, AND
     * 3. The endTime of the new schedule is greater than the startTime of any existing schedule for this agent.
     */
    const overlappingSchedule = await db.schedule.findFirst({
      where: {
        agentId,
        endTime: {
          gt: newStartTime,
        },
        startTime: {
          lt: newEndTime,
        },
      },
    })

    if (overlappingSchedule) {
      return new ValidationError(
        'The schedule overlaps with an existing schedule.'
      )
    }
    return null
  }
}

export const scheduleValidator = new ScheduleValidator()
