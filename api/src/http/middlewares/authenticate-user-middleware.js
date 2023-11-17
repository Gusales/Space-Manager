import jwt from 'jsonwebtoken'

export function authenticateUserMiddleware(request, response, next) {
  let token = request.headers.authorization

  if (!token) {
    return response.status(401).send({ message: 'User not authorized.' })
  }

  token = token.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw err;
    if (decoded) return decoded
  })

  request.user = decodedToken
  
  next()
}