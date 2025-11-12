"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import dholeraMap from "@/app/assets/dholera-map-with-icons.webp";
import dholeraMapM from "@/app/assets/dholera-map-mobile.webp";
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
  const [isMobile, setIsMobile] = useState(false);
  const mapContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setImageLoaded(false);
      setTimeout(() => setImageLoaded(true), 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop coordinates (for large desktop map)
  const desktopAreas = [
    {
      id: 'metro',
      title: 'MonoRail',
      coords: [626, 47, 671, 95],
      shape: 'rect',
      description: 'Dholera MonoRail System'
    },
    {
      id: 'airport',
      title: 'Dholera International Airport',
      coords: [827, 123, 872, 171],
      shape: 'rect',
      description: 'International Airport Project'
    },
    {
      id: 'expressway',
      title: 'Expressway',
      coords: [603, 199, 646, 244],
      shape: 'rect',
      description: 'Dholera Expressway'
    },
    {
      id: 'abcd',
      title: 'ABCD Building',
      coords: [439, 377, 482, 424],
      shape: 'rect',
      description: 'ABCD Building Complex'
    },
    {
      id: 'tata',
      title: 'Tata Semicon',
      coords: [487, 432, 530, 477],
      shape: 'rect',
      description: 'Tata Semiconductor Facility'
    },
    {
      id: 'renew',
      title: 'ReNew Power',
      coords: [538, 450, 581, 494],
      shape: 'rect',
      description: 'ReNew Power Plant'
    },
    {
      id: 'solar',
      title: 'Solar Park',
      coords: [674, 681, 718, 727],
      shape: 'rect',
      description: 'Solar Energy Park'
    },
    {
      id: 'activation',
      title: 'Activation Area',
      coords: [486, 508, 498, 481, 574, 500, 586, 514, 555, 583, 597, 602, 625, 595, 618, 565, 617, 526, 588, 521, 568, 546],
      shape: 'poly',
      description: 'Project Activation Area'
    }
  ];

  // Mobile coordinates - UPDATED with correct coordinates
  const mobileAreas = [
    {
      id: 'abcd',
      title: 'ABCD Building',
      coords: [162, 135, 182, 158],  // Using your new coordinates: min/max from the 4 points
      shape: 'rect',
      description: 'ABCD Building Complex'
    },
    {
      id: 'expressway',
      title: 'Expressway',
      coords: [219, 77, 238, 96],  // Using your new coordinates
      shape: 'rect',
      description: 'Dholera Expressway'
    }
  ];

  const areas = isMobile ? mobileAreas : desktopAreas;

  const getAreaCenter = (coords, shape) => {
    if (shape === 'rect') {
      const [x1, y1, x2, y2] = coords;
      return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
    } else if (shape === 'poly') {
      let sumX = 0, sumY = 0;
      for (let i = 0; i < coords.length; i += 2) {
        sumX += coords[i];
        sumY += coords[i + 1];
      }
      const pointCount = coords.length / 2;
      return { x: sumX / pointCount, y: sumY / pointCount };
    }
    return { x: 0, y: 0 };
  };

  const handleAreaClick = (area, event) => {
    if (!imageRef.current) return;

    event?.preventDefault();
    event?.stopPropagation();

    const imgRect = imageRef.current.getBoundingClientRect();
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;
    
    const areaCenter = getAreaCenter(area.coords, area.shape);
    const scaledX = areaCenter.x * scaleX;
    const scaledY = areaCenter.y * scaleY;
    
    const absoluteX = imgRect.left + scaledX;
    const absoluteY = imgRect.top + scaledY;
    
    const modalWidth = Math.min(384, window.innerWidth - 32);
    const modalHeight = 400;
    
    let finalX = absoluteX - modalWidth / 2;
    let finalY = absoluteY + 20;
    
    if (finalX < 16) finalX = 16;
    if (finalX + modalWidth > window.innerWidth - 16) {
      finalX = window.innerWidth - modalWidth - 16;
    }
    
    if (finalY + modalHeight > window.innerHeight - 16) {
      finalY = absoluteY - modalHeight - 20;
    }
    
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

  const renderClickableAreas = () => {
    if (!imageRef.current || !imageLoaded) return null;

    const imgRect = imageRef.current.getBoundingClientRect();
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    if (!naturalWidth || !naturalHeight || !imgRect.width) return null;

    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;
    
    console.log('Image dimensions:', { naturalWidth, naturalHeight, displayWidth: imgRect.width, displayHeight: imgRect.height });
    console.log('Scale factors:', { scaleX, scaleY });

    return areas.map((area) => {
      if (area.shape === 'rect') {
        const [x1, y1, x2, y2] = area.coords;
        const left = x1 * scaleX;
        const top = y1 * scaleY;
        const width = (x2 - x1) * scaleX;
        const height = (y2 - y1) * scaleY;
        
        console.log(`${area.id}:`, { left, top, width, height, coords: area.coords });
        
        return (
          <button
            key={area.id}
            onClick={(e) => handleAreaClick(area, e)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleAreaClick(area, e);
            }}
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
            }}
            className="border-2 border-red-500 bg-blue-500 bg-opacity-30 cursor-pointer hover:bg-opacity-50 active:bg-opacity-70 transition-colors"
            title={area.title}
            aria-label={area.title}
          />
        );
      } else if (area.shape === 'poly') {
        const coords = area.coords;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (let i = 0; i < coords.length; i += 2) {
          minX = Math.min(minX, coords[i]);
          maxX = Math.max(maxX, coords[i]);
          minY = Math.min(minY, coords[i + 1]);
          maxY = Math.max(maxY, coords[i + 1]);
        }
        
        return (
          <button
            key={area.id}
            onClick={(e) => handleAreaClick(area, e)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleAreaClick(area, e);
            }}
            style={{
              position: 'absolute',
              left: `${minX * scaleX}px`,
              top: `${minY * scaleY}px`,
              width: `${(maxX - minX) * scaleX}px`,
              height: `${(maxY - minY) * scaleY}px`,
            }}
            className="border-0 bg-blue-500 bg-opacity-20 cursor-pointer hover:bg-opacity-40 active:bg-opacity-60 transition-colors"
            title={area.title}
            aria-label={area.title}
          />
        );
      }
      return null;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOpen && !event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Interactive Dholera Map
        </h1>
        
        <div className="relative bg-white rounded-lg shadow-lg p-4" ref={mapContainerRef}>
          <div className="relative inline-block max-w-full">
            <Image
              ref={imageRef}
              src={isMobile 
                ? dholeraMapM
                : dholeraMap
              }
              alt="Dholera Map"
              className="w-full h-auto select-none block"
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
            
            {imageLoaded && (
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
                style={{
                  width: imageRef.current?.getBoundingClientRect().width + 'px',
                  height: imageRef.current?.getBoundingClientRect().height + 'px'
                }}
              >
                <div className="relative w-full h-full pointer-events-auto">
                  {renderClickableAreas()}
                </div>
              </div>
            )}
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            {isMobile ? 'Tap' : 'Click'} on the highlighted areas to view details
          </p>
          
          {isMobile && (
            <p className="text-center text-xs text-green-600 mt-2">
              Testing Mobile: ABCD Building & Expressway only
            </p>
          )}
        </div>

        {modalOpen && selectedArea && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeModal}
            />
            
            <div 
              className="fixed z-50 bg-white rounded-lg shadow-2xl modal-content overflow-hidden"
              style={{
                left: `${modalPosition.x}px`,
                top: `${modalPosition.y}px`,
                maxWidth: 'calc(100vw - 32px)',
                width: '384px',
                maxHeight: '80vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-gray-800 pr-4">{selectedArea.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-light leading-none w-8 h-8 flex items-center justify-center flex-shrink-0"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh - 60px)' }}>
                <div className="w-full aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md mb-3 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{selectedArea.title}</span>
                </div>
                <p className="text-gray-600">{selectedArea.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}