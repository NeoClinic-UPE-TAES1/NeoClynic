import express, { Request, Response } from "express";
import secretaryRoutes from "./routes/secretaryRoutes"
import medicRoutes from "./routes/medicRoutes"
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

