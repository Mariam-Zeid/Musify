"use client";

import { Track, UserTrack } from "@prisma/client";
import { useRef } from "react";
import {
  useFavoriteMutations,
  useUserFavorites,
} from "@/client/hooks/useFavorites";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

interface LikeButtonProps {
  track: Track | UserTrack;
}
const LikeButton = ({ track }: LikeButtonProps) => {
  const { user } = useCurrentUser();
  const { data: favorites } = useUserFavorites();
  const { likeTrack, unlikeTrack } = useFavoriteMutations();
  const router = useRouter();

  const requestInProgress = useRef(false);

  const isLiked = favorites?.some((favorite) => favorite.track_id === track?.id);

  const Icon = isLiked ? BiSolidHeart : BiHeart;

  const handleToggleLike = async () => {
    if (!user) {
      return router.push("/auth/login");
    }

    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;

    const toastPromise = isLiked ? unlikeTrack(track.id) : likeTrack(track.id);

    toast
      .promise(toastPromise, {
        loading: isLiked ? "Unliking..." : "Liking...",
        success: <b>{isLiked ? "Track unliked!" : "Track liked!"}</b>,
        error: <b>Could not update track.</b>,
      })
      .finally(() => {
        requestInProgress.current = false;
      });
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleToggleLike}
      disabled={requestInProgress.current}
    >
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
