import React, { useMemo } from "react";
import { MapInteraction } from 'react-map-interaction';
import { layerShapes } from "../config/shapes";

export default function Canvas({ layers, selectedStyle, position, onPositionChange, isDarkMode }) {
  const sortedLayers = useMemo(() => layers, [layers]);

  // Helper functions first
  const getDenseHeight = (units) => {
    const circleGap = 20;
    if (units > 10) {
      return 6 * circleGap + 3 * 10 + 40;
    }
    return units * circleGap + 40;
  };

  const getLayerHeight = (layer) => {
    if (selectedStyle === "minimal") {
      return 60;
    }
    if (layer.type === "Dense") {
      return getDenseHeight(parseInt(layer.parameters.units) || 1);
    }
    return layerShapes[layer.type]?.height || 0;
  };

  // Now we can use getLayerHeight in dimensions calculation
  const dimensions = useMemo(() => {
    if (!sortedLayers.length) return { width: 1000, height: 700 };

    const padding = 200;
    const spacing = 150;
    
    const width = Math.max(
      1000,
      padding * 2 + (sortedLayers.length - 1) * spacing + 200
    );

    const maxHeight = sortedLayers.reduce((max, layer) => {
      const height = getLayerHeight(layer);
      return Math.max(max, height);
    }, 0);

    const height = Math.max(700, maxHeight + padding * 2);

    return { width, height };
  }, [sortedLayers, selectedStyle]); // Add selectedStyle to dependencies

  // Helper function to calculate x,y coordinates for each layer
  const calculatePosition = (index) => {
    const startX = 100; // Initial X offset from left
    const centerY = dimensions.height / 2; // Vertical center position
    const spacing = 150; // Horizontal spacing between layers

    const layer = sortedLayers[index];
    const height = getLayerHeight(layer);

    return {
      x: startX + index * spacing,
      y: centerY - height / 2, // Center the layer vertically
    };
  };

  // Renders connections between adjacent layers
  const renderConnections = () => {
    if (!sortedLayers.length) return null;

    return sortedLayers.slice(0, -1).map((layer, index) => {
      const nextLayer = sortedLayers[index + 1];
      if (!nextLayer) return null;

      const start = calculatePosition(index);
      const end = calculatePosition(index + 1);
      const startShape = layerShapes[layer.type];
      const endShape = layerShapes[nextLayer.type];

      if (!startShape || !endShape) return null;

      // For minimal style or non-Dense layers, use simple connections
      if (
        selectedStyle === "minimal" ||
        !(layer.type === "Dense" && nextLayer.type === "Dense")
      ) {
        const startX =
          start.x + (selectedStyle === "minimal" ? 100 : startShape.width);
        const startY =
          start.y + (selectedStyle === "minimal" ? 30 : startShape.height / 2);
        const endX = end.x;
        const endY =
          end.y + (selectedStyle === "minimal" ? 30 : endShape.height / 2);

        return (
          <path
            key={`connection-${layer.id}-${nextLayer.id}`}
            d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${
              endX - 40
            } ${endY}, ${endX} ${endY}`}
            stroke="#94A3B8"
            strokeWidth="2"
            fill="none"
          />
        );
      }

      // Dense-to-Dense connections for non-minimal style
      let isFirstLong = layer.parameters.units > 10;
      let isSecondLong = nextLayer.parameters.units > 10;
      let startUnits = isFirstLong
        ? 6
        : Math.min(parseInt(layer.parameters.units) || 1, 10);
      let endUnits = isSecondLong
        ? 6
        : Math.min(parseInt(nextLayer.parameters.units) || 1, 10);
      const circleGap = 20; // Vertical spacing between nodes

      // Calculate vertical center offsets for both layers
      const startTotalHeight = isFirstLong
        ? 6 * circleGap
        : startUnits * circleGap;
      const endTotalHeight = isSecondLong
        ? 6 * circleGap
        : endUnits * circleGap;
      const startY = start.y + 20; // Add padding from top
      const endY = end.y + 20; // Add padding from top

      // Create connections between each node in both layers
      return Array.from({ length: startUnits })
        .map((_, i) =>
          Array.from({ length: endUnits }).map((_, j) => {
            let x1, y1, x2, y2;
            // Calculate start and end points for each connection
            if (!isFirstLong && !isSecondLong) {
              // Both layers are short
              x1 = start.x + 50; // Align with circle centers
              y1 = startY + i * circleGap - 6;
              x2 = end.x + 50;
              y2 = endY + j * circleGap - 6;
            } else if (isFirstLong && !isSecondLong) {
              // First layer is long
              if (i < 3) {
                x1 = start.x + 50;
                y1 = startY + i * circleGap - 6;
              } else {
                x1 = start.x + 50;
                y1 = startY + i * circleGap + 3 * 10 + 3 * 2 - 6;
              }
              x2 = end.x + 50;
              y2 = endY + j * circleGap - 6;
            } else if (!isFirstLong && isSecondLong) {
              // Second layer is long
              x1 = start.x + 50;
              y1 = startY + i * circleGap - 6; // First layer y depends on i
              if (j < 3) {
                x2 = end.x + 50;
                y2 = endY + j * circleGap - 6; // Second layer y depends on j
              } else {
                x2 = end.x + 50;
                y2 = endY + j * circleGap + 3 * 10 + 3 - 6; // Keep gap pattern consistent
              }
            } else {
              // Both layers are long
              if (i < 3) {
                x1 = start.x + 50;
                y1 = startY + i * circleGap - 6;
              } else {
                x1 = start.x + 50;
                y1 = startY + i * circleGap + 3 * 10 + 3 - 6;
              }
              if (j < 3) {
                x2 = end.x + 50;
                y2 = endY + j * circleGap - 6;
              } else {
                x2 = end.x + 50;
                y2 = endY + j * circleGap + 3 * 10 + 3 - 6;
              }
            }

            // Create bezier curve path between nodes
            return (
              <path
                key={`connection-${layer.id}-${nextLayer.id}-${i}-${j}`}
                d={`M ${x1} ${y1} C ${x1 + 20} ${y1}, ${
                  x2 - 20
                } ${y2}, ${x2} ${y2}`}
                stroke="#94A3B8"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
            );
          })
        )
        .flat();
    });
  };

  // Add function to handle shape rendering with correct theme
  const renderShape = (layer, x, y, isExport = false) => {
    const shapeConfig = layerShapes[layer.type];
    if (!shapeConfig) return null;

    // Always use light mode for exports
    const effectiveDarkMode = isExport ? false : isDarkMode;

    return shapeConfig.shape(
      x,
      y,
      layer.parameters,
      false,
      selectedStyle,
      effectiveDarkMode
    );
  };

  // Modify handleExport to use light mode
  const svgContent = (isExport = false) => (
    <svg 
      className="w-full h-full"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      style={{ pointerEvents: 'auto' }}
    >
      {sortedLayers.length > 0 && renderConnections()}
      {sortedLayers.map((layer, index) => {
        const { x, y } = calculatePosition(index);
        return (
          <g
            key={`layer-${layer.id}`}
            dangerouslySetInnerHTML={{
              __html: renderShape(layer, x, y, isExport),
            }}
          />
        );
      })}
    </svg>
  );

  return (
    <div 
      className="w-full h-full relative" 
      style={{ 
        touchAction: 'none', // Prevents default touch actions
        cursor: 'grab'      // Shows grab cursor to indicate draggable
      }}
    >
      <MapInteraction
        value={position}
        onChange={onPositionChange}
        minScale={0.5}
        maxScale={2}
        translationBounds={{
          xMin: -dimensions.width,
          xMax: dimensions.width,
          yMin: -dimensions.height,
          yMax: dimensions.height
        }}
      >
        {({ scale, translation }) => (
          <div
            style={{
              transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              width: '100%',
              height: '100%'
            }}
          >
            {svgContent(false)} {/* Regular rendering with current theme */}
          </div>
        )}
      </MapInteraction>
    </div>
  );
}
