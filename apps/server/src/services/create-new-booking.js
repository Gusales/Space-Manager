import { sequelize, Booking } from '../lib/sequelize.js'

import { FetchAllBookingBySpaceId } from './fetch-all-bookings-by-space-id.js'
import { FetchAllBookingByUserId } from './fetch-all-bookings-by-user-id.js'

import { CannotReservateInLongDates } from './errors/reservate-space-long-date-error.js'
import { SpaceNotFoundError } from './errors/space-not-found-error.js'
import { UserNotFoundError } from './errors/user-not-found-error.js'


import { generateCUID } from './../utils/generate-cuid.js';
import { calculateTimeBetweenTwoDates } from '../utils/calculate-time.js'

export class CreateNewBooking {
  async execute({
    starts_at,
    ends_at,
    description,
    user_id,
    space_id,
  }) {
    await sequelize.sync()

    
    const fetchAllBookingsById = new FetchAllBookingByUserId()
    const user = await fetchAllBookingsById.execute(user_id)
    
    const fetchAllBookingBySpaceId = new FetchAllBookingBySpaceId()
    const space = await fetchAllBookingBySpaceId.execute(space_id)

    if (!user) {
      throw new UserNotFoundError()
    }

    if (!space) {
      throw new SpaceNotFoundError()
    }

    const create_initial_date = new Date(starts_at)
    const create_end_date = new Date(ends_at)

    if (create_initial_date.getTime() >= create_end_date.getTime()) {
      throw new Error('The start date cannot be bigger than end date')
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
    
    const isUserHaveBookingInSameHour = calculateTimeBetweenTwoDates(create_initial_date, create_end_date, user.bookings)
    const isSpaceHaveBookingInSameHour = calculateTimeBetweenTwoDates(create_initial_date, create_end_date, space.bookings)

    if (isUserHaveBookingInSameHour.length !== 0 || isSpaceHaveBookingInSameHour.length !== 0) {
      throw new Error('You cannot reservate this space because have a booking in same hour.')
    }

    const { id } = await Booking.create({
      starts_at,
      ends_at,
      description,
      user_id,
      space_id,
      code: generateCUID()
    })

    return {
      id
    }

  }
}