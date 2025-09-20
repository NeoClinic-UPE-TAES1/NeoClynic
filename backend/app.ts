import express, { Request, Response } from "express";
import secretaryRoutes from "./routes/secretaryRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", secretaryRoutes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

