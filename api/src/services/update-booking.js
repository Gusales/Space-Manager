import { Booking, User, sequelize } from './../lib/sequelize.js';

import { FetchAllBookingBySpaceId } from './fetch-all-bookings-by-space-id.js';
import { FetchAllBookingByUserId } from './fetch-all-bookings-by-user-id.js';

import { CannotReservateInLongDates } from './errors/reservate-space-long-date-error.js';
import { UnauthorizedError } from './errors/unauthorized-error.js';
import { BookingNotFoundError } from './errors/booking-not-found-error.js';
import { InvalidDateError } from './errors/invalid-dates-error.js';
import { UserHaveBookingInSameHourError } from './errors/user-have-booking-in-same-hour-error.js';
import { OtherUserHaveBookingInSameHour } from './errors/other-user-have-booking-in-same-hour.js';
import { SpaceNotFoundError } from './errors/space-not-found-error.js';
import { UserNotFoundError } from './errors/user-not-found-error.js';

import { calculateTimeBetweenTwoDates } from '../utils/calculate-time.js';
import { generateCUID } from './../utils/generate-cuid.js';

export class UpdateBooking {
  async execute({
    booking_id,
    starts_at,
    ends_at,
    description,
    user_id,
    space_id,
    sub,
    code
  }){
    await sequelize.sync()

    const booking = await Booking.findOne({
      where: {
        id: booking_id
      }
    })

    if (!booking) {
      throw new BookingNotFoundError()
    }

    const fetchAllBookingsById = new FetchAllBookingByUserId()
    const userBookings = await fetchAllBookingsById.execute(user_id)
    
    const fetchAllBookingBySpaceId = new FetchAllBookingBySpaceId()
    const spaceBookings = await fetchAllBookingBySpaceId.execute(space_id)

    if (!userBookings) {
      throw new UserNotFoundError()
    }

    if (!spaceBookings) {
      throw new SpaceNotFoundError()
    }

    const create_initial_date = new Date(starts_at)
    const create_end_date = new Date(ends_at)

    if (create_initial_date.getTime() >= create_end_date.getTime()) {
      throw new InvalidDateError()
    }
  
    const diferenceBetweenDates = create_end_date.getTime() - create_initial_date.getTime()
    const diferenceInHours = (diferenceBetweenDates / 60000) / 60
  
    const isInDiferentsYears = create_initial_date.getFullYear() !== create_end_date.getFullYear()
    const isInDiferentsDays = create_initial_date.getDay() !== create_end_date.getDay()
    const isInDiferentsMonths = create_initial_date.getMonth() !== create_end_date.getMonth()
  
    if (isInDiferentsYears || isInDiferentsDays || isInDiferentsMonths) {
      throw new CannotReservateInLongDates()
    }
    
    if (diferenceInHours > 4) {
      throw new CannotReservateInLongDates()
    }

    /** update booking hour */
    const isUserHaveBookingInSameInterval = calculateTimeBetweenTwoDates(create_initial_date, create_end_date, userBookings.bookings)
    const isUserHaveBookingInSameIntervalInOtherPlace = isUserHaveBookingInSameInterval.filter(item => {
      if (item.space_id !== space_id) {
        return item
      }
      return
    })

    if (isUserHaveBookingInSameIntervalInOtherPlace.length !== 0) {
      throw new UserHaveBookingInSameHourError()
    }

    const isHaveOthersBookingsInSameInterval = calculateTimeBetweenTwoDates(create_initial_date, create_end_date, await Booking.findAll())
    const isHaveOthersBookingsInSamePlace = isHaveOthersBookingsInSameInterval.filter(item => {
      if (item.space_id === space_id && item.user_id !== user_id) {
        return item
      }
      return
    })

    if (isHaveOthersBookingsInSamePlace.length !== 0 && isHaveOthersBookingsInSamePlace[0].id !== booking_id) {
      throw new OtherUserHaveBookingInSameHour()
    }

    booking.starts_at = starts_at;
    booking.ends_at = ends_at;

    const isUserAdmin = await User.findOne({
      where: {
        id: sub
      }
    })

    if (booking.code !== code) {
      throw new UnauthorizedError()
    }

    if (isUserAdmin.actype === 'ADMIN' && booking.code === code) {
      booking.user_id = user_id,
      booking.code = generateCUID()
    }

    /** update booking description */
    booking.description = description
    await booking.save()
  }
}