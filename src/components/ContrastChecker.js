import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import  Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { StarBorder as StarBorderIcon } from '@mui/icons-material';
import "./ContrastChecker.css"

function ContrastChecker() {
    const [foregroundColor, setForegroundColor] = useState('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [contrastRatio, setContrastRatio] = useState(0);
    const [status, setStatus] = useState('');
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        const ratio = chroma.contrast(foregroundColor, backgroundColor);
        setContrastRatio(ratio.toFixed(2));

        if (ratio >= 7) {
            setStatus('Excellent');
            setRatingValue(5);
        } else if (ratio >= 4.5) {
            setStatus('Good');
            setRatingValue(4);
        } else if (ratio >= 3) {
            setStatus('Average');
            setRatingValue(3);
        } else if (ratio >= 2) {
            setStatus('Poor');
            setRatingValue(2);
        } else {
            setStatus('Bad');
            setRatingValue(1);
        }
    }, [foregroundColor, backgroundColor]);

    return (
        <>
        <div className="contrast-checker-box">

            <div className="color-picker-container">
                <div className="color-picker-section">
                    <label>Foreground Color:</label>
                    <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                    />
                </div>
                <div className="color-picker-section">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                </div>
            </div>
            <div className="contrast-details">
                <div className="contrast-ratio">
                    Contrast Ratio: <span>{contrastRatio}</span>
                </div>
                <div className="contrast-status">
                    Status: <span>{status}</span>
                </div>
                <div className="contrast-rating">
                    Rating: 
                    <Rating
                        name="customized-empty"
                        value={ratingValue}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        readOnly
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default ContrastChecker;





