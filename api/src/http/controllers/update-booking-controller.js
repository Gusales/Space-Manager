import { BookingNotFoundError } from '../../services/errors/booking-not-found-error.js';
import { InvalidDateError } from '../../services/errors/invalid-dates-error.js';
import { OtherUserHaveBookingInSameHour } from '../../services/errors/other-user-have-booking-in-same-hour.js';
import { CannotReservateInLongDates } from '../../services/errors/reservate-space-long-date-error.js';
import { SpaceNotFoundError } from '../../services/errors/space-not-found-error.js';
import { UnauthorizedError } from '../../services/errors/unauthorized-error.js';
import { UserHaveBookingInSameHourError } from '../../services/errors/user-have-booking-in-same-hour-error.js';
import { UserNotFoundError } from '../../services/errors/user-not-found-error.js';
import { UpdateBooking } from './../../services/update-booking.js';

export async function updateBookingController(request, response) {
  try {
    const { code, description, ends_at, space_id, starts_at, user_id } = request.body
    const { id } = request.params
    const { sub } = request.user

    const updateBooking = new UpdateBooking()
    await updateBooking.execute({
      booking_id: id,
      code,
      description,
      ends_at,
      space_id,
      starts_at,
      sub,
      user_id
    })

    return response.status(204).send()

  } catch (error) {
    if (error instanceof (BookingNotFoundError || UserNotFoundError || SpaceNotFoundError) ) {
      return response.status(404).send({
        message: error.message
      })
    }

    if (error instanceof (InvalidDateError || CannotReservateInLongDates)) {
      return response.status(400).send({
        message: error.message
      })
    }

    if (error instanceof (UnauthorizedError || OtherUserHaveBookingInSameHour || UserHaveBookingInSameHourError)) {
      return response.status(401).send({
        message: error.message
      })
    }

    if (error instanceof Error) {
      return response.status(500).send()
    }
  }
}