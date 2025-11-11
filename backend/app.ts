import "express-async-errors";
import express from "express";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
import patientRoutes from "./src/routes/patientRoutes"
import consultationRoutes from "./src/routes/consultationRoutes"
import adminRoutes from "./src/routes/adminRoutes"
import { errorHandler } from "./src/infra/middlewares/errorHandle";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", adminRoutes)
app.use("/", secretaryRoutes)
app.use("/", medicRoutes);
app.use("/", patientRoutes);
app.use("/", consultationRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

