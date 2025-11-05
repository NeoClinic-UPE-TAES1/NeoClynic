import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"
import authRoutes from "./src/routes/authRoutes"

const app = express();
const PORT = 3000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
