export class SpaceNotFoundError extends Error {
  constructor(){
    super('Space not found.')
  }
}