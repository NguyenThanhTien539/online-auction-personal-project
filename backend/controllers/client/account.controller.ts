import { Request, Response } from "express";
import { generateOtpCode } from "../../helper/generate.helper";
import jwt from "jsonwebtoken";

import * as accountModel from "../../models/client/account.model";
import { sendMail } from "@/helper/mail.helper";
import { otpVerificationContent } from "../../config/mail-content.config";

const LENGTH_OTP_CODE = 6;
const OTP_TOKEN_EXPIRATION_MINUTES = 1;
const OTP_CODE_EXPIRATION_MINUTES = 1;

export async function register(req: Request, res: Response) {
  const isExist = await accountModel.isExistingEmail(req.body.email);

  if (isExist) {
    return res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống",
    });
  }

  const isOtpExist = await accountModel.existsValidOtpByEmail(req.body.email);
  if (isOtpExist) {
    return res.json({
      code: "otp_exist",
      message: "Mã OTP vẫn còn hiệu lực. Vui lòng kiểm tra email của bạn.",
    });
  }
  const otpCode = generateOtpCode(LENGTH_OTP_CODE);
  await accountModel.saveOtpCode(req.body.email, otpCode);

  const verified_otp_token = jwt.sign(
    {
      email: req.body.email,
      otp_code: otpCode,
    },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: `${OTP_TOKEN_EXPIRATION_MINUTES}m`,
    },
  );
  res.cookie("verified_otp_token", verified_otp_token, {
    maxAge: OTP_TOKEN_EXPIRATION_MINUTES * 60 * 1000, //mili giây
    httpOnly: true,
    secure: false, //https sets true and http sets false
    sameSite: "lax", //allow send cookie between domains
  });

  const title = "Mã OTP xác nhận đăng ký";
  const content = otpVerificationContent(OTP_TOKEN_EXPIRATION_MINUTES, otpCode);

  sendMail(req.body.email, title, content);

  // Tính thời gian hết hạn (timestamp)
  const expireTime = Date.now() + 20 * 1000;

  res.json({
    code: "success",
    message: "Vui lòng nhập mã OTP",
    data: {
      expireTime: expireTime, // Trả về thời gian hết hạn
    },
  });
}
