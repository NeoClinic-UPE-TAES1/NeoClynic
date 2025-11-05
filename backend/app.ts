import express, { Request, Response } from "express";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"
import authRoutes from "./src/routes/authRoutes"
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

