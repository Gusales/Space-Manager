import express from 'express'
import { authenticateController } from '../controllers/authenticate-controller.js'
import { requestPasswordResetController } from '../controllers/request-password-reset-controller.js'
import { authenticateUserMiddleware } from '../middlewares/authenticate-user-middleware.js'
import { passwordResetController } from '../controllers/password-reset-controller.js'

export const authenticateRoute = express.Router()

authenticateRoute.post('/session', authenticateController)
authenticateRoute.post('/request-password-reset', requestPasswordResetController)
authenticateRoute.put('/password-reset', authenticateUserMiddleware, passwordResetController)