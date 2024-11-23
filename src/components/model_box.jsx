import React, { useState, useEffect } from "react";
import CustomPicker from "./parameter_picker";
import LayerPicker from "./layer_picker";
import { layerConfigs, DEFAULT_LAYER } from "../config/layer_configs";
import ParameterSelector from "./parameter_selector";

export default function ModelBox({ layerNumber }) {
    const [selectedLayer, setSelectedLayer] = useState(DEFAULT_LAYER);
    const [parameters, setParameters] = useState({});

    useEffect(() => {
        // Initialize parameters with defaults when layer changes
        const newParameters = {};
        layerConfigs[selectedLayer].parameters.forEach(param => {
            newParameters[param.name] = param.default;
        });
        setParameters(newParameters);
    }, [selectedLayer]);

    const handleLayerChange = (layer) => {
        setSelectedLayer(layer);
    };

    const handleParameterChange = (paramName, value) => {
        setParameters(prev => ({
            ...prev,
            [paramName]: value
        }));
    };

    return (
        <div className="w-60 h-full bg-white flex flex-col rounded-2xl border-2 border-gray-300 space-y-4 px-4 py-4">
            <LayerPicker
                label={`Layer ${layerNumber}`}
                options={Object.keys(layerConfigs)}
                onSelect={handleLayerChange}
                value={selectedLayer}
            />
            {layerConfigs[selectedLayer].parameters.map((param) => (
                param.type === "number" ? (
                    <CustomPicker
                        key={param.name}
                        text={param.label}
                        value={parameters[param.name]}
                        onNumberChange={(value) => handleParameterChange(param.name, value)}
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
            ))}
        </div>
    );
}