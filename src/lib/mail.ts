import { generateMonthlySummaryEmail } from "@/server/actions/user";
import { getMonthlyUserStats } from "@/server/data/user";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development", // true
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

export const sendVerificationOTP = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: '"Musify" <onboarding@musify.com>',
      to: email,
      subject: "Confirm your email",
      html: `<p>Your OTP is</p><h1>${otp}</h1>`,
    });
    console.log("Verification OTP sent");
  } catch (error) {
    console.error("Error sending verification OTP:", error);
  }
};

export const sendResetPasswordOTP = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: '"Musify" <onboarding@musify.com>',
      to: email,
      subject: "Reset your password",
      html: `<p>Your OTP is</p><h1>${otp}</h1>`,
    });
    console.log("Reset Password OTP sent");
  } catch (error) {
    console.error("Error sending reset password OTP:", error);
  }
};

export const sendMonthlySummary = async () => {
  const userStats = await getMonthlyUserStats();

  for (const { email, tracks, totalPlayCount } of userStats) {
    const emailContent = generateMonthlySummaryEmail(tracks, totalPlayCount);

    try {
      await transporter.sendMail({
        from: '"Musify" <no-reply@musify.com>',
        to: email,
        subject: "Your Monthly Musify Summary",
        html: emailContent,
      });
    } catch (error) {
      console.error(`Error sending monthly summary to ${email}:`, error);
    }
  }
};
