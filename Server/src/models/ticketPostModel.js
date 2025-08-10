import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is required for the ticket.'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A description is required.']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'], // 'enum' means the value must be one of these strings
        default: 'Open' // Sets a default value if none is provided
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    }
}, {
    // This option automatically adds `createdAt` and `updatedAt` fields to your documents
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;