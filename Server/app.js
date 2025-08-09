import express from 'express';
import dbConnect from './src/config/dbConnection.js';
import route from './src/routes/route.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/api/v1',route);

const startServer = async () => {
    try {
        // console.log("PORT:", process.env.PORT);
        // console.log("MONGO_URI:", process.env.MONGO_URI);
        
        await dbConnect();
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();
