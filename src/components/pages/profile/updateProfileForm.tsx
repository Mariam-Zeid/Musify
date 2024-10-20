"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { updateAccountSchema } from "@/lib/validations/user";
import { updateUser } from "@/server/actions/user";
import { uploadFile } from "@/lib/supabaseBuckets";
import { useCurrentUser } from "@/client/store/useCurrentUser";

const UpdateProfileForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const {update, user} = useCurrentUser()
  const onSubmit = async (values: FieldValues) => {
    let imageFile: File | undefined;
    let dataToSubmit: FieldValues = values;

    if (values.image) {
      imageFile = (values.image as FileList)[0];
      dataToSubmit = { ...values, image: null };
    }
    const data = await updateUser(dataToSubmit);
    console.log({ data });
    if (data?.error) {
      setFormError(data.error);
    }
    if (imageFile) {
      const uploadPath = `${user?.name}/image/${imageFile.name}`;
      const { url, error: uploadError } = await uploadFile(
        imageFile,
        uploadPath,
        "users"
      );

      if (uploadError) {
        setFormError(`Image upload failed: ${uploadError}`);
        return;
      }

      // Now pass the public URL to the server action to store it
      const updatedDataToSubmit = {
        ...values,
        image: url,
      };

      const updatedData = await updateUser(updatedDataToSubmit);

      if (updatedData?.error) {
        setFormError(updatedData.error);
      }
    }
    await update();
  };

  return (
    <FormAction
      schema={updateAccountSchema}
      defaultValues={{
        name: user?.name || "",
        email: user?.email || "",
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
          disabled: true,
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
      error={formError || ""}
    />
  );
};

export default UpdateProfileForm;
