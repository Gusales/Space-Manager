import express from "express";
import { authenticateUserMiddleware } from "../middlewares/authenticate-user-middleware.js";
import { fetchAllBookingsController } from "../controllers/fetch-all-bookings-controller.js";
import { createNewBookingController } from "../controllers/create-new-booking-controller.js";
import { updateBookingController } from "../controllers/update-booking-controller.js";
import { updateBookingMiddleware } from "../middlewares/update-booking-middleware.js";

export const bookingsRoutes = express.Router()

bookingsRoutes.use(authenticateUserMiddleware)
bookingsRoutes.get('/bookings', fetchAllBookingsController)
bookingsRoutes.post('/bookings', createNewBookingController)
bookingsRoutes.put('/bookings/:id', updateBookingMiddleware, updateBookingController)