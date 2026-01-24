import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyOtpToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const verified_otp_token = req.cookies.verified_otp_token;

    if (!verified_otp_token) {
      return res.json({
        code: "error",
        message: "Không tìm thấy token OTP. Vui lòng đăng ký lại.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(
      verified_otp_token,
      `${process.env.JWT_SECRET_KEY}`,
    ) as JwtPayload;

    // If used as route handler, return success
    if (!next) {
      return res.json({
        code: "success",
        message: "Token hợp lệ",
        data: {
          email: decoded.email,
        },
      });
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.json({
        code: "expired",
        message: "Token OTP đã hết hạn. Vui lòng đăng ký lại.",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.json({
        code: "invalid",
        message: "Token OTP không hợp lệ. Vui lòng đăng ký lại.",
      });
    }

    return res.json({
      code: "error",
      message: "Đã xảy ra lỗi khi xác thực token.",
    });
  }
}

// Middleware to protect OTP page route
export function requireOtpToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  verifyOtpToken(req, res, next);
}
