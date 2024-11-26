import React, { useState, useEffect } from "react";
import CustomPicker from "./parameter_picker";
import LayerPicker from "./layer_picker";
import { layerConfigs, DEFAULT_LAYER } from "../config/layer_configs";
import ParameterSelector from "./parameter_selector";

export default function ModelBox({ layerNumber, id, onDelete, updateLayer }) {
  const [selectedLayer, setSelectedLayer] = useState(DEFAULT_LAYER);
  const [parameters, setParameters] = useState(() => {
    // Initialize parameters with defaults
    const newParameters = {};
    layerConfigs[DEFAULT_LAYER].parameters.forEach((param) => {
      newParameters[param.name] = param.default;
    });
    return newParameters;
  });

  // Only run once on mount to set initial layer
  useEffect(() => {
    updateLayer(id, selectedLayer, parameters);
  }, []); // Empty dependency array

  const handleLayerChange = (layer) => {
    // Initialize new parameters for the layer type
    const newParameters = {};
    layerConfigs[layer].parameters.forEach((param) => {
      newParameters[param.name] = param.default;
    });
    
    setParameters(newParameters);
    setSelectedLayer(layer);
    updateLayer(id, layer, newParameters);
  };

  const handleParameterChange = (paramName, value) => {
    const newParameters = {
      ...parameters,
      [paramName]: value,
    };
    setParameters(newParameters);
    updateLayer(id, selectedLayer, newParameters);
  };

  return (
    <div className="w-60 h-full bg-black flex flex-col rounded-3xl border-2 border-gray-300 overflow-hidden flex-shrink-0">
      <div className="space-y-4 px-4 py-4">
        <LayerPicker
          label={`Layer ${layerNumber}`}
          options={Object.keys(layerConfigs)}
          onSelect={handleLayerChange}
          value={selectedLayer}
          onDelete={onDelete}
        />
      </div>
      <div className="overflow-y-auto flex-col h-full space-y-4 px-4 py-4 bg-white">
        {layerConfigs[selectedLayer].parameters.map((param) =>
          param.type === "number" ? (
            <CustomPicker
              key={param.name}
              text={param.label}
              value={parameters[param.name]}
              onNumberChange={(value) =>
                handleParameterChange(param.name, value)
              }
            />
          ) : (
            <ParameterSelector
              key={param.name}
              label={param.label}
              options={param.options}
              value={parameters[param.name]}
              onSelect={(value) => handleParameterChange(param.name, value)}
            />
          )
        )}
      </div>
    </div>
  );
}
