import React from 'react';

const Themes = ({ setTheme }) => {
  return (
    <div>
      <h3>Themes</h3>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Themes;
