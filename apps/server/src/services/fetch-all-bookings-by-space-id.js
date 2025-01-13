import { Booking, Space, sequelize } from "../lib/sequelize.js";

export class FetchAllBookingBySpaceId {
  async execute(space_id) {
    await sequelize.sync()

    const space = await Space.findOne({
      where: {
        id: space_id
      },
      include: Booking
    })

    return space
  }
}