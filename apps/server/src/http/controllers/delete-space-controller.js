import { ZodError, z } from "zod";
import { SpaceNotFoundError } from '../../services/errors/space-not-found-error.js'
import { DeleteSpace } from "../../services/delete-space.js";

export async function deleteSpaceController(request, response) {
  const deleteSpaceParamsSchema = z.object({
    id: z.string().uuid()
  })

  try {
    
    const { id } = deleteSpaceParamsSchema.parse(request.params)
    const deleteSpace = new DeleteSpace()
    await deleteSpace.execute(id)

    return response.status(204).send()

  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      return response.status(400).send({ errors })
    }

    if (error instanceof SpaceNotFoundError) {
      const { message } = error
      return response.status(404).send({ message })
    }
  }
}