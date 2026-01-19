import express from "express";
const router = express.Router();

import * as accountController from "../../controllers/client/account.controller";

router.post("/register", accountController.register);

export default router;
