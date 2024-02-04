import React from "react";
import SearchResultBox from "./searchResultBox";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState([]);
  const debounceValue = useDebounce(searchTerm, 500);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://127.0.0.1:5000/search?song_name=" + debounceValue
      );
      const json = await res.data;
      setData(json.songs);
    };
   debounceValue && fetch();
  }, [debounceValue]);

  return (
    <div className="w-full p-2 h-[10%] fixed top-0 flex items-center justify-center z-20">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 text-white p-4 bg-zinc-800 outline-none rounded-md"
        type="search"
        placeholder="Search for Music"
      />
      <div
        className={`absolute top-[70px] fade-in-expand ${
          searchTerm.trim() && "show"
        } w-1/2 flex flex-col items-start justify-start bg-zinc-800 p-2 rounded-md overflow-x-hidden overflow-y-scroll max-h-[400px]`}
        style={{ scrollBehavior: "smooth" }}
      >
        {data.length > 0 ? (
          data.map((item, index) => {
            return <SearchResultBox key={index} {...item} />;
          })
        ) : (
          <div className="text-white flex items-center justify-center w-full my-4">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
// const data = [
//   {
//     name: "Song 1",
//     artist: "Artist 1",
//     image: "https://picsum.photos/200",
//     album: "Album 1",
//     duration: "3:00",
//   },
//   {
//     name: "Song 2",
//     artist: "Artist 2",
//     image: "https://picsum.photos/200",
//     album: "Album 2",
//     duration: "3:00",
//   },
//   {
//     name: "Song 2",
//     artist: "Artist 2",
//     image: "https://picsum.photos/200",
//     album: "Album 2",
//     duration: "3:00",
//   },
//   {
//     name: "Song 2",
//     artist: "Artist 2",
//     image: "https://picsum.photos/200",
//     album: "Album 2",
//     duration: "3:00",
//   },
//   {
//     name: "Song 2",
//     artist: "Artist 2",
//     image: "https://picsum.photos/200",
//     album: "Album 2",
//     duration: "3:00",
//   },
// ];
