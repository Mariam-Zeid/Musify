"use client";

import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addPlaylistSchema } from "@/lib/validations/user";

const NewPlaylistForm = () => {
  const onSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <FormAction
      schema={addPlaylistSchema}
      defaultValues={{
        name: "",
        image: "",
      }}
      onSubmit={onSubmit}
      fields={[
        {
          name: "name",
          label: "Playlist Name",
          type: "text",
          placeholder: "Playlist Name",
        },
        {
          name: "image",
          label: "Playlist Image",
          type: "file",
          accept: "image/*",
        },
      ]}
      title="Add New Playlist"
      description="Add a new playlist to your collection"
      buttonText="Add Playlist"
    />
  );
};

export default NewPlaylistForm;
