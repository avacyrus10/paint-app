import React, { useRef } from 'react';
import { Shape } from './Canvas';

interface HeaderProps {
  shapes: Shape[];
  title: string;
  onTitleChange: (newTitle: string) => void;
  onImport: (shapes: Shape[]) => void;
}

const Header: React.FC<HeaderProps> = ({ shapes, title, onTitleChange, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify({ title, shapes }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${title || 'drawing'}.json`;
    link.click();
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (Array.isArray(data.shapes)) {
            onTitleChange(data.title || 'Untitled');
            onImport(data.shapes);
          } else {
            alert('Invalid shape data');
          }
        } catch {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header style={styles.header}>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        style={styles.titleInput}
        placeholder="Painting Title"
      />
      <div style={styles.buttons}>
        <button onClick={handleImportClick}>Import</button>
        <button onClick={handleExport}>Export</button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc'
  },
  titleInput: {
    fontSize: '1.2rem',
    flexGrow: 1,
    marginRight: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  }
};

export default Header;

