"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { resetPasswordOtpSchema } from "@/lib/validations/auth";
import { resetPasswordOTP } from "@/server/actions/auth";

const ResetOTPForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    const { otp } = values;
    const result = await resetPasswordOTP({ otp });
    if (result?.error) {
      setFormError(result.error);
      return;
    }
  };

  return (
    <FormAction
      schema={resetPasswordOtpSchema}
      defaultValues={{
        otp: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "otp",
          label: "OTP",
          type: "text",
          placeholder: "OTP",
        },
      ]}
      title="Reset Password OTP"
      description="Enter the OTP to reset your password"
      buttonText="Verify OTP"
      error={formError || ""}
    />
  );
};

export default ResetOTPForm;
