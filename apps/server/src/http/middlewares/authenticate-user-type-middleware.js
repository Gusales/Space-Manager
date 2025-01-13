import { SearchUniqueUserById } from "../../services/search-unique-user-by-id.js"

export async function authenticateUserType(request, response, next){
  const { sub } = request.user
  const searchUniqueUserById = new SearchUniqueUserById()
  const { user } = await searchUniqueUserById.execute({ id: sub })

  if (!user) {
    return response.status(401).send({ message: 'User not found.' })
  }

  if (user.actype !== 'ADMIN') {
    return response.status(401).send({ message: 'User not authorized.' })
  }

  next()
}