import React, { useState } from 'react';

type ToolType = 'circle' | 'square' | 'triangle';

interface Shape {
  id: number;
  type: ToolType;
  x: number;
  y: number;
}

interface CanvasProps {
  selectedTool: ToolType;
}

const Canvas: React.FC<CanvasProps> = ({ selectedTool }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape: Shape = {
      id: nextId,
      type: selectedTool,
      x,
      y
    };

    setShapes([...shapes, newShape]);
    setNextId(nextId + 1);
  };

  const renderShape = (shape: Shape) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: 50,
      height: 50
    };

    if (shape.type === 'circle') {
      style.borderRadius = '50%';
      style.backgroundColor = 'red';
    }

    if (shape.type === 'square') {
      style.backgroundColor = 'green';
    }

    if (shape.type === 'triangle') {
      return (
        <div
          key={shape.id}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: 0,
            height: 0,
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '50px solid blue'
          }}
        />
      );
    }

    return <div key={shape.id} style={style} />;
  };

  return (
    <div style={styles.canvas} onClick={handleClick}>
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

