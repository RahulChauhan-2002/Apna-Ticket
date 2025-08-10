import Ticket from "../models/ticketPostModel.js"; // Apne model ka sahi path dein

// @desc    Fetch all tickets
// @route   GET /api/v1/tickets
export const getAllTicketsController = async (req, res) => {
  try {
    // 1. Start with a base query object.
    const query = { status: "available" };

    // 2. Check for filters in the URL (req.query) and add them to our database query.
    if (req.query.travelType) {
      query.travelType = req.query.travelType;
    }
    if (req.query.from) {
      query.from = req.query.from.toUpperCase();
    }
    if (req.query.to) {
      query.to = req.query.to.toUpperCase();
    }
    if (req.query.journeyDate) {
      const searchDate = new Date(req.query.journeyDate);
      searchDate.setUTCHours(0, 0, 0, 0);

      const nextDay = new Date(searchDate);
      nextDay.setUTCDate(searchDate.getUTCDate() + 1);

      query.journeyDate = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }


    // 3. Use the final 'query' object to find matching tickets in the database.
    const tickets = await Ticket.find(query).sort({ journeyDate: 1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    console.error("Error in getTicketsController:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
