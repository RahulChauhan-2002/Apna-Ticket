const mongoose = require('mongoose');

// Define the schema for the Ticket model
const ticketSchema = new mongoose.Schema({
  // Type of travel: 'bus' or 'train'
  travelType: {
    type: String,
    required: [true, 'Travel type is required'],
    enum: ['bus', 'train'], // Ensures the value is one of these two
  },
  // Starting location
  from: {
    type: String,
    required: [true, 'Starting location is required'],
    trim: true, // Removes leading/trailing whitespace
  },
  // Destination location
  to: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true,
  },
  // Date of the journey
  journeyDate: {
    type: Date,
    required: [true, 'Journey date is required'],
  },
  // Bus or Train number
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    trim: true,
  },
  // Departure time
  timing: {
    type: String, // Storing time as a string like "22:30" is straightforward
    required: [true, 'Timing is required'],
  },
  // Type of seat
  seatType: {
    type: String,
    required: [true, 'Seat type is required'],
    // Enum contains all possible seat types from both bus and train options
    enum: ['seater', 'sleeper', '3ac', '2ac', '1ac'],
  },
  // Selling price of the ticket
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create the model from the schema
const Ticket = mongoose.model('Ticket', ticketSchema);

// Export the model
module.exports = Ticket;