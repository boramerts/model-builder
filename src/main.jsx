import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "./components/dropdown";
import ModelBox from "./components/model_box.jsx";
import "./output.css"; // Include your Tailwind styles

import FileIcon from "@mui/icons-material/NoteAddOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from '@mui/icons-material/AddCircleOutline';

const App = () => {
  const [modelBoxes, setModelBoxes] = React.useState([1]);

  const addModelBox = () => {
    setModelBoxes([...modelBoxes, modelBoxes.length + 1]);
  };

  const deleteModelBox = (id) => {
    setModelBoxes(modelBoxes.filter((boxId) => boxId !== id));
  }

  return (
    <div className="flex flex-col justify-between min-h-screen px-20 py-10">
      {/* Top div */}
      <div className="w-full h-20 bg-gray-300 rounded-3xl border-2 border-gray-400 flex flex-row items-center justify-between"> 
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

      {/* Bottom div */}
      <div className="flex flex-row space-x-4 w-full h-64 bg-gray-300 rounded-3xl border-2 border-gray-400 p-5 overflow-x-auto scrollbar-none">
        {modelBoxes.map((id, index) => (
          <ModelBox key={id} 
          id = {id}
          layerNumber={index + 1}
          onDelete={() => deleteModelBox(id)}
          />
        ))}
        <button 
          onClick={addModelBox}
          className="aspect-square h-full bg-white rounded-2xl border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center"
        >
          <AddIcon sx={{ fontSize: 40, color: '#9CA3AF' }} />
        </button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
