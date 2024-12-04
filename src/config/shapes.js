// src/config/shapes.js
import { stylePresets } from "./style_presets";

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

      // Return simple rectangle for minimal style
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : styleConfig.stroke}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle" 
              fill="${isSelected ? "white" : "black"}" 
              font-size="14"
            >
              CNN
            </text>
          </g>
        `;
      }

      const stackOffset = 8;
      const numStacks = Math.max(filters, 1); // Limit visual stacks to 5

      // Only calculate dynamic opacity for default style
      const getOpacity = (index) => {
        if (style === "default") {
          return 0.1 + (index / numStacks) * 0.5;
        }
        return styleConfig.opacity;
      };

      const rectangles = Array.from(
        { length: numStacks },
        (_, i) => `
        <rect 
          x="${i * stackOffset}" 
          y="${i * stackOffset}" 
          width="${width}" 
          height="${height}"
          rx="${styleConfig.cornerRadius}"
          fill="${styleConfig.fill}"
          opacity= ${getOpacity(i)}
          stroke="${isSelected ? "white" : styleConfig.stroke}"
          stroke-width="${isSelected ? 3 : 1}"
        />`
      ).join("");

      return `
        <g transform="translate(${x},${y})">
          ${rectangles}
          <text 
            x="${width / 2 + stackOffset * numStacks}" 
            y="${height / 2 + stackOffset * numStacks}" 
            text-anchor="middle" 
            fill="${isSelected ? "white" : "black"}" 
            font-size="14"
          >
            CNN ${filters}x${kernelSize}x${kernelSize}
          </text>
        </g>
      `;
    },
  },
  Dense: {
    width: 100,
    height: 60,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig =
        stylePresets[style]?.Dense || stylePresets.default.Dense;
      const units = parseInt(params.units) || 1;

      // Return simple rectangle for minimal style
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : styleConfig.stroke}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle" 
              fill="${isSelected ? "white" : "black"}" 
              font-size="14"
            >
              Dense
            </text>
          </g>
        `;
      }

      // Return circles for default style
      const circleGap = 20; // Gap between circles
      const dotGap = 10; // Gap between dots
      const maxCircles = 10;
      const dotSize = 2;
      const circleSize = 6;

      // Calculate vertical positions
      const topStart = 12; // Start y position for top circles
      const middleStart = 3 * circleGap + 3 * circleSize - dotGap; // Start y position for dots
      const bottomStart = middleStart + 3 * dotGap + 3 * dotSize; // Start y position for bottom circles

      const generateCircles = (count, yOffset) => {
        return Array.from(
          { length: count },
          (_, i) => `
          <circle
            cx="50"
            cy="${yOffset + i * circleGap}"
            r="${circleSize}"
            fill="${styleConfig.fill}"
            stroke="${isSelected ? "white" : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />`
        ).join("");
      };

      const generateDots = (yOffset) => {
        return Array.from(
          { length: 3 },
          (_, i) => `
          <circle
            cx="50"
            cy="${yOffset + i * dotGap}"
            r="${dotSize}"
            fill="${styleConfig.fill}"
            stroke="none"
          />`
        ).join("");
      };

      const circles =
        units > maxCircles
          ? `${generateCircles(3, topStart)}
          
          ${generateDots(middleStart)}
          
          ${generateCircles(3, bottomStart)}`
          : generateCircles(Math.min(units, maxCircles), topStart);

      return `
          <g transform="translate(${x},${y})">
            ${circles}
            <text 
              x="50" 
              y="${
                units > 10
                  ? bottomStart + 3 * circleGap + 3 * circleSize // Last circle position + size
                  : topStart + units * circleGap + circleSize + 5 // All circles height + padding
              }"
              text-anchor="middle" 
              fill="${isSelected ? "white" : "black"}" 
              font-size="14"
            >
              Dense
            </text>
          </g>
        `;
    },
  },
  LSTM: {
    width: 130,
    height: 70,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig = stylePresets[style]?.LSTM || stylePresets.default.LSTM;
      
      // For minimal style use standard dimensions
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : styleConfig.stroke}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle"
              fill="${isSelected ? "white" : "black"}" 
              font-size="14"
            >
              LSTM
            </text>
          </g>
        `;
      }

      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="130" 
            height="70" 
            rx="${styleConfig.cornerRadius}"
            fill="${styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? "white" : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="65" 
            y="35" 
            text-anchor="middle"
            fill="${isSelected ? "white" : "black"}" 
            font-size="14"
          >
            LSTM
          </text>
        </g>
      `;
    },
  },
  MaxPooling: {
    width: 110,
    height: 60,
    shape: (x, y, params = {}, isSelected = false, style = "default") => {
      const styleConfig =
        stylePresets[style]?.MaxPooling || stylePresets.default.MaxPooling;

      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="110" 
            height="60" 
            rx="${styleConfig.cornerRadius}"
            fill="${styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? "white" : styleConfig.stroke}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="55" 
            y="35" 
            text-anchor="middle"
            fill="${isSelected ? "white" : "black"}" 
            font-size="14"
          >
            MaxPool
          </text>
        </g>
      `;
    },
  },
};
