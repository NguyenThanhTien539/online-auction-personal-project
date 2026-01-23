import { Request, Response } from "express";
import { generateOtpCode } from "../../helper/generate.helper";
import jwt from "jsonwebtoken";

import * as accountModel from "../../models/client/account.model";
import { sendMail } from "@/helper/mail.helper";

const LENGTH_OTP_CODE = 6;
const OTP_EXPIRATION_MINUTES = 1;

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
      expiresIn: `${OTP_EXPIRATION_MINUTES}m`,
    },
  );

  res.cookie("verified_otp_token", verified_otp_token, {
    maxAge: OTP_EXPIRATION_MINUTES * 60 * 1000, //mili giây
    httpOnly: true,
    secure: false, //https sets true and http sets false
    sameSite: "lax", //allow send cookie between domains
  });

  const title = "Mã OTP xác nhận đăng ký";
  const content = `
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
      Xin chào,
    </p>
    <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
      Cảm ơn bạn đã đăng ký tài khoản tại <strong>Online Auction</strong>. 
      Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã OTP bên dưới:
    </p>
    <div class="highlight">
      ${otpCode}
    </div>
    <p style="font-size: 14px; color: #e74c3c; margin-top: 20px;">
      ⏰ Mã OTP có hiệu lực trong <strong>${OTP_EXPIRATION_MINUTES} phút</strong>
    </p>
    <p style="font-size: 14px; color: #555; margin-top: 15px;">
      ⚠️ <strong>Lưu ý:</strong> Vui lòng không chia sẻ mã OTP này với bất kỳ ai để bảo vệ tài khoản của bạn.
    </p>
  `;
   sendMail(req.body.email, title, content);

  res.json({
    code: "success",
    message: "Vui lòng nhập mã OTP",
  });
}
