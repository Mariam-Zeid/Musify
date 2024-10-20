import MusicPlayerContent from "./musicPlayerContent";

const MusicPlayer = () => {
  return (
    <div
      className="
        fixed 
        bottom-0 
        left-0
        bg-black 
        w-full
        h-[190px]
        md:h-[120px]
        px-4
        pt-3
        pb-10
      "
    >
      <MusicPlayerContent />
    </div>
  );
};

export default MusicPlayer;
