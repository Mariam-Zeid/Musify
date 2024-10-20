"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addAlbumSchema } from "@/lib/validations/album";
import { useAlbumsMutations } from "@/client/hooks/useAlbums";
import { deleteFile, uploadFile } from "@/lib/supabaseBuckets";
import { useArtist } from "@/client/hooks/useArtists";
import Loading from "@/components/shared/loading/loading";

interface NewAlbumFormProps {
  artistId: string;
}
const NewAlbumForm = ({ artistId }: NewAlbumFormProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const { data: artist, isLoading } = useArtist({ artistId });
  const { addAlbum } = useAlbumsMutations();

  if (isLoading) {
    return <Loading />;
  }

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
        artist?.name
      }/albums/${values.name.toLowerCase()}/coverImage/${imageFile.name}`;
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

    const result = await addAlbum({
      name: dataToSubmit.name,
      image: dataToSubmit.image,
      artist_id: artistId,
    });
    if (result?.error) {
      setFormError(result.error);
      await deleteFile(dataToSubmit.image, "artists");
      return;
    }
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
      error={formError || ""}
    />
  );
};

export default NewAlbumForm;
