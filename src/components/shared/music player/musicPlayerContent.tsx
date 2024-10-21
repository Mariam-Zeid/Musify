"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Track, UserTrack } from "@prisma/client";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import SongItemRow from "@/components/shared/songs/songItemRow";
import { Slider } from "@/components/ui/slider";
import useTrackPlayer from "@/client/store/useTrackPlayer";

interface AudioPlayerContentProps {
  track: Track | UserTrack;
  trackUrl: string;
}
const MusicPlayerContent = ({ track, trackUrl }: AudioPlayerContentProps) => {
  const player = useTrackPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const Volume = volume > 0 ? HiSpeakerWave : HiSpeakerXMark;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(trackUrl, {
    volume: volume / 100, // Set volume (0 to 1)
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  // Automatically play the song when trackUrl changes
  useEffect(() => {
    if (sound) {
      play(); // Automatically play the new track
      return () => {
        sound.stop(); // Stop the current track when switching
      };
    }
  }, [trackUrl, play, sound]);

  // Update the current time as the track plays
  useEffect(() => {
    if (sound) {
      const updateCurrentTime = () => {
        setCurrentTime(sound.seek([]));
        if (sound.duration()) setDuration(sound.duration());
      };

      const interval = setInterval(updateCurrentTime, 1000);
      return () => clearInterval(interval);
    }
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const handleSeek = (value: number[]) => {
    if (sound) {
      sound.seek((value[0] / 100) * duration); // Seek based on slider position
    }
  };

  // Helper function to format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]; // Value is expected to be between 0 and 100
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume / 100); // Update sound volume
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(100);
    }
    if (sound) {
      sound.volume(volume > 0 ? 0 : 1);
    }
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex gap-x-12">
        {/* Media item */}
        <div className="wrapper w-[330px]">
          <SongItemRow
            track={track}
            title={track?.name}
            // @ts-expect-error Property 'artist' does not exist on type 'Track'
            subtitle={track?.artist?.name || track?.user?.name}
            // @ts-expect-error Property 'album' does not exist on type 'Track'
            imageSrc={track?.image || track?.album?.image || ""}
          />
        </div>

        {/* Play Controllers  */}
        <div className="wrapper flex-grow">
          <div className="flex flex-col gap-y-1">
            <Slider
              value={[(currentTime / duration) * 100 || 0]}
              onValueChange={handleSeek}
              max={100}
              step={1}
            />
            <div className="duration-wrapper flex justify-between">
              <p>{formatTime(currentTime)}</p>
              <p>{formatTime(duration)}</p>
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
              onClick={onPlayPrevious}
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
            <div
              onClick={handlePlay}
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
              <Icon size={30} className="text-black" />
            </div>

            <AiFillStepForward
              onClick={onPlayNext}
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
            <Volume className="cursor-pointer" size={34} onClick={toggleMute} />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-y-4">
        {/* Media item */}
        <div className="wrapper">
          <SongItemRow
            track={track}
            title={track?.name}
            // @ts-expect-error Property 'artist' does not exist on type 'Track'
            subtitle={track?.artist?.name || track?.user?.name}
            // @ts-expect-error Property 'album' does not exist on type 'Track'
            imageSrc={track?.image || track?.album?.image || ""}
          />
        </div>

        {/* Play Controllers  */}
        <div className="wrapper">
          <div className="flex flex-col gap-y-2 w-full">
            <Slider
              value={[(currentTime / duration) * 100 || 0]}
              onValueChange={handleSeek}
              max={100}
              step={1}
            />
            <div className="duration-wrapper flex justify-between">
              <p>{formatTime(currentTime)}</p>
              <p>{formatTime(duration)}</p>
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
              onClick={onPlayPrevious}
              size={30}
              className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
            />
            <div
              onClick={handlePlay}
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
              <Icon size={35} className="text-black" />
            </div>

            <AiFillStepForward
              onClick={onPlayNext}
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
