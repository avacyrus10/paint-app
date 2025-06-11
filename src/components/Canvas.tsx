import React, { useState } from 'react';

export type ToolType = 'circle' | 'square' | 'triangle';

export interface Shape {
  id: number;
  type: ToolType;
  x: number;
  y: number;
}

interface CanvasProps {
  selectedTool: ToolType;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
}

const Canvas: React.FC<CanvasProps> = ({ selectedTool, shapes, setShapes }) => {
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape: Shape = {
      id: Date.now(),
      type: selectedTool,
      x,
      y
    };

    setShapes([...shapes, newShape]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    const shape = shapes.find(s => s.id === id);
    if (shape) {
      const offsetX = e.clientX - shape.x;
      const offsetY = e.clientY - shape.y;
      setOffset({ x: offsetX, y: offsetY });
      setDraggedId(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedId !== null) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const newX = e.clientX - rect.left - offset.x;
      const newY = e.clientY - rect.top - offset.y;

      setShapes(prev =>
        prev.map(shape =>
          shape.id === draggedId ? { ...shape, x: newX, y: newY } : shape
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  const renderShape = (shape: Shape) => {
    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: 50,
      height: 50,
      cursor: 'grab'
    };

    if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          onMouseDown={(e) => handleMouseDown(e, shape.id)}
          style={{ ...commonStyle, borderRadius: '50%', backgroundColor: 'red' }}
        />
      );
    }

    if (shape.type === 'square') {
      return (
        <div
          key={shape.id}
          onMouseDown={(e) => handleMouseDown(e, shape.id)}
          style={{ ...commonStyle, backgroundColor: 'green' }}
        />
      );
    }

    if (shape.type === 'triangle') {
      return (
        <div
          key={shape.id}
          onMouseDown={(e) => handleMouseDown(e, shape.id)}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: 0,
            height: 0,
            cursor: 'grab',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '50px solid blue'
          }}
        />
      );
    }

    return null;
  };

  return (
    <div
      style={styles.canvas}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {shapes.map(renderShape)}
    </div>
  );
};

const styles = {
  canvas: {
    flex: 1,
    position: 'relative' as const,
    backgroundColor: '#fff',
    border: '2px dashed gray',
    margin: '20px',
    height: '80vh'
  }
};

export default Canvas;

