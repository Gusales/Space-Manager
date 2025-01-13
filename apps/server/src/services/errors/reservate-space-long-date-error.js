export class CannotReservateInLongDates extends Error {
  constructor(){
    super('You cannot reservate space in long dates')
  }
}