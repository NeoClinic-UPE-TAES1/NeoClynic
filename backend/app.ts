import "express-async-errors";
import 'dotenv/config';
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes"
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"
import consultationRoutes from "./src/routes/consultationRoutes"
import adminRoutes from "./src/routes/adminRoutes"
import { errorHandler } from "./src/infra/middlewares/errorHandle";

const app = express();
const PORT = 3000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use("/", authRoutes);
app.use("/", adminRoutes)
app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);
app.use("/", consultationRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
