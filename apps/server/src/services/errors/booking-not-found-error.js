export class BookingNotFoundError extends Error {
  constructor(){
    super('Booking not found.')
  }
}