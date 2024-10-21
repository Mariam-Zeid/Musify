"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addPlaylistSchema } from "@/lib/validations/user";
import { useUserPlaylistsMutations } from "@/client/hooks/usePlaylists";
import { deleteFile, uploadFile } from "@/lib/supabaseBuckets";
import { useCurrentUser } from "@/client/store/useCurrentUser";

const NewPlaylistForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const {user} = useCurrentUser()
  const {addPlaylist} = useUserPlaylistsMutations()
  const onSubmit = async (values: FieldValues) => {
    let imageFile: File | undefined;
    let dataToSubmit: FieldValues = values;

    if (values.image) {
      imageFile = (values.image as FileList)[0];
      dataToSubmit = { ...values, image: null };
    }

    setFormError(null);

    if (imageFile) {
      const uploadPath = `${
        user?.name
      }/playlists/${values.name.toLowerCase()}/coverImage/${imageFile.name}`;
      const { url, error: uploadError } = await uploadFile(
        imageFile,
        uploadPath,
        "users"
      );
      if (uploadError) {
        setFormError(`Image upload failed: ${uploadError}`);
        return;
      }
      dataToSubmit = {
        ...values,
        image: url,
      };
    }

    const result = await addPlaylist({
      name: dataToSubmit.name,
      image: dataToSubmit.image,
    });

    if (result?.error) {
      setFormError(result.error);
      await deleteFile(dataToSubmit.image, "users");
      return;
    }
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
      error={formError || ""}
    />
  );
};

export default NewPlaylistForm;
