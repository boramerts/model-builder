import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "./components/dropdown";
import "./output.css"; // Include your Tailwind styles

const App = () => (
  <div className="flex flex-col justify-between min-h-screen px-20 py-10">
    <div className="w-full h-20 bg-gray-300 rounded-3xl border-2 border-gray-400 flex flex-row items-center justify-start">
      <p className="text-black p-5 text-center text-2xl font-bold">Model Builder</p>
      <p className="text-black p-5 text-center font-normal">Preset</p>

      <Dropdown></Dropdown>

      <p className="text-black p-5 text-center font-bold">Top Rectangle</p>
    </div>

    <div className="flex-1"></div>

    <div className="w-full h-52 bg-gray-300 rounded-3xl border-2 border-gray-400">
      <p className="text-white text-center p-5 font-bold">Bottom Rectangle</p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
