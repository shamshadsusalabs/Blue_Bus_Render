const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subLocationSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  amPm:{
    type: String,
  },
  date: {
    type: Date,
    required: true,
  }
});

const busSchema = new Schema({
  operatorName: {
    type: String,
    required: true,
    trim: true,
  },

  busName:{
    type: String,
    required: true,
    trim: true,
  },
  busType: {
    type: String,
    required: true,
    trim: true,
  },
  pickUpLocation: {
    type: String,
    required: true,
    trim: true,
  },
  pickUpDate: {
    type: Date,
    required: true,
  },
  pickUpTime: {
    type: String,
    required: true,
    trim: true,
  },
  pickUpAmPm: {
    type: String,
   
  },
  dropDate: {
    type: Date,
    required: true,
  },
  dropTime: {
    type: String,
    required: true,
    trim: true,
  },
  dropAmPm:{
    type: String,
  },
 dropLocation: {
    type: String,
    required: true,
    trim: true,
  },
 
  subLocations: {
    type: [subLocationSchema],
    default: [],
  },
  
 

  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  busImages: [
    {
     
      fileUrl: {
        type: String,
        required: true,
        trim: true,
      }
    }
  ],
  liveTracking: {
    type: Boolean,
    required: true,
    default: false,
  },
  reschedulable: {
    type: Boolean,
    required: true,
    default: false,
  },
  fare: {
    type: Number,
    required: true,
    min: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Bus", busSchema);
