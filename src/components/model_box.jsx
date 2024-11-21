import React from "react";
import CustomPicker from "./parameter_picker";
import LayerPicker from "./layer_picker";

export default function ModelBox() {
    const handleNumberChange = (value) => {
        console.log("Selected number:", value);
    };

    const handleLayerChange = (selectedLayer) => {
        console.log("Selected layer:", selectedLayer);
    };

    const layers = ["CNN", "Neural Network", "LSTM"]; // Example layers

    return (
        <div className="aspect-square h-full bg-white flex flex-col rounded-2xl border-2 border-gray-300 space-y-4 px-4 py-4">
            <LayerPicker
                label="Layer 1"
                options={layers}
                onSelect={handleLayerChange}
            />
            <CustomPicker text="Filters" onNumberChange={handleNumberChange} />
            <CustomPicker text="Kernel Size" onNumberChange={handleNumberChange} />
            <CustomPicker text="Stride" onNumberChange={handleNumberChange} />
        </div>
    );
}