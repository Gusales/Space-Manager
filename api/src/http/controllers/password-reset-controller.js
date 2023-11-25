import { z, ZodError } from 'zod'
import { PasswordReset } from '../../services/password-reset.js'
import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error.js'

export async function passwordResetController(request, response) {
  const passwordResetSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters long')
  })

  try {
    const { newPassword } = passwordResetSchema.parse(request.body)
    const { sub } = request.user
    const passwordReset = new PasswordReset()
    await passwordReset.execute({ id: sub, password: newPassword })

    return response.status(204).send()

  } catch (error) {
    if (error instanceof ZodError) {
      const { message } = error
      return response.status(400).send({ message })
    }

    if (error instanceof InvalidCredentialsError) {
      const { message } = error
      return response.status(400).send({ message })
    }
  }
}