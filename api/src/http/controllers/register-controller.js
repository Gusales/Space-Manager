import { ZodError, z } from "zod";
import { Register } from "../../services/register.js";
import { UserAlreadyExistsError } from "../../services/errors/user-already-exists-error.js";

import { generatePassword } from '../../utils/generate-password.js'

export async function registerController(request, response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    rm: z.number(),
    telephone: z.string().optional().default(undefined),
    actype: z.enum(['PROF', 'ADMIN', 'COORD'])
  })

  try {
    const { email, name, rm, actype, telephone } = registerBodySchema.parse(request.body)
    const password = generatePassword()

    const register = new Register()
    const { user: { id } } = await register.execute({ name, email, password, rm, telephone, actype })
    
    return response.status(201).send({ id })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      const { message } = error
      return response.status(409).send({ message })
    }
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

  }
}