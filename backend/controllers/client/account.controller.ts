import { Request, Response } from "express";

export function register(req: Request, res: Response) {
  console.log("Login request received:", req.body);
  res.json({
    code: "success",
    message: "Login successful",
  })
}
