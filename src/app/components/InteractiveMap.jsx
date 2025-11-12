"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import dholeraMap from "@/app/assets/dholera-map-with-icons.webp";
import metro from "@/app/assets/metro.webp"
import abcd from "@/app/assets/abcd-building.webp"
import activationArea from "@/app/assets/Activation-Area.webp"
import dia from "@/app/assets/dholera-international-airport.webp"
import expressway from "@/app/assets/expressway.webp"
import renew from "@/app/assets/ReNew-power.webp"
import solarPark from "@/app/assets/solar-park.webp"
import tata from "@/app/assets/tata-semicon.webp"

export default function InteractiveMap() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Map areas with their corresponding images
  const areas = [
    {
      id: 'metro',
      title: 'MonoRail',
      coords: [626, 47, 671, 95],
      shape: 'rect',
      image: metro,
      description: 'Dholera MonoRail System'
    },
    {
      id: 'airport',
      title: 'Dholera International Airport',
      coords: [827, 123, 872, 171],
      shape: 'rect',
      image: dia,
      description: 'International Airport Project'
    },
    {
      id: 'expressway',
      title: 'Expressway',
      coords: [603, 199, 646, 244],
      shape: 'rect',
      image: expressway,
      description: 'Dholera Expressway'
    },
    {
      id: 'abcd',
      title: 'ABCD Building',
      coords: [439, 377, 482, 424],
      shape: 'rect',
      image: abcd,
      description: 'ABCD Building Complex'
    },
    {
      id: 'tata',
      title: 'Tata Semicon',
      coords: [487, 432, 530, 477],
      shape: 'rect',
      image: tata,
      description: 'Tata Semiconductor Facility'
    },
    {
      id: 'renew',
      title: 'ReNew Power',
      coords: [538, 450, 581, 494],
      shape: 'rect',
      image: renew,
      description: 'ReNew Power Plant'
    },
    {
      id: 'solar',
      title: 'Solar Park',
      coords: [674, 681, 718, 727],
      shape: 'rect',
      image: solarPark,
      description: 'Solar Energy Park'
    },
    {
      id: 'activation',
      title: 'Activation Area',
      coords: [486, 508, 498, 481, 574, 500, 586, 514, 555, 583, 597, 602, 625, 595, 618, 565, 617, 526, 588, 521, 568, 546],
      shape: 'poly',
      image: activationArea,
      description: 'Project Activation Area'
    }
  ];

  // Calculate center point of area coordinates
  const getAreaCenter = (coords, shape) => {
    if (shape === 'rect') {
      const [x1, y1, x2, y2] = coords;
      return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
      };
    } else if (shape === 'poly') {
      let sumX = 0, sumY = 0;
      for (let i = 0; i < coords.length; i += 2) {
        sumX += coords[i];
        sumY += coords[i + 1];
      }
      const pointCount = coords.length / 2;
      return {
        x: sumX / pointCount,
        y: sumY / pointCount
      };
    }
    return { x: 0, y: 0 };
  };

  const handleAreaClick = (area, event) => {
    if (!imageRef.current || !mapContainerRef.current) return;

    // Prevent default for touch events
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Get the actual rendered dimensions of the image
    const imgRect = imageRef.current.getBoundingClientRect();
    
    // Get natural dimensions
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    // Calculate scale factors
    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;
    
    // Get center of the clicked area
    const areaCenter = getAreaCenter(area.coords, area.shape);
    
    // Scale the coordinates to match actual rendered size
    const scaledX = areaCenter.x * scaleX;
    const scaledY = areaCenter.y * scaleY;
    
    // Calculate position relative to viewport
    const absoluteX = imgRect.left + scaledX;
    const absoluteY = imgRect.top + scaledY;
    
    // Calculate modal position to keep it on screen
    const modalWidth = Math.min(384, window.innerWidth - 32);
    const modalHeight = 400;
    
    let finalX = absoluteX - modalWidth / 2;
    let finalY = absoluteY + 20;
    
    // Keep modal within viewport bounds
    if (finalX < 16) finalX = 16;
    if (finalX + modalWidth > window.innerWidth - 16) {
      finalX = window.innerWidth - modalWidth - 16;
    }
    
    // If modal goes below viewport, show it above the click point
    if (finalY + modalHeight > window.innerHeight - 16) {
      finalY = absoluteY - modalHeight - 20;
    }
    
    // If still doesn't fit, center it
    if (finalY < 16) {
      finalY = (window.innerHeight - modalHeight) / 2;
    }
    
    setModalPosition({ x: finalX, y: finalY });
    setSelectedArea(area);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArea(null);
  };

  // Create clickable overlays with better mobile support
  const renderClickableAreas = () => {
    if (!imageRef.current || !imageLoaded) return null;

    const imgRect = imageRef.current.getBoundingClientRect();
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    if (!naturalWidth || !naturalHeight) return null;

    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;

    return areas.map((area) => {
      const handleTouchStart = (e) => {
        e.preventDefault();
      };

      const handleClick = (e) => {
        handleAreaClick(area, e);
      };

      const handleTouchEnd = (e) => {
        e.preventDefault();
        handleAreaClick(area, e);
      };

      if (area.shape === 'rect') {
        const [x1, y1, x2, y2] = area.coords;
        return (
          <div
            key={area.id}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'absolute',
              left: `${x1 * scaleX}px`,
              top: `${y1 * scaleY}px`,
              width: `${(x2 - x1) * scaleX}px`,
              height: `${(y2 - y1) * scaleY}px`,
              cursor: 'pointer',
              zIndex: 10,
              // Better touch targets for mobile
              minWidth: '20px',
              minHeight: '20px',
            }}
            className="hover:bg-blue-500 hover:bg-opacity-20 active:bg-blue-500 active:bg-opacity-30 transition-colors touch-manipulation"
            title={area.title}
          />
        );
      } else if (area.shape === 'poly') {
        // For polygon, create a rough bounding box with better touch area
        const coords = area.coords;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (let i = 0; i < coords.length; i += 2) {
          minX = Math.min(minX, coords[i]);
          maxX = Math.max(maxX, coords[i]);
          minY = Math.min(minY, coords[i + 1]);
          maxY = Math.max(maxY, coords[i + 1]);
        }
        
        // Add padding for better touch targets
        const padding = 10;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(naturalWidth, maxX + padding);
        maxY = Math.min(naturalHeight, maxY + padding);
        
        return (
          <div
            key={area.id}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'absolute',
              left: `${minX * scaleX}px`,
              top: `${minY * scaleY}px`,
              width: `${(maxX - minX) * scaleX}px`,
              height: `${(maxY - minY) * scaleY}px`,
              cursor: 'pointer',
              zIndex: 10,
              // Better touch targets for mobile
              minWidth: '20px',
              minHeight: '20px',
            }}
            className="hover:bg-blue-500 hover:bg-opacity-20 active:bg-blue-500 active:bg-opacity-30 transition-colors touch-manipulation"
            title={area.title}
          />
        );
      }
      return null;
    });
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOpen && !event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [modalOpen]);

  // Re-render on resize
  useEffect(() => {
    const handleResize = () => {
      if (modalOpen) {
        closeModal();
      }
      setImageLoaded(false);
      setTimeout(() => setImageLoaded(true), 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Interactive Dholera Map
        </h1>
        
        <div className="relative bg-white rounded-lg shadow-lg p-4" ref={mapContainerRef}>
          <div className="relative inline-block w-full">
            <Image
              ref={imageRef}
              src={dholeraMap}
              alt="Dholera Map"
              className="w-full h-auto touch-manipulation"
              priority
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Clickable overlay areas */}
            {imageLoaded && (
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  {renderClickableAreas()}
                </div>
              </div>
            )}
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Tap on any highlighted area on the map to view details
          </p>
        </div>

        {/* Modal - positioned near click */}
        {modalOpen && selectedArea && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div 
              className="fixed z-50 bg-white rounded-lg shadow-2xl max-w-sm w-full modal-content"
              style={{
                left: `${modalPosition.x}px`,
                top: `${modalPosition.y}px`,
                maxHeight: '80vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-lg">
                <h2 className="text-lg font-bold text-gray-800">
                  {selectedArea.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-light leading-none w-8 h-8 flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                <Image
                  src={selectedArea.image} 
                  alt={selectedArea.title}
                  className="w-full h-auto rounded-lg shadow-md mb-3"
                />
                <p className="text-gray-700 text-sm">
                  {selectedArea.description}
                </p>
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 px-4 py-3 border-t rounded-b-lg">
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 active:bg-blue-800 touch-manipulation"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}