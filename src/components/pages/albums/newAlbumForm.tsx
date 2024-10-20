"use client";

import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addAlbumSchema } from "@/lib/validations/album";

const NewAlbumForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={addAlbumSchema}
      defaultValues={{
        name: "",
        image: "",
        artist_id: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Album Name",
          type: "text",
          placeholder: "Album Name",
        },
        {
          name: "image",
          label: "Album Image",
          type: "file",
          accept: "image/*",
        },
      ]}
      title="Add New Album"
      description="Add a new album to your collection"
      buttonText="Add Album"
    />
  );
};

export default NewAlbumForm;
