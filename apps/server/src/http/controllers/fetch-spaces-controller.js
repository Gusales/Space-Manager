import { FetchSpaces } from "../../services/fetch-spaces.js";

export async function fetchSpacesController(_, response) {
  const fetchSpaces = new FetchSpaces()
  const { spaces } = await fetchSpaces.execute()

  return response.status(200).send({ spaces })
}