import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchResultBox({
  name,
  artist,
  image = "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  album,
  duration = 0,
  year,
}) {
  const song = useSelector((state) => state.song);
  const dispatch = useDispatch();
  const selectSong = () => {
    const fetchRecommendedSongs = async () => {
      // console.log(`http://127.0.0.1:5000/recommend?song_name=${name.trim().replace(" ","%20")}&year=${year}`);
      const res = await axios.get(
        "http://127.0.0.1:5000/recommend?song_name=" + song.name,
      );
      const songs = await res.data;
      console.log(songs);
      dispatch({
        type: "RECOMMEND_SONGS",
        payload: songs,
      });
    };

    dispatch({
      type: "SELECT_SONG",
      payload: {
        name: name,
        artist,
        image,
        album,
        duration,
      },
    });
    song.name && fetchRecommendedSongs();
    console.log("rec", song.rec);
  };
  return (
    <div
      className="w-full flex items-center justify-center p-2 text-[14px] hover:bg-zinc-900 cursor-pointer rounded-sm"
      onClick={selectSong}
    >
      <div className="w-1/2 flex items-center justify-start">
        {image && <img src={image} alt="" className="w-16 h-16 rounded-md" />}
        <div className="flex flex-col ml-4">
          <div className="text-white font-semibold">
            {truncateText(name, 25)}
          </div>
          <div className="text-gray-400">{artist}</div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-end ml-4">
        <div className="text-white font-semibold">
          {/* {truncateText(album, 25)} */}
        </div>
        <div className="text-gray-400">{year}</div>
      </div>
    </div>
  );
}
function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}
