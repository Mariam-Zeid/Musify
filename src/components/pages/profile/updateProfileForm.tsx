"use client";

import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { updateAccountSchema } from "@/lib/validations/user";

const EditProfileForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={updateAccountSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        newPassword: "",
        image: "",
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
          placeholder: "Password",
        },
        {
          name: "newPassword",
          label: "New Password",
          type: "password",
          placeholder: "New Password",
        },
        {
          name: "image",
          label: "Profile Image",
          type: "file",
          accept: "image/*",
        },
      ]}
      title="Update Profile"
      description="Update your account details."
      buttonText="Update Profile"
    />
  );
};

export default EditProfileForm;
