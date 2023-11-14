import { ZodError, z } from "zod";
import { Register } from "../../services/register.js";
import { UserAlreadyExistsError } from "../../services/errors/user-already-exists-error.js";

export async function registerController(request, response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    rm: z.number(),
    telephone: z.string().optional().default(undefined),
    actype: z.enum(['PROF', 'ADMIN', 'COORD'])
  })

  try {
    const { email, name, rm, actype, telephone, password } = registerBodySchema.parse(request.body)
    console.log('bateu?')
    const register = new Register()
    const { user } = await register.execute({ name, email, password, rm, telephone, actype })

    return response.status(201).send({ user })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ mensage: err.message })
    }
    if (err instanceof ZodError) {
      const { issues } = err
      return response.status(400).send({ issues })
    }

  }
}