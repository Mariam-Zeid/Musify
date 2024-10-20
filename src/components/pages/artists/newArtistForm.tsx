"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addArtistSchema } from "@/lib/validations/artist";
import { useArtistMutations } from "@/client/hooks/useArtists";
import { deleteFile, uploadFile } from "@/lib/supabaseBuckets";

const NewArtistForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const { addArtist } = useArtistMutations();

  const onSubmit = async (values: FieldValues) => {
    let imageFile: File | undefined;
    let dataToSubmit: FieldValues = values;

    if (values.image) {
      imageFile = (values.image as FileList)[0];
      dataToSubmit = { ...values, image: null };
    }

    setFormError(null);

    if (imageFile) {
      const uploadPath = `${values.name.toLowerCase()}/image/${imageFile.name}`;
      const { url, error: uploadError } = await uploadFile(
        imageFile,
        uploadPath,
        "artists"
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

    const result = await addArtist({
      name: dataToSubmit.name,
      image: dataToSubmit.image,
    });
    if (result?.error) {
      setFormError(result.error);
      await deleteFile(dataToSubmit.image, "artists");
      return;
    }
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
      error={formError || ""}
    />
  );
};

export default NewArtistForm;
