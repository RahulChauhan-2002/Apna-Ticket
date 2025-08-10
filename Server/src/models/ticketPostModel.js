import mongoose from 'mongoose';

// A schema that matches the data from your PostTicket form
const postedTicketSchema = new mongoose.Schema({
  // Corresponds to the 'travelType' radio buttons ('bus' or 'train')
  travelType: {
    type: String,
    required: [true, 'Please specify the travel type (bus or train).'],
    enum: ['bus', 'train'], // Ensures the value is one of these two options
    default: 'bus'
  },
  // Corresponds to the 'from' input field
  from: {
    type: String,
    required: [true, 'The "From" location is required.'],
    trim: true // Removes any leading/trailing whitespace
  },
  // Corresponds to the 'to' input field
  to: {
    type: String,
    required: [true, 'The "To" location is required.'],
    trim: true
  },
  // Corresponds to the 'journeyDate' input field
  journeyDate: {
    type: Date,
    required: [true, 'The date of journey is required.']
  },
  // Corresponds to the 'vehicleNumber' input field (for Bus or Train)
  vehicleNumber: {
    type: String,
    required: [true, 'The vehicle (bus/train) number is required.'],
    trim: true
  },
  // Corresponds to the 'timing' input field
  timing: {
    type: String, // Storing as a string like "22:30" is simple and effective
    required: [true, 'The travel timing is required.']
  },
  // Corresponds to the 'seatType' dropdown
  seatType: {
    type: String,
    required: [true, 'Please specify the seat type.'],
    // Enum includes all possible options for both bus and train
    enum: ['seater', 'sleeper', '3ac', '2ac', '1ac']
  },
  // Corresponds to the 'price' input field
  price: {
    type: Number,
    required: [true, 'Please set a selling price.'],
    min: [0, 'Price cannot be negative.'] // A price should not be less than 0
  },

  // --- Recommended Additional Fields ---

  // To track who posted the ticket (you will need a User model for this)
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This assumes you have a User model
    // required: true // You can make this required once user auth is in place
  },

  // To track if the ticket is still available or has been sold
  status: {
    type: String,
    enum: ['available', 'sold', 'expired'],
    default: 'available'
  }

}, {
  // This option automatically adds `createdAt` and `updatedAt` fields
  timestamps: true
});

// The model name 'PostedTicket' will result in a 'postedtickets' collection in MongoDB
const PostedTicket = mongoose.model('PostedTicket', postedTicketSchema);

export default PostedTicket;