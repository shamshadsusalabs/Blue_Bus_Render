const express = require('express');
const router = express.Router();
const BookingController = require('../Controller/BookingC');

// Create a new booking
router.post('/bookings', BookingController.createBooking);

// Get all bookings
router.get('/bookings', BookingController.getAllBookings);

// Get a booking by ID
router.get('/bookings/:id', BookingController.getBookingById);

// Update a booking by ID
router.put('/bookings/:id', BookingController.updateBooking);

// Delete a booking by ID
router.delete('/bookings/:id', BookingController.deleteBooking);

// fetch booked  seat
router.get('/bookings/seats/:busId', BookingController.getSeatDetailsByBusId);

//fetch ticket  through mobile number
router.get('/bookings/mobile/:mobile', BookingController.getBookingByMobile);

//fetch data through email
router.get('/bookings/email/:email', BookingController.getBookingByEmail);
module.exports = router;
