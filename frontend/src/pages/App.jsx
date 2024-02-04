import React from "react";
import HomeBanner from "../components/homeBanner";
import BottomNav from "../components/BottomNav";

function App() {
  return (
    <div className="w-screen h-screen bg-zinc-950 overflow-hidden">
      <HomeBanner />
      <BottomNav />
    </div>
  );
}

export default App;
