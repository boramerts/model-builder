import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "./components/dropdown";
import ModelBox from "./components/model_box.jsx";
import Canvas from "./components/Canvas";
import "./output.css";

import FileIcon from "@mui/icons-material/NoteAddOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutline";

const App = () => {
  const [modelBoxes, setModelBoxes] = React.useState([]);
  const [layers, setLayers] = React.useState([]);

  const addModelBox = () => {
    const newId = Date.now(); // Use timestamp for unique IDs
    setModelBoxes(prev => [...prev, newId]);
  };

  const deleteModelBox = (id) => {
    if (!id) return;
    setModelBoxes(prev => prev.filter(boxId => boxId !== id));
    setLayers(prev => prev.filter(layer => layer.id !== id));
  };

  const updateLayer = (id, layerType, parameters) => {
    setLayers(prev => {
      const filtered = prev.filter(layer => layer.id !== id);
      return [...filtered, { id, type: layerType, parameters }];
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Canvas at bottom of stack */}
      <div className="absolute inset-0">
        <Canvas layers={layers} />
      </div>

      {/* Controls on top */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-20 py-10">
        {/* Top div */}
        <div className="w-full h-20 bg-gray-300/90 backdrop-blur rounded-3xl border-2 border-gray-400 flex flex-row items-center justify-between">
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

        {/* Spacer div */}
        <div className="flex-1"></div>

        {/* Bottom div */}
        <div className="flex flex-row space-x-4 w-full h-64 bg-gray-300/90 backdrop-blur rounded-4xl border-2 border-gray-400 p-5 overflow-x-auto scrollbar-none">
          {modelBoxes.map((id, index) => (
            <ModelBox
              key={id}
              id={id}
              layerNumber={index + 1}
              onDelete={() => deleteModelBox(id)}
              updateLayer={updateLayer} // Add this prop
            />
          ))}
          <button
            onClick={addModelBox}
            className="aspect-square h-full bg-white rounded-3xl border-2 border-gray-300 hover:bg-gray-100 flex flex-col items-center justify-center space-y-4"
          >
            <h2 className="font-medium text-xl text-gray-500">Add Layer</h2>
            <AddIcon sx={{ fontSize: 40, color: "#9CA3AF" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
