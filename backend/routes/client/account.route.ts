import express from "express";
const router = express.Router();

import * as accountController from "../../controllers/client/account.controller";
import * as accountValidate from "@/validates/client/account.validate";

router.post(
  "/register",
  accountValidate.registerPost,
  accountController.register,
);

export default router;
