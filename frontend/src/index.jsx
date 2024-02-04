import React from "react";
import App from "./pages/App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const rootElement = createRoot(document.getElementById("root"));

rootElement.render(
  <Provider store={store}>
    <Application />
  </Provider>
);

function Application() {
  return <App />;
}
