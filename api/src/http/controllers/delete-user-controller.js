import { z, ZodError } from 'zod'
import { DeleteUser } from '../../services/delete-user.js'
import { UserNotFoundError } from '../../services/errors/user-not-found-error.js'

export async function deleteUserController(request, response){
  const deleteBodySchema = z.object({
    id: z.string().uuid()
  })

  try {
    const { id } = deleteBodySchema.parse(request.params)

    const deleteUser = new DeleteUser()
    const isDeletedUser = await deleteUser.execute({ id })

    return response.status(202).send(isDeletedUser)

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof UserNotFoundError) {
      const { message } = error
      return response.status(400).send({ message })
    }
  }
}