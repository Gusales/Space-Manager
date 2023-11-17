import { SearchUniqueUser } from "../../services/search-unique-user.js"

export async function authenticateUserType(request, response, next){
  const { sub } = request.user
  const searchUniqueUser = new SearchUniqueUser()
  const { user } = await searchUniqueUser.execute({ id: sub })

  if (!user) {
    return response.status(401).send({ message: 'User not found.' })
  }

  if (user.actype !== 'ADMIN') {
    return response.status(401).send({ message: 'User not authorized.' })
  }

  next()
}