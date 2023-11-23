import express from "express";
import { registerController } from "../controllers/register-controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { authenticateUserType } from "../middlewares/authenticate-user-type-middleware.js";
import { fecthAllUsersController } from "../controllers/fetch-all-users-controller.js";
import { updateUserController } from "../controllers/update-user-controller.js";
import { reactiveUserController } from "../controllers/reactive-user-controller.js";
import { deleteUserController } from "../controllers/delete-user-controller.js";


const userRoutes = express.Router()

userRoutes.use(authenticateUserMiddleware)
userRoutes.use(authenticateUserType)

userRoutes.get('/users', fecthAllUsersController)
userRoutes.post('/users', registerController)
userRoutes.put('/users/:id', updateUserController)
userRoutes.patch('/users/reactive/:id', reactiveUserController)
userRoutes.delete('/users/:id', deleteUserController)

export { userRoutes }