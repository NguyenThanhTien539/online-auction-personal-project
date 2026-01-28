import { Request, Response } from "express";
import { generateOtpCode } from "../../helper/generate.helper";
import jwt from "jsonwebtoken";

import * as accountModel from "../../models/client/account.model";
import { sendMail } from "@/helper/mail.helper";
import { otpVerificationContent } from "../../config/mail-content.config";
import bcrypt from "bcryptjs";

import {
  OTP_TOKEN_EXPIRATION_MINUTES,
  OTP_CODE_EXPIRATION_SECONDS,
  LENGTH_OTP_CODE,
} from "../../config/variable.config";
import { RegisterData } from "@/interface/user.interface";

const SALT_ROUNDS = 10;
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

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
      full_name: req.body.full_name,
      password: req.body.password,
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
  const expireTime = Date.now() + OTP_CODE_EXPIRATION_SECONDS * 1000;

  res.json({
    code: "success",
    message: "Vui lòng nhập mã OTP",
    data: {
      expireTime: expireTime, // Trả về thời gian hết hạn
    },
  });
}

async function createNewUser(registerData: RegisterData) {
  const { full_name, email, password } = registerData;

  //create default username from email
  const username =
    email.split("@")[0] + (await accountModel.countTotalUsers()) + 1;

  const userId = await accountModel.createUserInfo(full_name, username, email);
  const provider = "local";
  const password_hash = await hashPassword(password);
  await accountModel.createUserAccount(userId, provider, password_hash);
}

export async function verifyOtpCode(req: Request, res: Response) {
  const isVerified = await accountModel.verifyOtpCode(
    req.body.otpTokenData.email,
    req.body.otp_code,
  );

  if (!isVerified) {
    return res.json({
      code: "error",
      message: "Mã OTP không đúng. Vui lòng thử lại.",
    });
  }

  if (req.body.type === "register") {
    await createNewUser(req.body.otpTokenData);
  }

  return res.json({
    code: "success",
    message: "Xác thực OTP thành công",
  });
}

export async function resendOtpCode(req: Request, res: Response) {
  console.log("Resend OTP code for:", req.body.otpTokenData.email);
  const email = req.body.otpTokenData.email;
  const otpCode = generateOtpCode(LENGTH_OTP_CODE);
  await accountModel.saveOtpCode(email, otpCode);

  const title = "Mã OTP xác nhận đăng ký";
  const content = otpVerificationContent(OTP_TOKEN_EXPIRATION_MINUTES, otpCode);
  sendMail(email, title, content);

  // Tính thời gian hết hạn (timestamp)
  const expireTime = Date.now() + OTP_CODE_EXPIRATION_SECONDS * 1000;
  res.json({
    code: "success",
    message: "Đã gửi lại mã OTP. Vui lòng kiểm tra email của bạn.",
    data: {
      expireTime: expireTime, // Trả về thời gian hết hạn
    },
  });
}
