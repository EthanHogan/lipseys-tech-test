import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

app.use(cors());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
