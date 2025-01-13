import { sequelize, Booking } from '../lib/sequelize.js'

import { BookingNotFoundError } from './errors/booking-not-found-error.js'
import { UnauthorizedError } from './errors/unauthorized-error.js'

export class DeleteBooking {
  async execute({
    booking_id,
    code
  }) {
    await sequelize.sync()

    const booking = await Booking.findByPk(booking_id)

    if (!booking) {
      throw new BookingNotFoundError()
    }

    if (booking.code !== code) {
      throw new UnauthorizedError()
    }

    await booking.destroy()
  }
}