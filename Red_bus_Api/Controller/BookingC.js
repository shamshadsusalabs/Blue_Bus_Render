const Booking = require('../Schema/Booking'); // Update the path as needed
const crypto = require('crypto');
const mongoose = require('mongoose'); 

// Function to generate a random 10-character alphanumeric ticket number
const generateTicketNumber = () => {
  return crypto.randomBytes(5).toString('hex').toUpperCase().slice(0, 10);
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    
    // Create a new booking with the generated ticket number
    const newBooking = new Booking({
      ...req.body,
      ticketNumber: ticketNumber  // Add ticketNumber to the booking data
    });
    
    const booking = await newBooking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings', error: error.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, message: 'Error fetching booking', error: error.message });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ success: false, message: 'Error updating booking', error: error.message });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, message: 'Error deleting booking', error: error.message });
  }
};


exports.getSeatDetailsByBusId = async (req, res) => {
  try {
    // Extract bus ID from request parameters
    const { busId } = req.params;
    console.log('Extracted busId from request params:', busId);

    // Fetch bookings for the specified bus ID
    const bookings = await Booking.find({ 'bus.id': busId });
    console.log('Fetched bookings for bus ID:', bookings);

    // Check if bookings are found
    if (bookings.length === 0) {
      console.log('No bookings found for the specified bus ID.');
      return res.status(404).json({ message: 'No bookings found for the specified bus ID.' });
    }

    // Extract seat details from the bookings
    const seatDetails = bookings.map(booking => booking.seat);
    console.log('Extracted seat details:', seatDetails);

    // Respond with the seat details
    res.status(200).json(seatDetails);
  } catch (error) {
    console.error('Error fetching seat details:', error.message);
    res.status(500).json({ message: 'Error fetching seat details' });
  }
};


exports.getBookingByMobile = async (req, res) => {
  try {
    const mobile = req.params.mobile;
    const booking = await Booking.findOne({ 'user.mobile': mobile });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const booking = await Booking.findOne({ 'user.email': email });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};