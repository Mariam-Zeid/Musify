import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Mininum of 6 characters required"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Email is required"),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = z.object({
  password: z.string().min(6, "Mininum of 6 characters required"),
});
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export const verificationOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 characters.",
  }),
});
export type VerificationOtpSchema = z.infer<typeof verificationOtpSchema>;

export const resetPasswordOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 characters.",
  }),
});
export type ResetPasswordOtpSchema = z.infer<typeof resetPasswordOtpSchema>;
