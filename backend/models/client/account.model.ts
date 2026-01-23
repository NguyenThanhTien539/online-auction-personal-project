import { getDb } from "@/config/database.config";

export async function isExistingEmail(email: string): Promise<boolean> {
  const db = getDb();
  const existingEmail = await db("users").where({ email }).first();
  return !!existingEmail;
}

export async function existsValidOtpByEmail(email: string): Promise<boolean> {
  const db = getDb();
  const existingOtp = await db("otp_codes")
    .where({ email })
    .andWhere("otp_expiry", ">", new Date())
    .first();
  return !!existingOtp;
}

export async function saveOtpCode(
  email: string,
  otpCode: string,
): Promise<void> {
  const db = getDb();
  await db("otp_codes").insert({
    email,
    otp_code: otpCode,
  });
}
