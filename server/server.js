import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use("/api/admin", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/public", publicRoutes);


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection SUCCESS");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running on: http://localhost:${port}`);  
    });
}
start();



