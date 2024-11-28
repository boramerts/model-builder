// src/config/style_presets.js
export const stylePresets = {
    default: {
      CNN: {
        fill: "#8B5CF6",
        cornerRadius: 8,
        opacity: "${0.1 + (i/numStacks) * 0.5}",
        stroke: "black"
      },
      Dense: {
        fill: "#10B981",
        cornerRadius: 8,
        opacity: 0.9,
        stroke: "black"
      },
      LSTM: {
        fill: "#8B5CF6", 
        cornerRadius: 10,
        opacity: 0.9,
        stroke: "black"
      },
      MaxPooling: {
        fill: "#F59E0B",
        cornerRadius: 8,
        opacity: 0.9,
        stroke: "black"
      }
    },
    minimal: {
      CNN: {
        fill: "#ffffff",
        cornerRadius: 0,
        opacity: 1,
        stroke: "black"
      },
      Dense: {
        fill: "#ffffff",
        cornerRadius: 0,
        opacity: 1,
        stroke: "black" 
      },
      LSTM: {
        fill: "#ffffff",
        cornerRadius: 0,
        opacity: 1,
        stroke: "black"
      },
      MaxPooling: {
        fill: "#ffffff", 
        cornerRadius: 0,
        opacity: 1,
        stroke: "black"
      }
    },
    rounded: {
      CNN: {
        fill: "#4F46E5",
        cornerRadius: 16,
        opacity: 0.9,
        stroke: "none"
      },
      Dense: {
        fill: "#059669",
        cornerRadius: 16,
        opacity: 0.9,
        stroke: "none"
      },
      LSTM: {
        fill: "#7C3AED",
        cornerRadius: 16,
        opacity: 0.9,
        stroke: "none" 
      },
      MaxPooling: {
        fill: "#D97706",
        cornerRadius: 16,
        opacity: 0.9,
        stroke: "none"
      }
    }
  };