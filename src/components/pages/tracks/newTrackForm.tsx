"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAction from "@/components/shared/form/formAction";
import { addTrackSchema } from "@/lib/validations/track";
import { useTrackMutations } from "@/client/hooks/useTracks";
import { deleteFile, uploadFile } from "@/lib/supabaseBuckets";
import { useArtistAlbum } from "@/client/hooks/useAlbums";
import { useArtist } from "@/client/hooks/useArtists";
import Loading from "@/components/shared/loading/loading";

interface NewTrackFormProps {
  artistId: string;
  albumId: string;
}
const NewTrackForm = ({ artistId, albumId }: NewTrackFormProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const { data: artist, isLoading: isArtistLoading } = useArtist({ artistId });
  const { data: album, isLoading: isAlbumLoading } = useArtistAlbum({
    albumId,
  });
  const { addTrack } = useTrackMutations();

  if (isArtistLoading || isAlbumLoading) {
    return <Loading />;
  }

  const onSubmit = async (values: FieldValues) => {
    let imageFile: File | undefined;
    let audioFile: File | undefined;
    let dataToSubmit: FieldValues = values;

    if (values.image) {
      imageFile = (values.image as FileList)[0];
      dataToSubmit = { ...values, image: null };
    }

    if (values.audio_url) {
      audioFile = (values.audio_url as FileList)[0];
      dataToSubmit = { ...values, audio_url: null };
    }

    setFormError(null);

    if (imageFile) {
      const uploadPath = `${artist?.name}/albums/${
        album?.name
      }/image/${imageFile.name}`;
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

    if (audioFile) {
      const uploadPath = `${artist?.name}/albums/${
        album?.name
      }/tracks/${audioFile.name}`;
      const { url, error: uploadError } = await uploadFile(
        audioFile,
        uploadPath,
        "artists"
      );
      if (uploadError) {
        setFormError(`Audio upload failed: ${uploadError}`);
        return;
      }
      dataToSubmit.audio_url = url;
    }

    if (values.year) {
      values.year = parseInt(values.year, 10);
    }
    const result = await addTrack({
      name: dataToSubmit.name,
      image: dataToSubmit.image,
      audio_url: dataToSubmit.audio_url,
      artist_id: artistId,
      album_id: albumId,
      year: dataToSubmit.year,
    });
    if (result?.error) {
      setFormError(result.error);
      await deleteFile(dataToSubmit.image, "artists");
      await deleteFile(dataToSubmit.audio_url, "artists");
      return;
    }
  };

  return (
    <FormAction
      schema={addTrackSchema}
      defaultValues={{
        name: "",
        image: "",
        audio_url: "",
        artist_id: "",
        album_id: "",
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
        {
          name: "year",
          label: "Release Year",
          type: "number",
          placeholder: "2024",
        },
      ]}
      title="Add New Track"
      description="Add a new track to your collection"
      buttonText="Add Track"
      error={formError || ""}
    />
  );
};

export default NewTrackForm;
