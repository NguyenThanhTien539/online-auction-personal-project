import express from "express";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
const sever = express();
dotenv.config();

import clientRoutes from "./routes/client/index.route";
import cookieParser from "cookie-parser";
import cors from "cors";

sever.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

sever.use(express.json());
sever.use(cookieParser());

sever.use("/", clientRoutes);

sever.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
