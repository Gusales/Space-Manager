import express from "express";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { fetchAllBookingsController } from "../controllers/fetch-all-bookings-controller.js";

export const bookingsRoutes = express.Router()

bookingsRoutes.use(authenticateUserMiddleware)
bookingsRoutes.get('/bookings', fetchAllBookingsController)