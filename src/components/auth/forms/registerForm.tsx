"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { registerSchema } from "@/lib/validations/auth";

const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    console.log(values);
  };

  return (
    <FormAction
      schema={registerSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      ]}
      title="Register"
      description="Register for an account"
      buttonText="Register"
      error={formError || ""}
      showSocialProviders={true}
    >
      <p className="text-sm font-light text-slate-300">
        Already have an account?{" "}
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

export default RegisterForm;
