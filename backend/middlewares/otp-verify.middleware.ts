import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as accountModel from "@/models/client/account.model";

function decodeOtpToken(req: Request): JwtPayload {
  const verified_otp_token = req.cookies.verified_otp_token;

  if (!verified_otp_token) {
    throw new Error("NOT_FOUND");
  }

  const decoded = jwt.verify(
    verified_otp_token,
    `${process.env.JWT_SECRET_KEY}`,
  ) as JwtPayload;
  return decoded;
}

export async function checkOtpToken(req: Request, res: Response) {
  try {
    const decoded = decodeOtpToken(req);

    return res.json({
      code: "success",
      message: "Token hợp lệ",
      data: {
        email: decoded.email,
      },
    });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.json({
        code: "expired",
        message: "Token OTP đã hết hạn",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.json({
        code: "invalid",
        message: "Token OTP không hợp lệ",
      });
    }

    if (error.message === "NOT_FOUND") {
      return res.json({
        code: "error",
        message: "Không tìm thấy token OTP",
      });
    }

    return res.json({
      code: "error",
      message: "Đã xảy ra lỗi khi xác thực token.",
    });
  }
}

// Middleware: Require valid OTP token to proceed (with next)
export async function requireOtpToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const decoded = decodeOtpToken(req);

    req.body.otpTokenData = decoded;
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.json({
        code: "expired",
        message: "Token OTP đã hết hạn",
      });
    }

    if (error.message === "NOT_FOUND") {
      return res.json({
        code: "error",
        message: "Không tìm thấy token OTP",
      });
    }

    return res.json({
      code: "invalid",
      message: "Bạn chưa xác thực OTP hoặc token không hợp lệ.",
    });
  }
}
