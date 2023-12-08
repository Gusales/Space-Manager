export class InvalidDateError extends Error {
  constructor() {
    super('The start date cannot be bigger than end date')
  }
}