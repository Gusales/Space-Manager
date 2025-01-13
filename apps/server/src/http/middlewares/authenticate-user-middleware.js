import { verifyToken } from "../../utils/token.js"

export function authenticateUserMiddleware(request, response, next) {
  let token = request.headers.authorization

  if (!token) {
    return response.status(401).send({ message: 'User not authorized.' })
  }

  token = token.split(' ')[1]

  const decodedToken = verifyToken(token)

  request.user = decodedToken
  
  next()
}