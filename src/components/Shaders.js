import React from 'react';

const Shaders = ({ setShader }) => {
  return (
    <div>
      <h3>Shaders</h3>
      <select onChange={(e) => setShader(e.target.value)}>
        <option value="default">Default</option>
        <option value="cool">Cool</option>
        <option value="warm">Warm</option>
      </select>
    </div>
  );
};

export default Shaders;
