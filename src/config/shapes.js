// shapes.js
export const layerShapes = {
    CNN: {
      width: 120,
      height: 80,
      shape: (x, y) => `
        <g transform="translate(${x},${y})">
          <rect width="120" height="80" rx="10" fill="#4F46E5" opacity="0.9"/>
          <text x="60" y="45" text-anchor="middle" fill="black" font-size="14">CNN</text>
        </g>
      `
    },
    Dense: {
      width: 100,
      height: 60,
      shape: (x, y) => `
        <g transform="translate(${x},${y})">
          <rect width="100" height="60" rx="8" fill="#10B981" opacity="0.9"/>
          <text x="50" y="35" text-anchor="middle" fill="black" font-size="14">Dense</text>
        </g>
      `
    },
    LSTM: {
      width: 130,
      height: 70,
      shape: (x, y) => `
        <g transform="translate(${x},${y})">
          <rect width="130" height="70" rx="10" fill="#8B5CF6" opacity="0.9"/>
          <text x="65" y="40" text-anchor="middle" fill="black" font-size="14">LSTM</text>
        </g>
      `
    },
    MaxPooling: {
      width: 110,
      height: 60,
      shape: (x, y) => `
        <g transform="translate(${x},${y})">
          <rect width="110" height="60" rx="8" fill="#F59E0B" opacity="0.9"/>
          <text x="55" y="35" text-anchor="middle" fill="black" font-size="14">MaxPool</text>
        </g>
      `
    }
  };