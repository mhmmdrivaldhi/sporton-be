import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth_routes';
import categoryRoutes from './routes/category_routes';
import productRoutes from './routes/product_routes';
import bankRoutes from './routes/bank_routes';
import transactionRoutes from './routes/transaction_routes';   
import { authenticate } from './middleware/auth_middleware';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("SportsOn Backend API is running . . .")
});

app.get("/test-middleware", authenticate, (req, res) => {
    res.send("This endpoint is not publicly accessible")
});

export default app;