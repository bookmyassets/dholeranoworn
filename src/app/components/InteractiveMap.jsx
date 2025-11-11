"use client";
import Image from 'next/image';
import React, { useState } from 'react';
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

  // Map areas with their corresponding images
  const areas = [
    {
      id: 'metro',
      title: 'Metro',
      coords: '626,47,671,95',
      shape: 'rect',
      image: metro,
      description: 'Dholera Metro System'
    },
    {
      id: 'airport',
      title: 'Dholera International Airport',
      coords: '827,123,872,171',
      shape: 'rect',
      image: dia,
      description: 'International Airport Project'
    },
    {
      id: 'expressway',
      title: 'Expressway',
      coords: '603,199,646,244',
      shape: 'rect',
      image: expressway,
      description: 'Dholera Expressway'
    },
    {
      id: 'abcd',
      title: 'ABCD Building',
      coords: '439,377,482,424',
      shape: 'rect',
      image: abcd,
      description: 'ABCD Building Complex'
    },
    {
      id: 'tata',
      title: 'Tata Semicon',
      coords: '487,432,530,477',
      shape: 'rect',
      image: tata,
      description: 'Tata Semiconductor Facility'
    },
    {
      id: 'renew',
      title: 'ReNew Power',
      coords: '538,450,581,494',
      shape: 'rect',
      image: renew,
      description: 'ReNew Power Plant'
    },
    {
      id: 'solar',
      title: 'Solar Park',
      coords: '674,681,718,727',
      shape: 'rect',
      image: solarPark,
      description: 'Solar Energy Park'
    },
    {
      id: 'activation',
      title: 'Activation Area',
      coords: '486,508,498,481,574,500,586,514,555,583,597,602,625,595,618,565,617,526,588,521,568,546',
      shape: 'poly',
      image: activationArea,
      description: 'Project Activation Area'
    }
  ];

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArea(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Interactive Dholera Map
        </h1>
        
        <div className="relative bg-white rounded-lg shadow-lg p-4">
          <div className="relative inline-block">
            <Image
              src={dholeraMap}
              alt="Dholera Map"
              useMap="#dholeramap"
              className="w-full h-auto"
            />
            
            <map name="dholeramap">
              {areas.map((area) => (
                <area
                  key={area.id}
                  alt={area.title}
                  title={area.title}
                  coords={area.coords}
                  shape={area.shape}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAreaClick(area);
                  }}
                  className="cursor-pointer"
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </map>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Click on any highlighted area on the map to view details
          </p>
        </div>

        {/* Modal */}
        {modalOpen && selectedArea && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedArea.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-light leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <Image
                  src={selectedArea.image} 
                  alt={selectedArea.title}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-gray-700 text-lg">
                  {selectedArea.description}
                </p>
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

