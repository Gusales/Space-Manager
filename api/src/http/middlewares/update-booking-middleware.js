import { ZodError, z } from "zod"
import { SearchUniqueUserById } from '../../services/search-unique-user-by-id.js';
import { UnauthorizedError } from "../../services/errors/unauthorized-error.js";

export async function updateBookingMiddleware(request, response, next) {
  const bodySchema = z.object({
    starts_at: z.string().datetime(),
    ends_at: z.string().datetime(),
    description: z.string(),
    user_id: z.string().uuid(),
    space_id: z.string().uuid(),
    code: z.string().length(5)
  })

  const paramsSchema = z.object({
    id: z.string().uuid()
  })
  
  try {
    paramsSchema.parse(request.params)
    const { user_id } = bodySchema.parse(request.body)
    const { sub } = request.user

    const searchUniqueUserById = new SearchUniqueUserById()
    const { user } = await searchUniqueUserById.execute({ id: sub })

    if (!user) {
      throw new UnauthorizedError()
    }

    console.log(user)

    if (user.actype !== 'ADMIN' && user_id !== user.id) {
      return response.status(404).send({ message: 'You cannot be change this booking because only admins can make changes' })
    }

    next()
  }
  catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof UnauthorizedError){
      const { message } = error
      return response.status(404).send({ message })
    }
  }

  

}