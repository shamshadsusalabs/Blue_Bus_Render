
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const busSchema = new mongoose.Schema({
  dropAmPm: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  dropTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  pickUpAmPm: {
    type: String,
    required: true
  },
  pickUpLocation: {
    type: String,
    required: true
  },
  pickUpTime: {
    type: String,
    required: true
  }
});

const BookingSchema = new mongoose.Schema({
  bus: {
    type: busSchema,
    required: true
  },
  seat: {
    type: seatSchema,
    required: true
  },
  user: {
    type: userSchema,
    required: true
  },
  ticketNumber: { type: String, required: true },
},{ timestamps: true });


BookingSchema.index({ ticketNumber: 1 }); // Index for ticketNumber
BookingSchema.index({ 'user.email': 1 }); // Index for user email
BookingSchema.index({ 'user.mobile': 1 }); // Index for user mobile
BookingSchema.index({ bus: 1 });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
