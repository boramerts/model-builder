// shapes.js
export const layerShapes = {
  CNN: {
    width: 120,
    height: 80,
    shape: (x, y, params = {}, isSelected = false) => {
      // Convert string parameters to numbers
      const filters = parseInt(params.filters) || 32;
      const kernelSize = parseInt(params.kernelSize) || 3;
      const stride = parseInt(params.stride) || 1;
      
      const baseWidth = 120;
      const baseHeight = 80;
      const stackOffset = 8;
      const numStacks = Math.max(filters, 1); // Limit visual stacks to 5
      
      const rectangles = Array.from({length: numStacks}, (_, i) => `
        <rect 
          x="${i * stackOffset}" 
          y="${i * stackOffset}" 
          width="${baseWidth}" 
          height="${baseHeight}"
          rx="${kernelSize * 2}"
          fill="#4F46E5"
          opacity="${0.2 + (i * 0.15)}"
          stroke="${isSelected ? 'white' : 'black'}"
          stroke-width="${isSelected ? 3 : 1}"
        />`
      ).join('');

      return `
        <g transform="translate(${x},${y})">
          ${rectangles}
          <text 
            x="${baseWidth/2}" 
            y="${baseHeight/2}" 
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
    shape: (x, y, isSelected = false) => {
      if (isSelected) {
        return `
      <g transform="translate(${x},${y})">
        <rect width="100" height="60" rx="8" fill="#10B981" stroke="white" stroke-width="3"/>
        <text x="50" y="35" text-anchor="middle" fill="white" font-size="14">Dense</text>
      </g>
      `;
      }
      return `
      <g transform="translate(${x},${y})">
      <rect width="100" height="60" rx="8" fill="#10B981" opacity="0.9"/>
      <text x="50" y="35" text-anchor="middle" fill="black" font-size="14">Dense</text>
      </g>
    `;
    },
  },
  LSTM: {
    width: 130,
    height: 70,
    shape: (x, y, isSelected = false) => {
      if (isSelected) {
        return `
      <g transform="translate(${x},${y})">
        <rect width="130" height="70" rx="10" fill="#8B5CF6" stroke="white" stroke-width="3"/>
        <text x="65" y="40" text-anchor="middle" fill="white" font-size="14">LSTM</text>
      </g>
      `;
      }
      return `
      <g transform="translate(${x},${y})">
      <rect width="130" height="70" rx="10" fill="#8B5CF6" opacity="0.9"/>
      <text x="65" y="40" text-anchor="middle" fill="black" font-size="14">LSTM</text>
      </g>
    `;
    },
  },
  MaxPooling: {
    width: 110,
    height: 60,
    shape: (x, y, isSelected = false) => {
      if (isSelected) {
        return `
      <g transform="translate(${x},${y})">
        <rect width="110" height="60" rx="8" fill="#F59E0B" stroke="white" stroke-width="3"/>
        <text x="55" y="35" text-anchor="middle" fill="white" font-size="14">MaxPool</text>
      </g>
      `;
      }
      return `
      <g transform="translate(${x},${y})">
      <rect width="110" height="60" rx="8" fill="#F59E0B" opacity="0.9"/>
      <text x="55" y="35" text-anchor="middle" fill="black" font-size="14">MaxPool</text>
      </g>
    `;
    },
  },
};
