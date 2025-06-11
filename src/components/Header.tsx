import React, { useRef } from 'react';
import { Shape } from './Canvas';

interface HeaderProps {
  shapes: Shape[];
  onImport: (shapes: Shape[]) => void;
}

const Header: React.FC<HeaderProps> = ({ shapes, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify(shapes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'drawing.json';
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
          if (Array.isArray(data)) {
            onImport(data);
          }
        } catch (err) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Painting Title</h1>
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
  title: {
    margin: 0
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  }
};

export default Header;

