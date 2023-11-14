import express from 'express'
import { authenticateController } from '../controllers/authenticate-controller.js'

const router = express.Router()

export const authenticateRoute = router.post('/session', authenticateController)