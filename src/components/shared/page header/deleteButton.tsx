"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/shared/confirm dialog/confirmationDialog";

interface DeleteButtonProps {
  type: string;
  onDelete: () => void;
}

const DeleteButton = ({ type, onDelete }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);

  const getTitleAndDescription = (type: string) => {
    switch (type) {
      case "user":
        return {
          title: "Delete Account",
          description:
            "This will permanently delete your account and remove all your data from our servers.",
        };
      case "playlistTrack":
        return {
          title: "Remove Song from Playlist",
          description: "This will remove the song from your playlist.",
        };
      case "userOwnSongs":
        return {
          title: "Clear Playlist",
          description: "This will clear all songs from your playlist.",
        };
      default:
        return {
          title: `Delete ${type}`,
          description: `This will permanently delete the selected ${type}.`,
        };
    }
  };

  const { title, description } = getTitleAndDescription(type);

  const handleConfirm = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        {type === "favorites" || type === "userSongs" ? "Clear" : "Delete"}{" "}
        {type === "user"
          ? "account"
          : type === "favorites"
          ? "favorites"
          : type === "userSongs"
          ? "playlist"
          : type}
      </Button>

      <ConfirmationDialog
        title={title}
        description={description}
        open={open}
        setOpen={setOpen}
        confirm={handleConfirm}
      />
    </>
  );
};

export default DeleteButton;
