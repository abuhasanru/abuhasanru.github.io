import React from 'react';
import { getAllData, setAllData } from '../firebaseUtils';

const DataManager = () => {
  const handleExport = () => {
    getAllData()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = JSON.stringify(snapshot.val());
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'expense-tracker-data.json';
          a.click();
          URL.revokeObjectURL(url);
        } else {
          alert('No data to export.');
        }
      })
      .catch((error) => {
        alert('Error exporting data: ' + error.message);
      });
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (window.confirm('Are you sure you want to import data? This will overwrite existing data.')) {
            setAllData(data)
              .then(() => {
                alert('Data imported successfully!');
              })
              .catch((error) => {
                alert('Error importing data: ' + error.message);
              });
          }
        } catch (error) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h3>Data Management</h3>
      <button onClick={handleExport}>Export Data (.json)</button>
      <input type="file" accept=".json" onChange={handleImport} />
    </div>
  );
};

export default DataManager;
