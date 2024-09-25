import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Replace with your PostgreSQL connection string
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// Example route for fetching data from PostgreSQL
app.get('/menu', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM menu');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
