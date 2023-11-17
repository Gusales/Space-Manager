import express from "express";
import { registerController } from "../controllers/register-controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { authenticateUserType } from "../middlewares/authenticate-user-type-middleware.js";


const userRoutes = express.Router()
userRoutes.use(authenticateUserMiddleware)
userRoutes.route('/users').post(authenticateUserType, registerController)

export { userRoutes }