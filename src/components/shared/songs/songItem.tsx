import Image from "next/image";

interface SongItemProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
}
const SongItem = ({imageSrc, title, subtitle}: SongItemProps) => {
  return (
    <div
      className="
      flex 
      items-center 
      gap-x-3 
      cursor-pointer 
      hover:bg-neutral-800/50 
      w-full 
      p-2 
      rounded-md
    "
    >
      <div
        className="
        relative 
        rounded-md 
        min-h-[48px] 
        min-w-[48px] 
        overflow-hidden
      "
      >
        <Image
          fill
          src={imageSrc || "/images/liked.png"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{title}</p>
        <p className="text-neutral-400 text-sm truncate">{subtitle}</p>
      </div>
    </div>
  );
};

export default SongItem;
