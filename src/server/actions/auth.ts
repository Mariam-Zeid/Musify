"use server";

import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt, { hash } from "bcryptjs";

import { signIn } from "@/auth";
import { prisma } from "@/server/db";
import { getAccountByUserId, getUserByEmail } from "@/server/data/user";
import { sendResetPasswordOTP, sendVerificationOTP } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  loginSchema,
  LoginSchema,
  NewPasswordSchema,
  newPasswordSchema,
  registerSchema,
  RegisterSchema,
  ResetPasswordOtpSchema,
  resetPasswordOtpSchema,
  ResetPasswordSchema,
  resetPasswordSchema,
  VerificationOtpSchema,
  verificationOtpSchema,
} from "@/lib/validations/auth";

// VERIFICATION OTP
export const getVerificationOTPByEmail = async (email: string) => {
  try {
    const verificationOTP = await prisma.verificationOTP.findFirst({
      where: {
        email,
      },
    });
    return verificationOTP;
  } catch (error) {
    console.error("Error fetching OTP by email:", error);
    return null;
  }
};
export const getVerificationOTPByOTP = async (otp: string) => {
  try {
    const verificationOTP = await prisma.verificationOTP.findFirst({
      where: {
        otp,
      },
    });
    return verificationOTP;
  } catch {
    return null;
  }
};
export const generateVerificationOTP = async (email: string) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingOTP = await getVerificationOTPByEmail(email);

    if (existingOTP) {
      await prisma.verificationOTP.delete({
        where: {
          id: existingOTP.id,
        },
      });
    }

    const verificationOTP = await prisma.verificationOTP.create({
      data: {
        email,
        otp,
        expires,
      },
    });

    return verificationOTP;
  } catch {
    return null;
  }
};

// RESET PASSWORD OTP
export const getResetPasswordOTPByEmail = async (email: string) => {
  try {
    const resetPasswordOTP = await prisma.resetPasswordOTP.findFirst({
      where: {
        email,
      },
    });
    return resetPasswordOTP;
  } catch (error) {
    console.error("Error fetching OTP by email:", error);
    return null;
  }
};
export const getResetPasswordOTPByOTP = async (otp: string) => {
  try {
    const resetPasswordOTP = await prisma.resetPasswordOTP.findFirst({
      where: {
        otp,
      },
    });

    return resetPasswordOTP;
  } catch {
    return null;
  }
};
export const generateResetPasswordOTP = async (email: string) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingOTP = await getResetPasswordOTPByEmail(email);

    if (existingOTP) {
      await prisma.resetPasswordOTP.delete({
        where: {
          id: existingOTP.id,
        },
      });
    }

    const verificationOTP = await prisma.resetPasswordOTP.create({
      data: {
        email,
        otp,
        expires,
      },
    });

    return verificationOTP;
  } catch {
    return null;
  }
};

// AUTH
export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { error: "Email already exists!" };
  }

  await prisma.user.create({
    data: {
      name: name.toLowerCase(),
      email,
      password: hashedPassword,
    },
  });

  const verificationOTP = await generateVerificationOTP(email);
  if (!verificationOTP) {
    return { error: "Failed to send OTP!" };
  }

  await sendVerificationOTP(verificationOTP.email, verificationOTP.otp);

  redirect("/auth/verification-otp");
};
export const verificationOTP = async (values: VerificationOtpSchema) => {
  const validatedFields = verificationOtpSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid OTP!" };

  const { otp } = validatedFields.data;
  const existingOTP = await getVerificationOTPByOTP(otp);

  if (!existingOTP) {
    return { error: "OTP does not exist!" };
  }

  const otpHasExpired = new Date(existingOTP.expires) < new Date();

  if (otpHasExpired) {
    return { error: "OTP has expired!" };
  }

  const existingUser = await getUserByEmail(existingOTP.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingOTP.email,
    },
  });

  await prisma.verificationOTP.delete({
    where: { id: existingOTP.id },
  });

  redirect("/auth/login");
};
export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
export const resetPassword = async (values: ResetPasswordSchema) => {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const existingAccount = await getAccountByUserId(existingUser.id);

  if (existingAccount) {
    return { error: "You are registered with a provider!" };
  }

  const passwordResetToken = await generateResetPasswordOTP(email);
  if (passwordResetToken) {
    await sendResetPasswordOTP(
      passwordResetToken.email,
      passwordResetToken.otp
    );
  }

  redirect("/auth/reset-otp");
};
export const resetPasswordOTP = async (values: ResetPasswordOtpSchema) => {
  const validatedFields = resetPasswordOtpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid OTP!" };
  }

  const { otp } = validatedFields.data;

  const existingOTP = await getResetPasswordOTPByOTP(otp);

  if (!existingOTP) {
    return { error: "OTP does not exist!" };
  }

  const otpHasExpired = new Date(existingOTP.expires) < new Date();

  if (otpHasExpired) {
    return { error: "OTP has expired!" };
  }

  cookies().set("reset_otp", otp); // 1 hour expiry

  redirect("/auth/new-password");
};
export const newPassword = async (values: NewPasswordSchema) => {
  const otp = cookies().get("reset_otp");

  if (!otp) {
    return { error: "Missing OTP!" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingOTP = await getResetPasswordOTPByOTP(otp.value);

  console.log({ existingOTP });

  if (!existingOTP) {
    return { error: "Invalid token" };
  }

  const otpHasExpired = new Date(existingOTP.expires) < new Date();

  if (otpHasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingOTP.email);

  if (!existingUser) {
    return { error: "Email does not exists!" };
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.resetPasswordOTP.delete({
    where: { id: existingOTP.id },
  });

  redirect("/auth/login");
};
