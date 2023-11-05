import React from "react";
import App from "./pages/App";
import { createRoot } from "react-dom/client";
import "./index.css";


const rootElement = createRoot(document.getElementById("root"));

rootElement.render(<Application />);

function Application() {
  return (
    <div className="px-20">
      <App />
    </div>
  );
}
