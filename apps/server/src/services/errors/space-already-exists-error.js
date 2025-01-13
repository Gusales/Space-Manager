export class SpaceAlreadyExistsError extends Error {
  constructor(){
    super('Space already exits.')
  }
}