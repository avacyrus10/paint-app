import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'circle' | 'square' | 'triangle'>('circle');

  return (
    <div>
      <Header />
      <div style={styles.main}>
        <div style={styles.canvasArea}>
          <div style={styles.canvasPlaceholder}>Canvas (To be implemented)</div>
        </div>
        <Sidebar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      </div>
    </div>
  );
};

const styles = {
  main: {
    display: 'flex',
    height: 'calc(100vh - 60px)'
  },
  canvasArea: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  canvasPlaceholder: {
    border: '2px dashed gray',
    width: '80%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: '#777'
  }
};

export default App;

