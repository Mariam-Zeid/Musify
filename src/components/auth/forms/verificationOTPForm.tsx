"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { verificationOtpSchema } from "@/lib/validations/auth";
import { verificationOTP } from "@/server/actions/auth";

const VerificationOTPForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    const { otp } = values;
    const result = await verificationOTP({ otp });
    if (result?.error) {
      setFormError(result.error);
      return;
    }
  };

  return (
    <FormAction
      schema={verificationOtpSchema}
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
      title="Verify OTP"
      description="Enter the OTP sent to your email"
      buttonText="Verify OTP"
      error={formError || ""}
    />
  );
};

export default VerificationOTPForm;
