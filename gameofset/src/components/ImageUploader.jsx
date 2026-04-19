import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useState, useEffect, useRef } from 'react';

function ImageUploader({onImageUpload, isMinimized, isVisible, onMinimize, onClose}) {
    const container_style = {display: isMinimized ? "none" : "grid"};
    const panel_style = {display: isVisible ? "flex" : "none"};

    const [preview, setPreview] = useState(null);
    const [cvReady, setCvReady] = useState(false);
    const nodeRef = useRef(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
    };

    useEffect(() => {
    const checkCV = setInterval(() => {
        if (window.cv) {
        setCvReady(true);
        clearInterval(checkCV);
        }
    }, 500);
    }, []);

    const analyzeImage = () => {
        const cv = window.cv;
        let imgElement = document.getElementById('input-image');
        let src = cv.imread(imgElement);
        let gray = new cv.Mat();
        let thresh = new cv.Mat();
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(gray, thresh, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
        cv.imshow('output-canvas', thresh);
        cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        let symbols = [];
        for (let i = 0; i < contours.size(); ++i) {
            let cnt = contours.get(i);
            let area = cv.contourArea(cnt);

            if (area > 100 && area < 15000) {
                let rect = cv.boundingRect(cnt);
                
                // Color
                let pixel = src.ucharPtr(rect.y + (rect.height / 2), rect.x + (rect.width / 2));
                let r = pixel[0], g = pixel[1], b = pixel[2];
                let detectedColor = (g > r && g > b) ? "green" : (b > r && b > g) ? "purple" : "red";

                // Shape
                let peri = cv.arcLength(cnt, true);
                let approx = new cv.Mat();
                cv.approxPolyDP(cnt, approx, 0.04 * peri, true);
                let shapeType = "squiggle";
                if (approx.rows === 4) shapeType = "diamond";
                else if (approx.rows > 4) shapeType = "oval";
                approx.delete();

                // Shading
                let roi = thresh.roi(rect);
                let nonZero = cv.countNonZero(roi);
                let density = nonZero / (rect.width * rect.height);
                roi.delete();

                let detectedBgd = "shaded";
                if (density > 0.8) detectedBgd = "solid";
                else if (density < 0.25) detectedBgd = "open";

                symbols.push({
                    x: rect.x, y: rect.y, width: rect.width, height: rect.height,
                    color: detectedColor, shape: shapeType, bgd: detectedBgd
                });
            }
        }

        // Grouping
        let detectedDeck = [];
        let usedIndices = new Set();

        symbols.sort((a, b) => a.y - b.y);

        for (let i = 0; i < symbols.length; i++) {
            if (usedIndices.has(i)) continue;

            let currentCardSymbols = [symbols[i]];
            usedIndices.add(i);

            for (let j = i + 1; j < symbols.length; j++) {
                if (usedIndices.has(j)) continue;

                // Only group if they are vertically aligned and close together
                let xDist = Math.abs(symbols[i].x - symbols[j].x);
                let yDist = Math.abs(symbols[i].y - symbols[j].y);

                if (xDist < 30 && yDist < 80) {
                    currentCardSymbols.push(symbols[j]);
                    usedIndices.add(j);
                }
            }

            let first = currentCardSymbols[0];
            detectedDeck.push({
                id: `card-${detectedDeck.length}`,
                num: currentCardSymbols.length > 3 ? 3 : currentCardSymbols.length,
                color: first.color,
                shape: first.shape,
                bgd: first.bgd,
                x: first.x,
                y: first.y
            });
        }

        onImageUpload(detectedDeck);

        // Cleanup
        src.delete(); gray.delete(); thresh.delete();
        contours.delete(); hierarchy.delete();
    };

    return (
        <Draggable nodeRef={nodeRef} handle=".header">
            <div ref={nodeRef} className="upload-panel" style={panel_style}>
                <PanelHeader isMinimized={isMinimized} title="Upload Image" onMinimize={() => onMinimize("Upload Panel")} onClose={() => onClose("Upload Panel")}/>
                <div className='upload-container' style={container_style}>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    
                    {preview && (
                        <div className="preview-area">
                            <p>Image Preview:</p>
                            <img id="input-image" src={preview} alt="To be processed"/>
                            <br/>
                            <button 
                                onClick={analyzeImage} 
                                disabled={!cvReady}>
                                {cvReady ? "Scan Deck" : "Loading Engine..."}
                            </button>
                        </div>
                    )}
                    <canvas id="output-canvas" style={{ display: 'none' }}></canvas>
                </div>
            </div>
        </Draggable>
    );
}

export default ImageUploader;