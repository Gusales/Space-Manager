import { ZodError, z } from "zod";
import { UpdateSpaceName } from "../../services/update-space-name.js";
import { SpaceNotFoundError } from "../../services/errors/space-not-found-error.js";

export async function updateSpaceNameController(request, response) {
  const updateSpaceNameBody = z.object({
    name: z.string()
  })
  const updateSpaceNameParams = z.object({
    id: z.string().uuid()
  })

  try {
    const { name } = updateSpaceNameBody.parse(request.body)
    const { id } = updateSpaceNameParams.parse(request.params)

    const updateSpaceName = new UpdateSpaceName()
    await updateSpaceName.execute({ id, name })

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