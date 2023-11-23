import express from "express";
import { registerController } from "../controllers/register-controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { authenticateUserType } from "../middlewares/authenticate-user-type-middleware.js";
import { fecthAllUsersController } from "../controllers/fetch-all-users-controller.js";
import { updateUserController } from "../controllers/update-user-controller.js";


const userRoutes = express.Router()
userRoutes.use(authenticateUserMiddleware)
userRoutes.get('/users', authenticateUserType, fecthAllUsersController)
userRoutes.post('/users', authenticateUserType, registerController)
userRoutes.put('/users/:id', authenticateUserType, updateUserController)

export { userRoutes }