import { FetchAllBookings } from "../../services/fetch-all-bookings.js";

export async function fetchAllBookingsController(_, response) {
  const fetchAllBookings = new FetchAllBookings()
  const { bookings } = await fetchAllBookings.execute()

  return response.status(200).send({ bookings })
}