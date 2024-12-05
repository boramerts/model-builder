import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ModelBox from './model_box';

export default function SortableModelBox(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: props.id,
    modifiers: [{
      name: 'preventOverlap',
      options: {
        preventDefault: true
      }
    }],
    handle: true // Add this to enable handle-only dragging
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Pass drag handle props separately
  return (
    <div ref={setNodeRef} style={style}>
      <ModelBox {...props} dragHandleProps={{...attributes, ...listeners}} />
    </div>
  );
}