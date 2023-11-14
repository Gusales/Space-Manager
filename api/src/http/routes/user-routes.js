import express from "express";
import { registerController } from "../controllers/register-controller.js";


const userRoutes = express.Router()
userRoutes.route('/users').post(registerController)

export { userRoutes }