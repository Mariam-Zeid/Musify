import Link from "next/link";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import SongItem from "../songs/songItem";
import { useCurrentUser } from "@/client/store/useCurrentUser";

const Library = () => {
  const { user } = useCurrentUser();
  const capitalizeFirstLetter = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your libray</p>
        </div>
        <Link href="/profile/playlists/new-playlist">
          <AiOutlinePlus
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={20}
          />
        </Link>
      </div>
      {user ? (
        <>
          <Link href="/profile/favorites">
            <SongItem title="Liked Songs" />
          </Link>
          <Link href="/profile/user-songs">
            <SongItem
              title={`${
                user?.name ? capitalizeFirstLetter(user.name.split(" ")[0]) : ""
              }'s Songs`}
              imageSrc="/images/song-logo.avif"
            />
          </Link>
        </>
      ) : (
        <p className="text-neutral-400 px-3">Login to see your library</p>
      )}
    </div>
  );
};

export default Library;
