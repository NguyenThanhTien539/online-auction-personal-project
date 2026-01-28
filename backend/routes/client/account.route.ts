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

router.get(
  "/resend-otp-code",
  otpVerifyMiddleware.requireOtpToken,
  accountController.resendOtpCode,
);

router.post("/login", accountValidate.login, accountController.login);

router.post("/google-login", accountController.googleLogin);

export default router;
