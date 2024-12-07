import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "./components/dropdown";
import ModelBox from "./components/model_box.jsx";
import Canvas from "./components/Canvas";
import "./output.css";
import { stylePresets } from './config/style_presets'; // Add this
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableModelBox from './components/SortableModelBox';
import { DEFAULT_LAYER } from './config/layer_configs';
import ExportDialog from './components/ExportDialog';
import NewDialog from "./components/NewDialog.jsx";

import FileIcon from "@mui/icons-material/NoteAddOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/UploadFileOutlined";

const App = () => {
  const [modelBoxes, setModelBoxes] = React.useState([]);
  const [layers, setLayers] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState("default");
  const [canvasPosition, setCanvasPosition] = React.useState({ 
    scale: 1,
    translation: { x: 200, y: 50 }
  });
  const [showExportDialog, setShowExportDialog] = React.useState(false);
  const [showNewDialog, setShowNewDialog] = React.useState(false);

  const addModelBox = () => {
    const newId = Date.now();
    setModelBoxes(prev => [...prev, newId]);
    // Initialize the layer immediately with default values
    setLayers(prev => [...prev, { 
      id: newId, 
      type: DEFAULT_LAYER, 
      parameters: {} 
    }]);
  };

  const deleteModelBox = (id) => {
    if (!id) return;
    setModelBoxes(prev => prev.filter(boxId => boxId !== id));
    setLayers(prev => prev.filter(layer => layer.id !== id));
  };

  const updateLayer = (id, layerType, parameters) => {
    setLayers(prev => {
      // Find the layer index
      const index = prev.findIndex(layer => layer.id === id);
      if (index === -1) return prev;

      // Create new array with updated layer at same position
      const newLayers = [...prev];
      newLayers[index] = { ...newLayers[index], type: layerType, parameters };
      return newLayers;
    });
  };

  // Add style handler
  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;
    
    if (active.id !== over.id) {  
      setModelBoxes((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        // Update layers to match new model box order
        setLayers(prev => {
          const layerMap = new Map(prev.map(layer => [layer.id, layer]));
          return newOrder.map(id => layerMap.get(id)).filter(Boolean);
        });
        
        return newOrder;
      });
    }
  };

  const handleRecenter = () => {
    setCanvasPosition({
      scale: 1,
      translation: { x: 200, y: 50 }
    });
  };

  const handleExport = async (format) => {
    const svgElement = document.querySelector('svg');
    if (!svgElement) return;

    // Get SVG content bounds
    const bbox = svgElement.getBBox();
    const padding = 50;
    const scaleFactor = 3; // Increase resolution by 3x

    // Create copy with proper dimensions
    const svgCopy = svgElement.cloneNode(true);
    const width = bbox.width + padding * 2;
    const height = bbox.height + padding * 2;
    
    svgCopy.setAttribute('width', width);
    svgCopy.setAttribute('height', height);
    svgCopy.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`);
    
    if (format === 'svg') {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgCopy);
      const blob = new Blob([svgString], {type: 'image/svg+xml'});
      downloadFile(blob, 'model_diagram.svg');
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const svgString = new XMLSerializer().serializeToString(svgCopy);
      const img = new Image();
      
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      ctx.scale(scaleFactor, scaleFactor);
      
      const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          downloadFile(blob, `model_diagram.${format}`);
        }, `image/${format}`);
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
    
    setShowExportDialog(false);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportClick = () => {
    setShowExportDialog(true);
  };

  const handleSave = () => {
    const modelData = {
      layers,
      style: selectedStyle
    };
    
    const blob = new Blob([JSON.stringify(modelData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'model_config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const modelData = JSON.parse(e.target.result);
        if (modelData.layers && modelData.style) {
          setLayers(modelData.layers);
          setModelBoxes(modelData.layers.map(layer => layer.id));
          setSelectedStyle(modelData.style);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Invalid model configuration file');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  const handleNewClick = () => {
    setShowNewDialog(true);
  };

  const handleNew = () => {
    setModelBoxes([]);
    setLayers([]);
    setShowNewDialog(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Canvas container with pointer events enabled */}
      <div 
        className="w-full h-full absolute inset-0" 
        style={{ 
          touchAction: 'none',
          cursor: 'grab',
          overflow: 'hidden' // Prevent scrolling
        }}
      >
        <Canvas 
          layers={layers} 
          selectedStyle={selectedStyle}
          position={canvasPosition}
          onPositionChange={setCanvasPosition}
        />
      </div>
      
      {/* Controls with pointer events only on buttons/interactive elements */}
      <div className="relative z-10 pointer-events-none"> {/* Make container transparent to events */}
        <div className="flex flex-col justify-between min-h-screen px-20 py-10">
          {/* Top controls - enable pointer events */}
                <div className="pointer-events-auto flex flex-col space-y-4">
                <div className="w-full h-20 bg-gray-300/90 backdrop-blur rounded-3xl border-2 border-gray-400 flex flex-row items-center justify-between">
                  <div className="w-1/2 h-20 flex flex-row items-center justify-start p-5">
                  <p className="text-black text-center text-2xl font-bold">
                    Model Builder
                  </p>
                  <p className="text-black text-center font-normal p-5 ps-10">Style:</p>
                  <Dropdown 
                    options={Object.keys(stylePresets)}
                    value={selectedStyle}
                    onChange={handleStyleChange}
                  />
                  </div>

                  <div className="w-1/2 h-20 flex flex-row items-center justify-end p-5 space-x-3">
                    <button className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row"
                      onClick={handleNewClick}  
                    >
                      <FileIcon></FileIcon>
                      <p>New</p>
                    </button>
                    <input
                      type="file"
                      id="load-file"
                      accept=".json"
                      className="hidden"
                      onChange={handleLoad}
                    />
                    <button 
                      onClick={() => document.getElementById('load-file').click()}
                      className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row"
                    >
                      <FileUploadIcon />
                      <p>Load</p>
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row"
                    >
                      <SaveIcon></SaveIcon>
                      <p>Save</p>
                    </button>
                    <button 
                      className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-500 space-x-2 flex flex-row"
                      onClick={handleExportClick}
                    >
                      <ExportIcon></ExportIcon>
                      <p>Export</p>
                    </button>
                  </div>
                </div>
                <button 
                  className="w-20 h-10 bg-gray-200 rounded-xl border-2 border-gray-400 flex items-center justify-center hover:bg-gray-300"
                  onClick={handleRecenter}
                >
                  Recenter
                </button>
                </div>
                
                {/* Bottom controls - enable pointer events */}
          <div className="pointer-events-auto">
            <div className="w-full h-64 bg-gray-300/90 backdrop-blur rounded-4xl border-2 border-gray-400 p-5 flex flex-row justify-between space-x-4">
              {/* Scrollable container for model boxes */}
              <div className="flex-1 overflow-x-auto scrollbar-none">
                <div className="flex flex-row space-x-4 min-w-fit">
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={modelBoxes} strategy={horizontalListSortingStrategy}>
                      {modelBoxes.map((id, index) => (
                        <SortableModelBox
                          key={id}
                          id={id}
                          layerNumber={index + 1}
                          onDelete={() => deleteModelBox(id)}
                          updateLayer={updateLayer}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
              
              {/* Add Layer button - always visible */}
              <div className="flex-shrink-0">
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
        </div>
      </div>
      {showNewDialog && (
        <NewDialog
          onClose={() => setShowNewDialog(false)}
          onNew={handleNew}
        />
      )}
      {showExportDialog && (
        <ExportDialog
          onClose={() => setShowExportDialog(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
