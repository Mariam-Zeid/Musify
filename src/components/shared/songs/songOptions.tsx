"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import ConfirmationDialog from "@/components/shared/confirm dialog/confirmationDialog";
import { useCurrentRole } from "@/client/store/useCurrentUser";

interface SongOptionsProps {
  showOptions?: boolean;
  onDelete?: () => void;
  onAddToPlaylist?: () => void;
  onRemoveFromPlaylist?: () => void;
  isInPlaylist?: boolean;
}
const SongOptions = ({
  showOptions = false,
  onDelete,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  isInPlaylist = false,
}: SongOptionsProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { role } = useCurrentRole();
  const isAdmin = role === UserRole.ADMIN;
  const isPlaylistPage = pathname.startsWith("/profile/playlists");
  const isUserTracksPage = pathname === "/profile/user-songs";

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
          {isPlaylistPage &&
            (isInPlaylist ? (
              <DropdownMenuItem onClick={onRemoveFromPlaylist}>
                remove from playlist
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onAddToPlaylist}>
                add to playlist
              </DropdownMenuItem>
            ))}

          {!isAdmin && isUserTracksPage && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              delete song
            </DropdownMenuItem>
          )}
          {isAdmin && (
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
