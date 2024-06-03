import express from "express";

import { config } from "dotenv";

config();
const port = process.env.PORT || 5001;

const app = express();

app.get("/", (req, res) => {
  return res.send("Server saying hello...");
});

app.listen(port, () => console.log("⚙️ Server started at", port));
