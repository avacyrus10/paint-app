import React from 'react';

type ToolType = 'circle' | 'square' | 'triangle';

interface SidebarProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  return (
    <aside style={styles.sidebar}>
      <h3>Tools</h3>
      <button
        onClick={() => onSelectTool('circle')}
        style={getButtonStyle(selectedTool === 'circle')}
      >
        ⭕ Circle
      </button>
      <button
        onClick={() => onSelectTool('square')}
        style={getButtonStyle(selectedTool === 'square')}
      >
        ◼ Square
      </button>
      <button
        onClick={() => onSelectTool('triangle')}
        style={getButtonStyle(selectedTool === 'triangle')}
      >
        🔺 Triangle
      </button>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '150px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #ccc'
  }
};

function getButtonStyle(isSelected: boolean): React.CSSProperties {
  if (isSelected) {
    return {
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: '10px',
      padding: '10px',
      width: '100%',
    };
  } else {
    return {
      backgroundColor: '#fff',
      color: '#000',
      marginBottom: '10px',
      padding: '10px',
      width: '100%',
    };
  }
}

export default Sidebar;

