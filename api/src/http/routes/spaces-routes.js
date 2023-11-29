import express from "express";
import { createNewSpaceController } from "../controllers/create-new-space-controller.js";
import { fetchSpacesController } from "../controllers/fetch-spaces-controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { authenticateUserType } from "../middlewares/authenticate-user-type-middleware.js";


export const spaceRoutes = express.Router()
spaceRoutes.use(authenticateUserMiddleware)
spaceRoutes.get('/spaces', fetchSpacesController)
spaceRoutes.post('/spaces', authenticateUserType, createNewSpaceController)
