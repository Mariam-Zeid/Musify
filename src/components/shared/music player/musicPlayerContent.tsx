import { BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Slider } from "@/components/ui/slider";
import SongItemRow from "../songs/songItemRow";

const MusicPlayerContent = () => {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex gap-x-12">
        {/* Media item */}
        <div className="wrapper">
          <SongItemRow title="Habeebe leeh" subtitle="Tul8te" />
        </div>

        {/* Play Controllers  */}
        <div className="wrapper flex-grow">
          <div className="flex flex-col gap-y-1">
            <Slider value={[30]} max={100} step={1} />
            <div className="duration-wrapper flex justify-between">
              <p>00:00</p>
              <p>02:03</p>
            </div>
          </div>
          <div
            className="
            md:flex 
            justify-center 
            items-center 
            w-full 
            gap-x-6
          "
          >
            <AiFillStepBackward
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
            <div
              className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
            >
              <BsPlayFill size={30} className="text-black" />
            </div>

            <AiFillStepForward
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
          </div>
        </div>

        {/* Volume Controller */}
        <div className="wrapper">
          <div className="flex items-center gap-x-2 w-[140px] h-full">
            <HiSpeakerWave className="cursor-pointer" size={34} />
            <Slider value={[30]} max={100} step={1} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-y-4">
        {/* Media item */}
        <div className="wrapper">
          <SongItemRow title="Habeebe leeh" subtitle="Tul8te" />
        </div>

        {/* Play Controllers  */}
        <div className="wrapper">
          <div className="flex flex-col gap-y-2 w-full">
            <Slider value={[30]} max={100} step={1} />
            <div className="duration-wrapper flex justify-between">
              <p>00:00</p>
              <p>02:03</p>
            </div>
          </div>
          <div
            className="
            flex 
            justify-center 
            items-center 
            w-full 
            gap-x-6
          "
          >
            <AiFillStepBackward
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
            <div
              className="
              flex 
              items-center 
              justify-center
              h-12
              w-12
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
            >
              <BsPlayFill size={35} className="text-black" />
            </div>

            <AiFillStepForward
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayerContent;
