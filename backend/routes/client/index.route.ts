import express from "express";
const router = express.Router();

import accountRoutes from "./account.route";

router.use("/api/accounts", accountRoutes);

export default router;
