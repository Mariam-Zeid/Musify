"use client";

import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addTrackSchema } from "@/lib/validations/track";

const NewTrackForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={addTrackSchema}
      defaultValues={{
        name: "",
        image: "",
        artist_id: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Track Name",
          type: "text",
          placeholder: "Track Name",
        },
        {
          name: "image",
          label: "Track Image",
          type: "file",
          accept: "image/*",
        },
        {
          name: "audio_url",
          label: "Track Audio",
          type: "file",
          accept: "audio/*",
        },
      ]}
      title="Add New Track"
      description="Add a new track to your collection"
      buttonText="Add Track"
    />
  );
};

export default NewTrackForm;
