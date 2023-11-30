import { Booking, sequelize } from '../lib/sequelize.js'

export class FetchAllBookings {
  async execute() {
    await sequelize.sync()

    const bookings = await Booking.findAll()

    return { bookings }
  }
}