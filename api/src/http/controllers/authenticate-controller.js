import { ZodError, z } from 'zod'

import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error.js'
import { Authenticate } from '../../services/authenticate.js'

import { createToken } from '../../utils/token.js'
import { SendEmailError } from '../../services/errors/send-email-error.js'

export async function authenticateController(request, response) {
  const authenticateBodySchema = z.object({
    rm: z.number(),
    password: z.string()
  })

  try {
    const { rm, password } = authenticateBodySchema.parse(request.body)
    const authenticate = new Authenticate()
    const { user } = await authenticate.execute({ rm, password })

    const oneMonth = 60 * 60 * 24 * 30
    const token = createToken({ sub: user.id, name: user.name, expiresIn: oneMonth })

    return response.status(200).send({
      token,
      actype: user.actype,
    })


  } catch (err) {
    if (err instanceof ZodError) {
      const { errors } = err
      return response.status(400).send({ errors })
    }

    if (err instanceof InvalidCredentialsError) {
      const { message } = err
      return response.status(404).send({ message })
    }

    if (err instanceof SendEmailError) {
      const { message } = err
      return response.status(500).send({ message })
    }
  }
}