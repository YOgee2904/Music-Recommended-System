import React from "react";
import {
  FaPlay,
  FaPause,
  FaRegFileAlt,
  FaMicrophone,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { truncateText } from "./searchResultBox";

export default function BottomNav() {
  const [isPlay, setIsPlay] = React.useState(false);
  const song = useSelector((state) => state.song)
  const handleClick = () => {
    setIsPlay(!isPlay);
  };
  return (
    <div className="w-full p-3 h-[10%] bg-zinc-900 fixed bottom-0 flex items-center justify-center">
      <div className="w-1/4 flex items-center justify-start gap-5 min-w-max">
        <img
          src={song.image}
          alt=""
          className="w-12 h-12 rounded-md"
        />
        <div className="flex flex-col text-sm min-w-max">
          <div className="text-white font-semibold">{truncateText(song.name)}</div>
          <div className="text-gray-400">{song.artist}</div>
        </div>
      </div>
      <div className="w-2/4 flex flex-col gap-3 items-center justify-center">
        <div className="flex justify-evenly items-center gap-4">
          <div className="p-3 rounded-full bg-zinc-600 flex items-center justify-center">
            <FaStepBackward className="text-[#ccc] w-4 h-4" />
          </div>
          <div className="p-3 rounded-full bg-zinc-600 flex items-center justify-center">
            {isPlay ? (
              <FaPause
                className="text-[#ccc] w-4 h-4"
                onClick={handleClick}
              />
            ) : (
              <FaPlay className="text-[#ccc] w-4 h-4" onClick={handleClick} />
            )}
          </div>
          <div className="p-3 rounded-full bg-zinc-600 flex items-center justify-center">
            <FaStepForward className="text-[#ccc] w-4 h-4" />
          </div>
        </div>
        <div className="relative w-full ">
          <div className="absolute w-full bg-zinc-600 h-[4px] "></div>
          <div className="absolute w-1/2 bg-[#ccc] h-[4px]"></div>
        </div>
      </div>
      <div className="w-1/4 flex justify-end items-center gap-5">
        <div className="p-3 rounded-full bg-zinc-600 flex items-center justify-center">
          <FaRegFileAlt className="text-[#ccc] w-4 h-4" />
        </div>
        <div className="p-3 rounded-full bg-zinc-600 flex items-center justify-center">
          <FaMicrophone className="text-[#ccc] w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
