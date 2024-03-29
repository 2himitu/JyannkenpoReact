import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Friendlist from "./Components/Friend/Friendlist";
import Tensorflow from "./Tensorflow";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Friendlist />
    <Tensorflow />
  </React.StrictMode>
);
