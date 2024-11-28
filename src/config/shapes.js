// src/config/shapes.js
import { stylePresets } from './style_presets';

export const layerShapes = {
  CNN: {
    width: 120,
    height: 80,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig = stylePresets[style]?.CNN || stylePresets.default.CNN;
      // Convert string parameters to numbers
      const width = parseInt(params.width) || 50;
      const height = parseInt(params.height) || 50;
      const filters = parseInt(params.filters) || 32;
      const kernelSize = parseInt(params.kernelSize) || 3;
      const stride = parseInt(params.stride) || 1;
      
      const stackOffset = 8;
      const numStacks = Math.max(filters, 1); // Limit visual stacks to 5
      
      const rectangles = Array.from({length: numStacks}, (_, i) => `
        <rect 
          x="${i * stackOffset}" 
          y="${i * stackOffset}" 
          width="${width}" 
          height="${height}"
          rx="${kernelSize * 2}"
          fill="${styleConfig.fill}"
          opacity="${styleConfig.opacity}"
          stroke="${isSelected ? 'white' : styleConfig.stroke}"
          stroke-width="${isSelected ? 3 : 1}"
        />`
      ).join('');

      return `
        <g transform="translate(${x},${y})">
          ${rectangles}
          <text 
            x="${width/2 + (stackOffset * numStacks)}" 
            y="${height/2 + (stackOffset * numStacks)}" 
            text-anchor="middle" 
            fill="${isSelected ? 'white' : 'black'}" 
            font-size="14"
          >
            CNN ${filters}x${kernelSize}x${kernelSize}
          </text>
        </g>
      `;
    }
  },
  Dense: {
    width: 100,
    height: 60,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig = stylePresets[style]?.Dense || stylePresets.default.Dense;
      
      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="100" 
            height="60" 
            rx="${styleConfig.cornerRadius}"
            fill="${styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? 'white' : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="50" 
            y="35" 
            text-anchor="middle" 
            fill="${isSelected ? 'white' : 'black'}" 
            font-size="14"
          >
            Dense
          </text>
        </g>
      `;
    }
  },
  LSTM: {
    width: 130,
    height: 70,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig = stylePresets[style]?.LSTM || stylePresets.default.LSTM;
      
      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="130" 
            height="70" 
            rx="${styleConfig.cornerRadius}"
            fill="${styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? 'white' : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="65" 
            y="40" 
            text-anchor="middle"
            fill="${isSelected ? 'white' : 'black'}" 
            font-size="14"
          >
            LSTM
          </text>
        </g>
      `;
    }
  },
  MaxPooling: {
    width: 110,
    height: 60,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig = stylePresets[style]?.MaxPooling || stylePresets.default.MaxPooling;
      
      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="110" 
            height="60" 
            rx="${styleConfig.cornerRadius}"
            fill="${styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? 'white' : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="55" 
            y="35" 
            text-anchor="middle"
            fill="${isSelected ? 'white' : 'black'}" 
            font-size="14"
          >
            MaxPool
          </text>
        </g>
      `;
    }
  },
};
