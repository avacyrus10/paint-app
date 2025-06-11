import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'circle' | 'square' | 'triangle'>('circle');

  return (
    <div>
      <Header />
      <div style={styles.main}>
        <Canvas selectedTool={selectedTool} />
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

