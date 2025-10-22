import express, { Request, Response } from "express";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

