// src/config/shapes.js
import { stylePresets } from "./style_presets";

export const layerShapes = {
  CNN: {
    width: 120, // This will be overridden by dynamic calculation
    height: 80, // This will be overridden by dynamic calculation
    shape: (x, y, params = {}, isSelected = false, style = "default", isDarkMode = false, isExport = false) => {
      const styleConfig = stylePresets[style]?.CNN || stylePresets.default.CNN;
      
      // Convert string parameters to numbers
      const filters = parseInt(params.filters) || 32;
      const kernelSize = parseInt(params.kernelSize) || 3;
      const stride = parseInt(params.stride) || 1;

      // Dynamic dimensions based on filters
      const baseWidth = 50;
      const baseHeight = 50;
      const stackOffset = 8;
      
      // Calculate number of visible stacks (max 5 stacks)
      const numStacks = Math.min(Math.max(Math.ceil(filters / 5), 2), 5);
      
      // Calculate dynamic width and height including stacks
      const totalWidth = baseWidth + (numStacks * stackOffset);
      const totalHeight = baseHeight + (numStacks * stackOffset);

      // Determine text color
      const textColor = isExport ? 'black' : (isDarkMode ? 'white' : 'black');

      // Return simple rectangle for minimal style
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${isDarkMode ? '#1F2937' : styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : (isDarkMode ? 'white' : styleConfig.stroke)}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle" 
              fill="${textColor}" 
              font-size="14"
            >
              CNN
            </text>
          </g>
        `;
      }

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
          width="${baseWidth}" 
          height="${baseHeight}"
          rx="${styleConfig.cornerRadius}"
          fill="${styleConfig.fill}"
          opacity=${getOpacity(i)}
          stroke="${isSelected ? "white" : styleConfig.stroke}"
          stroke-width="${isSelected ? 3 : 1}"
        />`
      ).join("");

      return `
        <g transform="translate(${x},${y})">
          ${rectangles}
          <text 
            x="${baseWidth / 2 + stackOffset * (numStacks - 1)}" 
            y="${baseHeight / 2 + stackOffset * (numStacks - 1)}" 
            text-anchor="middle" 
            fill="${textColor}" 
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
    shape: (x, y, params = {}, isSelected = false, style = "default", isDarkMode = false, isExport = false) => {
      const styleConfig =
        stylePresets[style]?.Dense || stylePresets.default.Dense;
      const units = parseInt(params.units) || 1;

      // Determine text color - always black for export, otherwise based on theme
      const textColor = isExport ? 'black' : (isDarkMode ? 'white' : 'black');

      // Return simple rectangle for minimal style
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${isDarkMode ? '#1F2937' : styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : (isDarkMode ? 'white' : styleConfig.stroke)}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle" 
              fill="${textColor}" 
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
              fill="${textColor}" 
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
    shape: (x, y, params = {}, isSelected = false, style = "default", isDarkMode = false, isExport = false) => {
      const styleConfig = stylePresets[style]?.LSTM || stylePresets.default.LSTM;
      
      // Determine text color - always black for export, otherwise based on theme
      const textColor = isExport ? 'black' : (isDarkMode ? 'white' : 'black');

      // For minimal style use standard dimensions
      if (style === "minimal") {
        return `
          <g transform="translate(${x},${y})">
            <rect 
              width="100" 
              height="60" 
              rx="${styleConfig.cornerRadius}"
              fill="${isDarkMode ? '#1F2937' : styleConfig.fill}"
              opacity="${styleConfig.opacity}"
              stroke="${isSelected ? "white" : (isDarkMode ? 'white' : styleConfig.stroke)}"
              stroke-width="${isSelected ? 3 : 1}"
            />
            <text 
              x="50" 
              y="35" 
              text-anchor="middle"
              fill="${textColor}" 
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
            fill="${isDarkMode ? '#1F2937' : styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? "white" : (isDarkMode ? '#4B5563' : styleConfig.stroke)}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="65" 
            y="35" 
            text-anchor="middle"
            fill="${textColor}" 
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
    shape: (x, y, params = {}, isSelected = false, style = "default", isDarkMode = false, isExport = false) => {
      const styleConfig =
        stylePresets[style]?.MaxPooling || stylePresets.default.MaxPooling;

      // Determine text color - always black for export, otherwise based on theme
      const textColor = isExport ? 'black' : (isDarkMode ? 'white' : 'black');

      return `
        <g transform="translate(${x},${y})">
          <rect 
            width="110" 
            height="60" 
            rx="${styleConfig.cornerRadius}"
            fill="${isDarkMode ? '#1F2937' : styleConfig.fill}"
            opacity="${styleConfig.opacity}"
            stroke="${isSelected ? "white" : (isDarkMode ? 'white' : styleConfig.stroke)}"
            stroke-width="${isSelected ? 3 : 1}"
          />
          <text 
            x="55" 
            y="35" 
            text-anchor="middle"
            fill="${textColor}" 
            font-size="14"
          >
            MaxPool
          </text>
        </g>
      `;
    },
  },
};
