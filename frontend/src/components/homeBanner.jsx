import React from "react";
import SearchResultBox, { truncateText } from "./searchResultBox";
import SearchBox from "./searchBox";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
export default function HomeBanner() {
  const recommendedSongs = useSelector((state) => state.song.rec);
  const isLoaded = useSelector((state) => state.song.isLoaded);
  const dispatch = useDispatch();
  console.log(isLoaded);
  React.useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "IS_LOADED",
        payload: true,
      })
  }, 2000)
}, [dispatch])
  return (
    <div className="mb-[5%] w-full grid grid-cols-3 h-[90%] z-0">
      <div className="col-span-2 w-full h-full flex items-center justify-center">
        <SearchBox />
        <div className="text-white text-4xl font-bold">
          Welcome to Music App
        </div>
      </div>
      <div className="flex flex-col items-start justify-start bg-zinc-800 overflow-x-hidden overflow-y-scroll">
        <div className="fixed z-10 w-full bg-zinc-800 text-xl text-white p-3 ">
          Recommended Songs
        </div>
        <div
          className="relative top-[50px] flex flex-col items-start justify-start bg-zinc-800 p-2 w-full "
          style={{ scrollBehavior: "smooth" }}
        >
          {recommendedSongs.length > 0 ? (isLoaded ? (
            recommendedSongs.map((item, index) => {
              return <SearchResultBox key={index} {...item} />;
            })
          ) : <HashLoader color="#cccc" />): (
            <div className="text-[#ccc] text-xl flex items-center justify-center w-full my-4">
              🥲 No Song to Display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
