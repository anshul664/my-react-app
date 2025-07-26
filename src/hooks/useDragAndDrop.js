import { useState, useCallback } from 'react';

export const useDragAndDrop = () => {
  const [dragData, setDragData] = useState(null);

  const onDragStart = useCallback((nodeType, nodeData) => {
    setDragData({ type: nodeType, data: nodeData });
  }, []);

  const onDragEnd = useCallback(() => {
    setDragData(null);
  }, []);

  const onDrop = useCallback((event, reactFlowInstance) => {
    if (!dragData) return;

    try {
      const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${dragData.type}-${Date.now()}`,
        type: dragData.type,
        position,
        data: dragData.data || { label: dragData.type },
      };

      return newNode;
    } catch (error) {
      console.error('Drop error:', error);
      return null;
    }
  }, [dragData]);

  return {
    dragData,
    onDragStart,
    onDragEnd,
    onDrop,
  };
}; 