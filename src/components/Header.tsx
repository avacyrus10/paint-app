import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Painting Title</h1>
      <div style={styles.buttons}>
        <button>Import</button>
        <button>Export</button>
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

