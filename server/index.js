import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

app.get("/", (req, res) => {
    res.json("Hello from the server!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});