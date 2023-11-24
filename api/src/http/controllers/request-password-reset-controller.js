import { z, ZodError } from 'zod'

import { RequestPasswordReset } from '../../services/request-password-reset.js'
import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error.js'
import { SendEmailError } from '../../services/errors/send-email-error.js'

export async function requestPasswordResetController(request, response) {
  const requestPasswordResetBodySchema = z.object({
    rm: z.number()
  })
  try {
    const { rm } = requestPasswordResetBodySchema.parse(request.body)
    const requestPasswordReset = new RequestPasswordReset()
    const { message } = await requestPasswordReset.execute({ rm })

    return response.status(200).send({ message })

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof InvalidCredentialsError) {
      const { message } = error
      return response.status(404).send({ message })
    }

    if (error instanceof SendEmailError) {
      const { message } = error
      return response.status(500).send({ message })
    }
  }
}