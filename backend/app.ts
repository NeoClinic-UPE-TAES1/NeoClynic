import express, { Request, Response } from "express";
import secretaryRoutes from "./src/routes/secretaryRoutes"
import medicRoutes from "./src/routes/medicRoutes"
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)
app.use("/", medicRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

