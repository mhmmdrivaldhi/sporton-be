import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth_routes';
import { authenticate } from './middleware/auth_middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("SportsOn Backend API is running . . .")
});

app.get("/test-middleware", authenticate, (req, res) => {
    res.send("This endpoint is not publicly accessible")
});

export default app;