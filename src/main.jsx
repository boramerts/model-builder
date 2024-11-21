import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "./components/dropdown";
import ModelBox from "./components/model_box.jsx";
import "./output.css"; // Include your Tailwind styles

import FileIcon from "@mui/icons-material/NoteAddOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";

const App = () => (
  <div className="flex flex-col justify-between min-h-screen px-20 py-10">
    <div className="w-full h-20 bg-gray-300 rounded-3xl border-2 border-gray-400 flex flex-row items-center justify-between"> {/* Top row */}
      <div className="w-1/2 h-20 flex flex-row items-center justify-start p-5">
        <p className="text-black text-center text-2xl font-bold">
          Model Builder
        </p>
        <p className="text-black text-center font-normal p-5">Preset:</p>
        <Dropdown></Dropdown>
      </div>

      <div className="w-1/2 h-20 flex flex-row items-center justify-end p-5 space-x-3">
        <button className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row">
          <FileIcon></FileIcon>
          <p>New</p>
        </button>
        <button className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row">
          <SaveIcon></SaveIcon>
          <p>Save</p>
        </button>
        <button className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row">
          <ExportIcon></ExportIcon>
          <p>Export</p>
        </button>
      </div>
    </div>

    <div className="flex-1"></div>

    <div className="flex flex-row space-x-4 w-full h-64 bg-gray-300 rounded-3xl border-2 border-gray-400 p-5">
      <ModelBox></ModelBox>
      <ModelBox></ModelBox>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
