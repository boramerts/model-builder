import React, { useEffect, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // For zoom/pan functionality
import { layerShapes } from '../config/shapes';

export default function Canvas({ layers, selectedStyle }) {
  // Memoize sorted layers to prevent unnecessary recalculations
  // Sort by ID to maintain consistent layer order
  const sortedLayers = useMemo(() => 
    [...layers].sort((a, b) => a.id - b.id),
    [layers]
  );

  // Helper function to calculate x,y coordinates for each layer
  // Creates a horizontal layout with fixed spacing between layers
  const calculatePosition = (index) => {
    const startX = 100;  // Initial X offset from left
    const startY = 400;  // Fixed Y position for all layers
    const spacing = 150; // Horizontal spacing between layers
    return {
      x: startX + (index * spacing),
      y: startY
    };
  };

  // Renders connections between adjacent layers
  const renderConnections = () => {
    if (!sortedLayers.length) return null;
    
    // Map through layers except the last one to create connections
    return sortedLayers.slice(0, -1).map((layer, index) => {
      const nextLayer = sortedLayers[index + 1];
      if (!nextLayer) return null;

      // Calculate positions for current and next layer
      const start = calculatePosition(index);
      const end = calculatePosition(index + 1);
      const startShape = layerShapes[layer.type];
      const endShape = layerShapes[nextLayer.type];
      
      if (!startShape || !endShape) return null;

      // Special case: Dense-to-Dense connections
      // Creates a neural network style connection pattern between nodes
      if (layer.type === 'Dense' && nextLayer.type === 'Dense') {
        const startUnits = Math.min(parseInt(layer.parameters.units) || 1, 10); // Limit to 10 units
        const endUnits = Math.min(parseInt(nextLayer.parameters.units) || 1, 10);
        const circleGap = 20;  // Vertical spacing between nodes
        const startY = start.y + 15; // Offset from layer top
        const endY = end.y + 15;

        // Create connections between each node in both layers
        return Array.from({ length: startUnits }).map((_, i) =>
          Array.from({ length: endUnits }).map((_, j) => {
            // Calculate start and end points for each connection
            const x1 = start.x + 50;  // Align with circle centers
            const y1 = startY + (i * circleGap);
            const x2 = end.x + 50;
            const y2 = endY + (j * circleGap);

            // Create bezier curve path between nodes
            return (
              <path
                key={`connection-${layer.id}-${nextLayer.id}-${i}-${j}`}
                d={`M ${x1} ${y1} C ${x1 + 20} ${y1}, ${x2 - 20} ${y2}, ${x2} ${y2}`}
                stroke="#94A3B8"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
            );
          })
        ).flat();
      }

      // Default connection for non-Dense layer pairs
      // Single curved line between layer centers
      const startX = start.x + startShape.width;
      const startY = start.y + (startShape.height / 2);
      const endX = end.x;
      const endY = end.y + (endShape.height / 2);

      return (
        <path
          key={`connection-${layer.id}-${nextLayer.id}`}
          d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
          stroke="#94A3B8"
          strokeWidth="2"
          fill="none"
        />
      );
    });
  };

  return (
    // Wrap canvas in zoom/pan container
    <TransformWrapper
      initialScale={1}
      minScale={0.5}
      maxScale={2}
      className="w-full h-full"
    >
      <TransformComponent
        wrapperClass="w-full h-full"
        contentClass="w-full h-full"
      >
        {/* Main SVG canvas */}
        <svg 
          className="w-full h-full bg-white"
          viewBox="0 0 1000 1000"
        >
          {/* Render layer connections first (background) */}
          {sortedLayers.length > 0 && renderConnections()}
          
          {/* Render layer shapes on top */}
          {sortedLayers.map((layer, index) => {
            const { x, y } = calculatePosition(index);
            const shapeConfig = layerShapes[layer.type];
            if (!shapeConfig) return null;
            
            return (
              <g
                key={`layer-${layer.id}`}
                dangerouslySetInnerHTML={{
                  __html: shapeConfig.shape(x, y, layer.parameters, false, selectedStyle)
                }}
              />
            );
          })}
        </svg>
      </TransformComponent>
    </TransformWrapper>
  );
}