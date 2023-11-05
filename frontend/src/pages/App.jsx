import React from "react";
import axios from "axios";
function App() {
  const [value, setValue] = React.useState({name:"", year:""});
  const [data, setData] = React.useState([]);
  function handleInput(event) {
    setValue({ ...value, [event.target.id]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:5000/recommend", {
        input: [{ name: value.name, year: parseInt(value.year) }],
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col h-full items-center justify-center border-[.1px] border-black">
      <form
        onSubmit={handleSubmit}
        className="h-[80px] w-3/4 flex items-center justify-center text-black gap-2"
      >
          <input
            onChange={handleInput}
            type="text"
            id="name"
            placeholder="music name"
            className="w-full h-[40px] p-4 rounded-l-sm outline-none border-[.1px] border-black"
          />
          <input
            onChange={handleInput}
            type="text"
            id="year"
            placeholder="year"
            className="w-full h-[40px] p-4 rounded-l-sm outline-none border-[.1px] border-black"
          />
        <button
          type="submit"
          className="h-[40px] px-2 bg-white text-black border-[.1px] border-black rounded-r-sm"
        >
          Submit
        </button>
      </form>
      <div className="w-full flex-1 flex flex-col items-center border-[.5px] border-white">
        {data.map((item, id) => {
          return (
            <div
              key={id}
              className="w-3/4 h-[40px] flex items-center justify-between px-2 border-[.1px] border-black"
            >
              <p>{item.name}</p>
              <p>{item.year}</p>
              <p>{item.artist}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
