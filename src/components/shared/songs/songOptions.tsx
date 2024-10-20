"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import ConfirmationDialog from "@/components/shared/confirm dialog/confirmationDialog";

interface SongOptionsProps {
  showOptions?: boolean;
  onDelete?: () => void;
}
const SongOptions = ({ showOptions = true, onDelete }: SongOptionsProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isPlaylistPage = pathname.startsWith("/profile/playlists");
  const isUserOwnTracksPage = pathname === "/profile/user-songs";

  const handleDeleteConfirmation = () => {
    onDelete?.();
    setOpen(false);
  };

  if (!showOptions) return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <HiDotsHorizontal className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2" align="end">
          {isPlaylistPage ? (
            <DropdownMenuItem>remove from playlist</DropdownMenuItem>
          ) : (
            <DropdownMenuItem>add to playlist</DropdownMenuItem>
          )}

          {isUserOwnTracksPage && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              delete song
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        title="Delete Song"
        description="Are you sure you want to delete this song?"
        open={open}
        setOpen={setOpen}
        confirm={handleDeleteConfirmation}
      />
    </>
  );
};

export default SongOptions;
