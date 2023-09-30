import React, { useState } from 'react';
import "../App.css"

function PaletteDisplay({ colors }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (index, color) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500); // Reset after 1.5 seconds
  };

  return (
    <div className="palette-container">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-card"
          style={{ backgroundColor: color }}
          title={color}
          onClick={() => handleCopy(index, color)}
        >
          <div className="color-code">{color}</div>
          {copiedIndex === index && <div className="copied-message">Copied</div>}
        </div>
      ))}
    </div>
  );
}

export default PaletteDisplay;
