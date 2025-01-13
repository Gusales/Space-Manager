import { ZodError, z } from 'zod'

import { UpdateUser } from '../../services/update-user.js'
import { UserAlreadyExistsError } from '../../services/errors/user-already-exists-error.js'
import { UserNotFoundError } from '../../services/errors/user-not-found-error.js'

export async function updateUserController(request, response){
  const updateUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    rm: z.number(),
    telephone: z.string().optional().default(undefined),
    actype: z.enum(['PROF', 'ADMIN', 'COORD'])
  })

  const updateUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = updateUserParamsSchema.parse(request.params)
    const { actype, email, name, rm, telephone } = updateUserBodySchema.parse(request.body)

    const updateUser = new UpdateUser()

    const { user } = await updateUser.execute({ id, actype, email, name, rm, telephone })

    return response.status(204).send()

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof UserAlreadyExistsError) {
      const { message } = error
      return response.status(409).send({ message })
    }

    if (error instanceof UserNotFoundError) {
      const { message } = error
      return response.status(404).send({ message })
    }

  }
}