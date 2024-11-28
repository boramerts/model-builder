export const layerConfigs = {
  CNN: {
    parameters: [
      { name: "width", type: "number", label: "Width", default: "50" },
      { name: "height", type: "number", label: "Height", default: "50" },
      { name: "filters", type: "number", label: "Filters", default: "8" },
      { name: "kernelSize", type: "number", label: "Kernel Size", default: "3" },
      { name: "stride", type: "number", label: "Stride", default: "1" },
      { name: "padding", type: "select", label: "Padding", options: ["valid", "same"], default: "valid" }
    ]
  },
  "Dense": {
    parameters: [
      { name: "units", type: "number", label: "Units", default: "64" },
      { name: "activation", type: "select", label: "Activation", options: ["relu", "sigmoid", "tanh"], default: "relu" }
    ]
  },
  "LSTM": {
    parameters: [
      { name: "units", type: "number", label: "Units", default: "64" },
      { name: "returnSequences", type: "select", label: "Return Sequences", options: ["true", "false"], default: "false" },
      { name: "activation", type: "select", label: "Activation", options: ["tanh", "relu", "sigmoid"], default: "tanh" }
    ]
  },
  "MaxPooling": {
    parameters: [
      { name: "strides", type: "number", label: "Strides", default: "2"}
    ]
  }
};

// Add a default layer
export const DEFAULT_LAYER = "Dense"; 