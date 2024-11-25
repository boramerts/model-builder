import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { layerShapes } from '../config/shapes';

export default function Canvas({ layers }) {
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
    return layers.slice(0, -1).map((layer, index) => {
      const start = calculatePosition(index);
      const end = calculatePosition(index + 1);
      const startShape = layerShapes[layer.type];
      const startX = start.x + startShape.width;
      const startY = start.y + (startShape.height / 2);
      const endX = end.x;
      const endY = end.y + (layerShapes[layers[index + 1].type].height / 2);

      return (
        <path
          key={`connection-${index}`}
          d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
          stroke="#94A3B8"
          strokeWidth="2"
          fill="none"
        />
      );
    });
  };

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
          {renderConnections()}
          {layers.map((layer, index) => {
            const { x, y } = calculatePosition(index);
            const shapeConfig = layerShapes[layer.type];
            return (
              <g
                key={layer.id}
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