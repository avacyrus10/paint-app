import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas, { Shape } from './components/Canvas';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'circle' | 'square' | 'triangle'>('circle');
  const [shapes, setShapes] = useState<Shape[]>([]);

  const handleImport = (newShapes: Shape[]) => {
    setShapes(newShapes);
  };

  return (
    <div>
      <Header shapes={shapes} onImport={handleImport} />
      <div style={styles.main}>
        <Canvas
          selectedTool={selectedTool}
          shapes={shapes}
          setShapes={setShapes}
        />
        <Sidebar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      </div>
    </div>
  );
};

const styles = {
  main: {
    display: 'flex',
    height: 'calc(100vh - 60px)'
  }
};

export default App;

