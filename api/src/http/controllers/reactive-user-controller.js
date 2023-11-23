import { z, ZodError } from 'zod'
import { ReactiveUser } from '../../services/reactive-user.js'
import { UserNotFoundError } from '../../services/errors/user-not-found-error.js'
import { UserNotDesactivatedError } from '../../services/errors/user-not-desactivated-error.js'

export async function reactiveUserController(request, response){
  const reactiveBodySchema = z.object({
    id: z.string().uuid()
  })

  try {
    const { id } = reactiveBodySchema.parse(request.params)

    const reactiveUser = new ReactiveUser()
    const isReactivatedUser = await reactiveUser.execute({ id })

    if (isReactivatedUser) {
      return response.status(202).send({ reactivated: true })
    }

    // return response.status(400).send({ reactivated: false })

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof UserNotFoundError) {
      const { message } = error
      return response.status(400).send({ message })
    }

    if (error instanceof UserNotDesactivatedError) {
      const { message } = error
      return response.status(400).send({ message })
    }
  }
}