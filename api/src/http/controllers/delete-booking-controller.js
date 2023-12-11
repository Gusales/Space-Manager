import { ZodError, z } from 'zod'

import { DeleteBooking } from '../../services/delete-booking.js'

export async function deleteBookingController(request, response) {
  const schema = z.object({
    code: z.string().nonempty('O campo de código da reserva é obrigatório')
  })

  const paramsSchema = z.object({
    id: z.string().uuid()
  })

  try {
    const { code } = schema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const deleteBooking = new DeleteBooking()
    await deleteBooking.execute({
      code,
      booking_id: id
    })

    return response.status(204).send()
  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }
  }
}