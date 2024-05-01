import { ValidationError } from '@redwoodjs/graphql-server'

export interface CustomValidator {
  validateCreateInput(input: unknown): Promise<ValidationError | null>
  validateUpdateInput(input: unknown): Promise<ValidationError | null>
}
