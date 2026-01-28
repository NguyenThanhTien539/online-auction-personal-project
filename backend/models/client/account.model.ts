import { getDb } from "@/config/database.config";

export async function isExistingEmail(email: string): Promise<boolean> {
  const db = getDb();
  const existingEmail = await db("users").where({ email }).first();
  return !!existingEmail;
}

export async function countTotalUsers(): Promise<number> {
  const db = getDb();
  const result = await db("users")
    .count<{ count: number }>("user_id as count")
    .first();
  return result ? result.count : 0;
}

export async function createUserInfo(
  full_name: string,
  username: string,
  email: string,
): Promise<number> {
  const db = getDb();
  const result = await db("users")
    .insert({
      full_name,
      username,
      email,
    })
    .returning("user_id");
  return result[0].user_id;
}

export async function createUserAccount(
  userId: number,
  provider: string,
  password_hash: string,
): Promise<void> {
  const db = getDb();
  await db("user_auth_providers").insert({
    user_id: userId,
    provider,
    password_hash,
  });
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

export async function verifyOtpCode(
  email: string,
  otpCode: string,
): Promise<boolean> {
  const db = getDb();
  const otpRecord = await db("otp_codes")
    .where({ email, otp_code: Number(otpCode) })
    .andWhere("otp_expiry", ">", db.fn.now())
    .first();
  return !!otpRecord;
}
