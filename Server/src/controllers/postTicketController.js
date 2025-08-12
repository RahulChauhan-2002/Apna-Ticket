
import Ticket from '../models/ticketPostModel.js'; 

export const postTicketController = async (req, res) => {
    try {
        const {
            travelType, 
            from,
            to,
            journeyDate, 
            vehicleNumber, 
            timing,
            seatType,
            price,
            email,
            mobile
        } = req.body;

   
        const postedBy = req.user._id; 
 
        if (!travelType || !from || !to || !journeyDate || !vehicleNumber || !timing || !seatType || !price) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields."
            });
        }

        const newTicketData = {
            travelType,
            from: from.toUpperCase(),
            to: to.toUpperCase(),
            journeyDate,
            vehicleNumber, 
            timing,
            seatType,
            price,
             email,
             mobile,
            postedBy
        };

   
        if (travelType === 'train') {
            if (isNaN(vehicleNumber)) {
                return res.status(400).json({
                    success: false,
                    message: "Train Number must be a valid number."
                });
            }
        }
        
        const ticket = new Ticket(newTicketData);
        await ticket.save();

        res.status(201).json({
            success: true,
            message: "Ticket posted successfully!",
            data: ticket
        });

    } catch (error) {
        console.error("Error in posting ticket:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            error: error.message
        });
    }
};