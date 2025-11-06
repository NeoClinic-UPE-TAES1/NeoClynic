import express from "express";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"
import consultationRoutes from "./src/routes/consultationRoutes"
import adminRoutes from "./src/routes/adminRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);
app.use("/", consultationRoutes)
app.use("/", adminRoutes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

