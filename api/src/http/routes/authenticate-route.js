import express from 'express'
const router = express.Router()

export const authenticateRoute = router.post('/session', (_, response) => {
  return response.status(200).send({ message: 'hello world!' })
})