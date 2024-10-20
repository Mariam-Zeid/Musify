import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const FavoriteLink = () => {
  return (
    <Link href="/profile/favorites">
      <button
        className="relative w-full group flex items-center rounded-md overflow-hidden gap-x-4
    bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
      >
        <div className="relative min-w-[64px] min-h-[64px]">
          <Image
            className="object-cover"
            fill
            src="/images/liked.png"
            alt="Image"
          />
        </div>
        <p className="font-medium truncate py-5">Liked Songs</p>
        <div
          className="absolute transition opacity-0 rounded-full flex justify-center items-center
      bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
        >
          <FaPlay className="text-black" />
        </div>
      </button>
    </Link>
  );
};

export default FavoriteLink;
