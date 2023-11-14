import { ZodError, z } from 'zod'
import jwt from 'jsonwebtoken'

import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error.js'
import { Authenticate } from '../../services/authenticate.js'

export async function authenticateController(request, response) {
  const authenticateBodySchema = z.object({
    rm: z.number(),
    password: z.string()
  })

  try {
    const { rm, password } = authenticateBodySchema.parse(request.body)
    const authenticate = new Authenticate()
    const { user } = await authenticate.execute({ rm, password })

    const token = jwt.sign({ 
      sub: user.id,
      name: user.name
    },
    process.env.JWT_SECRET ?? 'spacemanager',
    {
      expiresIn: 60 * 60 * 24 * 30,
    });

    return response.status(200).send({
      token,
      actype: user.actype,
    })


  } catch (err) {
    if (err instanceof ZodError) {
      const { issues } = err
      return response.status(400).send({ issues })
    }

    if (err instanceof InvalidCredentialsError) {
      const { message } = err
      return response.status(401).send({ message })
    }

    console.error(err)
  }
}