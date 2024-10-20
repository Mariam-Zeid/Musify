"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { loginSchema } from "@/lib/validations/auth";
import { login } from "@/server/actions/auth";
import { useCurrentUser } from "@/client/store/useCurrentUser";

const LoginForm = () => {
  const { update } = useCurrentUser();
  const [formError, setFormError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already linked with another account."
      : "";

  const onSubmit = async (values: FieldValues) => {
    setFormError(null);
    const { email, password } = values;
    const result = await login({ email, password });
    if (result?.error) {
      setFormError(result.error);
      return;
    }
    update();
  };
  return (
    <FormAction
      schema={loginSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      fields={[
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
      title="Login"
      description="Login to your account"
      buttonText="Login"
      error={formError || urlError || ""}
      showSocialProviders={true}
    >
      <button type="button" className="self-start text-sm font-light underline">
        <Link href="/auth/reset-password">Forgot Password?</Link>
      </button>
      <p className="text-sm font-light text-slate-300">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="font-semibold hover:underline transition text-white"
        >
          <Link href="/auth/register">Signup</Link>
        </button>
      </p>
    </FormAction>
  );
};

export default LoginForm;
