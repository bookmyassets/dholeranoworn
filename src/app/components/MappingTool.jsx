"use client";
import React, { useState, useRef, useEffect } from 'react';
import dholeraMap from "@/app/assets/dholera-map-with-icons.webp";
import dholeraMapM from "@/app/assets/dholera-map-mobile.webp";
import Image from 'next/image';

export default function CoordinateMapper() {
  const [clicks, setClicks] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate coordinates relative to natural image size
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    const scaleX = naturalWidth / rect.width;
    const scaleY = naturalHeight / rect.height;
    
    const naturalX = Math.round(x * scaleX);
    const naturalY = Math.round(y * scaleY);
    
    setClicks([...clicks, { x: naturalX, y: naturalY, displayX: x, displayY: y }]);
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImageInfo({
        naturalWidth: imageRef.current.naturalWidth,
        naturalHeight: imageRef.current.naturalHeight,
        displayWidth: rect.width,
        displayHeight: rect.height
      });
    }
  };

  const clearClicks = () => {
    setClicks([]);
  };

  const copyCoordinates = () => {
    const coords = clicks.map(c => `[${c.x}, ${c.y}]`).join(', ');
    navigator.clipboard.writeText(coords);
    alert('Coordinates copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-white mb-4">
            Coordinate Mapper Tool
          </h1>
          <p className="text-gray-300 mb-2">
            Click on the map to get coordinates. Click two corners of a rectangle to get rect coords.
          </p>
          {imageInfo && (
            <div className="text-sm text-gray-400 mb-2">
              Image: {imageInfo.naturalWidth}x{imageInfo.naturalHeight} (natural) | 
              {Math.round(imageInfo.displayWidth)}x{Math.round(imageInfo.displayHeight)} (display)
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="relative inline-block">
            <Image
              ref={imageRef}
              src={dholeraMapM
              }
              alt="Map"
              className="w-full h-auto cursor-crosshair select-none"
              onClick={handleImageClick}
              onLoad={handleImageLoad}
              draggable={false}
            />
            
            {/* Show click points */}
            {clicks.map((click, idx) => (
              <div
                key={idx}
                className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${click.displayX}px`,
                  top: `${click.displayY}px`
                }}
              >
                <span className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-1 rounded whitespace-nowrap">
                  {idx + 1}: [{click.x}, {click.y}]
                </span>
              </div>
            ))}
          </div>
        </div>

        {clicks.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-white">Coordinates ({clicks.length})</h2>
              <div className="space-x-2">
                <button
                  onClick={copyCoordinates}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Copy Coords
                </button>
                <button
                  onClick={clearClicks}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400 overflow-x-auto">
              {clicks.length === 2 && (
                <div className="mb-2 text-yellow-400">
                  Rectangle coords: [{Math.min(clicks[0].x, clicks[1].x)}, {Math.min(clicks[0].y, clicks[1].y)}, {Math.max(clicks[0].x, clicks[1].x)}, {Math.max(clicks[0].y, clicks[1].y)}]
                </div>
              )}
              {clicks.map((click, idx) => (
                <div key={idx}>
                  Point {idx + 1}: [{click.x}, {click.y}]
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 bg-blue-900 rounded-lg p-4 text-white">
          <h3 className="font-bold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Upload your actual map images to replace the placeholders</li>
            <li>For rectangles: Click top-left corner, then bottom-right corner</li>
            <li>For polygons: Click each vertex point in order</li>
            <li>Copy the coordinates and use them in your code</li>
            <li>Make sure to match desktop coords with desktop image and mobile coords with mobile image</li>
          </ol>
        </div>
      </div>
    </div>
  );
}