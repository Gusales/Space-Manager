import { z, ZodError } from 'zod'
import { CreateNewSpace } from '../../services/create-new-space.js'
import { SpaceAlreadyExistsError } from '../../services/errors/space-already-exists-error.js'

export async function createNewSpaceController(request, response){
  const createNewSpaceControllerSchema = z.object({
    name: z.string()
  })

  try {
    const { name } = createNewSpaceControllerSchema.parse(request.body)
    const createNewSpace = new CreateNewSpace()
    const { space } = await createNewSpace.execute({ name })

    return response.status(201).send({ space })

  } catch (error) {
    if (error instanceof ZodError) {
      const { issues } = error
      return response.status(400).send(issues)
    }

    if (error instanceof SpaceAlreadyExistsError) {
      const { message } = error
      return response.status(400).send({ message })
    }
  }
}