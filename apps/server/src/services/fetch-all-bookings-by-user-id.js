import { User, Booking, sequelize } from '../lib/sequelize.js'

export class FetchAllBookingByUserId {
  async execute(id) {
    await sequelize.sync()
    const user = await User.findOne({
      where: {
        id
      },
      include: Booking
    }); 

    return user

  }
}