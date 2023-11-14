import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import { authenticateRoute } from './http/routes/authenticate-route.js';
import { userRoutes } from './http/routes/user-routes.js';

export const app = express();

app.use(cors({
  origin: true
}))

app.use(express.json())

app.use(authenticateRoute)
app.use(userRoutes)
