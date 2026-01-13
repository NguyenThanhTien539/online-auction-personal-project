import express from "express";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
const sever = express();
dotenv.config();

import { getDb } from "./config/database.config";

sever.get("/", async (req, res) => {
  const user = await getDb()("users").first();
  res.send(`Hello, ${user ? user.full_name : "Guest"}!`);
});

sever.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
