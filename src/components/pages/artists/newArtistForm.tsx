"use client";

import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addArtistSchema } from "@/lib/validations/artist";

const NewArtistForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={addArtistSchema}
      defaultValues={{
        name: "",
        image: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Artist Name",
          type: "text",
          placeholder: "Artist Name",
        },
        {
          name: "image",
          label: "Artist Image",
          type: "file",
          accept: "image/*",
        },
      ]}
      title="Add New Artist"
      description="Add a new artist to your collection"
      buttonText="Add Artist"
    />
  );
};

export default NewArtistForm;
