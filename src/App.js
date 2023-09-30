import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import namer from 'color-namer';
import ContrastChecker from './components/ContrastChecker';
import "./App.css";

function App() {
  const [baseColor, setBaseColor] = useState(chroma.random().hex());
  const [adjustedColors, setAdjustedColors] = useState([]);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    const generateAdjustedColors = () => {
      let color = chroma(baseColor)
        .set('hsl.h', `+${hue}`)
        .saturate(saturation)
        .luminance(0.5 + (brightness / 2));
      
      let complementaryColor = chroma(color).set('hsl.h', '+180');
      let analogous1 = chroma(color).set('hsl.h', '+20');
      let analogous2 = chroma(color).set('hsl.h', '-20');

      let colors = [color.hex(), complementaryColor.hex(), analogous1.hex(), analogous2.hex()];
      setAdjustedColors(colors);
    };
    generateAdjustedColors();
  }, [baseColor, hue, saturation, brightness]);

  const getColorName = (colorHex) => {
    const colorNames = namer(colorHex);
    return colorNames.ntc[0].name;  // Using the 'ntc' naming set from color-namer
  };

  return (
    <div className="container">
      <h1>Color Palette Generator</h1>
      
      {/* Display adjusted colors */}
      <div className="palette-container">
        {adjustedColors.map((color, index) => (
          <div key={index} className="color-card" style={{ backgroundColor: color }}>
            <div className="color-info">
              <span className="color-label">{color}</span>
              <span className="color-name">{getColorName(color)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sliders for adjustments */}
      <div className="slider-container">
        <div>
          <label> Adjust Hue: </label>
          <input
            type="range"
            min="-180"
            max="180"
            value={hue}
            onChange={(e) => setHue(e.target.value)}
          />
        </div>
        <div>
          <label>Saturation: </label>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={saturation}
            onChange={(e) => setSaturation(e.target.value)}
          />
        </div>
        <div>
          <label>Brightness: </label>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </div>
      </div>

      {/* Button to generate a new base color */}
      <button onClick={() => setBaseColor(chroma.random().hex())} className='generate-btn'>
        Generate Base Color
      </button>
      <h2 className="section-heading">Contrast Checker</h2>
      <ContrastChecker/>
    </div>
  );
}

export default App;
