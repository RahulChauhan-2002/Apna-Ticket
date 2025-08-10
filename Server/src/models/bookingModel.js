import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required.'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required.'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required.'],
        trim: true,
    },
    // Aap yahan ticket ki ID bhi save kar sakte hain taaki pata chale kaun sa ticket book hua
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostedTicket', // Aapke ticket model ka naam
        // required: true,
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;