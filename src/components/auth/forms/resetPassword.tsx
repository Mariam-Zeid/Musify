"use client";

import { useState } from "react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { resetPassword } from "@/server/actions/auth";

const ResetPasswordForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    const { email } = values;
    const result = await resetPassword({ email });
    if (result?.error) {
      setFormError(result.error);
      return;
    }
  };

  return (
    <FormAction
      schema={resetPasswordSchema}
      defaultValues={{
        email: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
      ]}
      title="Reset Password"
      description="Enter the email associated with your account"
      buttonText="Reset Password"
      error={formError || ""}
    >
      <p className="text-sm font-light text-slate-300">
        Remembered your password?{" "}
        <button
          type="button"
          className="font-semibold hover:underline transition text-white"
        >
          <Link href="/auth/login">Login</Link>
        </button>
      </p>
    </FormAction>
  );
};

export default ResetPasswordForm;
