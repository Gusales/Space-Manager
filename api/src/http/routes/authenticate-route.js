import express from 'express'
import { authenticateController } from '../controllers/authenticate-controller.js'
import { requestPasswordResetController } from '../controllers/request-password-reset-controller.js'

export const authenticateRoute = express.Router()

authenticateRoute.post('/session', authenticateController)
authenticateRoute.post('/request-password-reset', requestPasswordResetController)