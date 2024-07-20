// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import adminRoutes from "../routes/adminRoutes";
import userRoutes from "../routes/userRoutes";
import productRoutes from "../routes/productRoutes";
import orderRoutes from "../routes/orderRoutes";
import cors from 'cors';
import db from "../models/index";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.static('routes'))

const port = process.env.PORT || 5000;

// DB Connection test
async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

// API Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});