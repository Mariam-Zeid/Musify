"use client";

import FormAction from "@/components/shared/form/formAction";
import { FieldValues } from "react-hook-form";
import { addUserTrackSchema } from "@/lib/validations/user";

const NewUserTrackForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={addUserTrackSchema}
      defaultValues={{ name: "", image: "", audio_url: "" }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Song Name",
          type: "text",
          placeholder: "Song Name",
        },
        {
          name: "image",
          label: "Song Image",
          type: "file",
          accept: "image/*",
        },
        {
          name: "audio_url",
          label: "Song Audio",
          type: "file",
          accept: "audio/*",
        },
      ]}
      title="Add New Song"
      description="Add a new Song to your collection"
      buttonText="Add Song"
    />
  );
};

export default NewUserTrackForm;
