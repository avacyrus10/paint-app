import React from 'react';

type ToolType = 'circle' | 'square' | 'triangle';

interface SidebarProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, tool: ToolType) => {
    event.dataTransfer.setData('toolType', tool);
  };

  return (
    <aside style={styles.sidebar}>
      <h3>Tools</h3>
      {['circle', 'square', 'triangle'].map((tool) => (
        <div
          key={tool}
          draggable
          onDragStart={(e) => handleDragStart(e, tool as ToolType)}
          style={getButtonStyle(selectedTool === tool)}
          onClick={() => onSelectTool(tool as ToolType)}
        >
          {tool === 'circle' && '⭕ Circle'}
          {tool === 'square' && '◼ Square'}
          {tool === 'triangle' && '🔺 Triangle'}
        </div>
      ))}
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '150px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  }
};

function getButtonStyle(isSelected: boolean): React.CSSProperties {
  return {
    padding: '10px',
    width: '100%',
    backgroundColor: isSelected ? '#007bff' : '#fff',
    color: isSelected ? '#fff' : '#000',
    fontWeight: isSelected ? 'bold' : 'normal',
    cursor: 'grab',
    border: '1px solid #ccc'
  };
}

export default Sidebar;

