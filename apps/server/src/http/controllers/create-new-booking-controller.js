import { ZodError, z } from "zod";
import { CreateNewBooking } from "../../services/create-new-booking.js";

import { SpaceNotFoundError } from "../../services/errors/space-not-found-error.js"
import { UserNotFoundError } from "../../services/errors/user-not-found-error.js";
import { CannotReservateInLongDates } from "../../services/errors/reservate-space-long-date-error.js";

export async function createNewBookingController(request, response) {  
  const schema = z.object({
    starts_at: z.string().datetime().nonempty('O campo de início da reserva é obrigatório'),
    ends_at: z.string().datetime().nonempty('O campo de fim da reserva é obrigatório'),
    description: z.string().nonempty('O campo de descrição da reserva é obrigatório'),
    space_id: z.string().uuid().nonempty('O campo de espaço da reserva é obrigatório')
  })

  try {
    const { description, ends_at, space_id, starts_at } = schema.parse(request.body)
    const { sub } = request.user

    const createNewBooking = new CreateNewBooking()
    const { id } = await createNewBooking.execute({ description, ends_at, space_id, starts_at, user_id: sub })

    return response.status(201).send({ id })

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof SpaceNotFoundError) {
      const { message } = error
      return response.status(404).send({ message })
    }

    if (error instanceof UserNotFoundError) {
      const { message } = error
      return response.status(404).send({ message })
    }

    if (error instanceof CannotReservateInLongDates) {
      const { message } = error
      return response.status(400).send({ message })
    }

    if (error instanceof Error) {
      const { message } = error
      return response.status(400).send({ message })
    }
  }
}