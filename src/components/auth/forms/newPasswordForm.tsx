"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { loginSchema } from "@/lib/validations/auth";
import { newPassword } from "@/server/actions/auth";

const NewPasswordForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    const { password } = values;
    const result = await newPassword({ password });
    if (result?.error) {
      setFormError(result.error);
      return;
    }
  };

  return (
    <FormAction
      schema={loginSchema}
      defaultValues={{
        password: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "password",
          label: "New Password",
          type: "password",
          placeholder: "********",
        },
      ]}
      title="New Password"
      description="Enter the new password"
      buttonText="Change password"
      error={formError || ""}
    />
  );
};

export default NewPasswordForm;
