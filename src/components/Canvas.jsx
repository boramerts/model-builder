import React, { useEffect, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { layerShapes } from '../config/shapes';

export default function Canvas({ layers }) {
  // Sort and memoize layers to prevent unnecessary re-renders
  const sortedLayers = useMemo(() => 
    [...layers].sort((a, b) => a.id - b.id),
    [layers]
  );

  const calculatePosition = (index) => {
    const startX = 100;
    const startY = 400;
    const spacing = 150;
    return {
      x: startX + (index * spacing),
      y: startY
    };
  };

  const renderConnections = () => {
    if (!sortedLayers.length) return null;
    
    return sortedLayers.slice(0, -1).map((layer, index) => {
      const nextLayer = sortedLayers[index + 1];
      if (!nextLayer) return null;

      const start = calculatePosition(index);
      const end = calculatePosition(index + 1);
      const startShape = layerShapes[layer.type];
      const endShape = layerShapes[nextLayer.type];
      
      // Ensure all required values exist
      if (!startShape || !endShape) return null;

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

  // Add debug logging
  useEffect(() => {
    // console.log('Canvas layers updated:', layers);
  }, [layers]);

  return (
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
        <svg 
          className="w-full h-full bg-white"
          viewBox="0 0 1000 1000"
        >
          {sortedLayers.length > 0 && renderConnections()}
          {sortedLayers.map((layer, index) => {
            const { x, y } = calculatePosition(index);
            const shapeConfig = layerShapes[layer.type];
            if (!shapeConfig) return null;
            
            return (
              <g
                key={`layer-${layer.id}`}
                dangerouslySetInnerHTML={{
                  __html: shapeConfig.shape(x, y)
                }}
              />
            );
          })}
        </svg>
      </TransformComponent>
    </TransformWrapper>
  );
}