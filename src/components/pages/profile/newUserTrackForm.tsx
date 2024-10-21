"use client";

import FormAction from "@/components/shared/form/formAction";
import { FieldValues } from "react-hook-form";
import { addUserTrackSchema } from "@/lib/validations/user";
import { deleteFile, uploadFile } from "@/lib/supabaseBuckets";
import { useState } from "react";
import { useUserTrackMutations } from "@/client/hooks/useUserTrack";
import { useCurrentUser } from "@/client/store/useCurrentUser";

const NewUserTrackForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const {user} = useCurrentUser()
  const { addTrack } = useUserTrackMutations();

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
      const uploadPath = `${user?.name}/own-songs/${values.name}/${imageFile.name}`;
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

    if (audioFile) {
      const uploadPath = `${user?.name}/own-songs/${values.name}/${audioFile.name}`;
      const { url, error: uploadError } = await uploadFile(
        audioFile,
        uploadPath,
        "users"
      );
      if (uploadError) {
        setFormError(`Audio upload failed: ${uploadError}`);
        return;
      }
      dataToSubmit.audio_url = url;
    }

    const result = await addTrack({
      name: dataToSubmit.name,
      image: dataToSubmit.image,
      audio_url: dataToSubmit.audio_url,
    });
    if (result?.error) {
      setFormError(result.error);
      await deleteFile(dataToSubmit.image, "users");
      await deleteFile(dataToSubmit.audio_url, "users");
      return;
    }
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
      error={formError || ""}
    />
  );
};

export default NewUserTrackForm;
