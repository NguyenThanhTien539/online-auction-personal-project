import express from "express";
const router = express.Router();

import * as accountController from "../../controllers/client/account.controller";
import * as accountValidate from "@/validates/client/account.validate";
import * as otpVerifyMiddleware from "@/middlewares/otp-verify.middleware";

router.post(
  "/register",
  accountValidate.registerPost,
  accountController.register,
);

router.get("/verify-otp-token", otpVerifyMiddleware.checkOtpToken);

router.post(
  "/verify-otp-code",
  otpVerifyMiddleware.requireOtpToken,
  accountController.verifyOtpCode,
);

export default router;
