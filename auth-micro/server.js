import express from "express";
import cors from "cors";
import Routes from "./routes/index.js";

import { config } from "dotenv";

config();
const port = process.env.PORT || 5001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Server saying hello...");
});

app.use(Routes);

app.listen(port, () => console.log("⚙️ Server started at", port));
