"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Assets */
import dholeraMap from "@/app/assets/dholera-map-with-icons.webp";
import dholeraMapM from "@/app/assets/dholera-map-mobile.webp";
import metro from "@/app/assets/metro.webp";
import abcd from "@/app/assets/abcd-building.webp";
import dia from "@/app/assets/dholera-international-airport.webp";
import expressway from "@/app/assets/expressway.webp";
import renew from "@/app/assets/ReNew-power.webp";
import solarPark from "@/app/assets/solar-park.webp";
import tata from "@/app/assets/tata-semicon.webp";

export default function InteractiveMap() {
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);

  /* 🧭 Detect mobile */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 📍 Exact pixel coordinates based on 1080x1080 (desktop) and 400x400 (mobile) */
  const desktopAreas = [
    { id: "metro", title: "MonoRail", coords: [580, 80, 630, 130], image: metro, description: "Dholera MonoRail System" },
    { id: "airport", title: "Dholera International Airport", coords: [780, 150, 830, 200], image: dia, description: "International Airport Project" },
    { id: "expressway", title: "Expressway", coords: [560, 220, 610, 270], image: expressway, description: "Dholera Expressway" },
    { id: "abcd", title: "ABCD Building", coords: [400, 400, 450, 450], image: abcd, description: "ABCD Building Complex" },
    { id: "tata", title: "Tata Semicon", coords: [450, 460, 500, 510], image: tata, description: "Tata Semiconductor Facility" },
    { id: "renew", title: "ReNew Power", coords: [500, 480, 550, 530], image: renew, description: "ReNew Power Plant" },
    { id: "solar", title: "Solar Park", coords: [620, 720, 670, 770], image: solarPark, description: "Solar Energy Park" },
  ];

  const mobileAreas = [
    { id: "abcd", title: "ABCD Building", coords: [160, 140, 190, 170], image: abcd, description: "ABCD Building Complex" },
    { id: "metro", title: "MonoRail", coords: [220, 30, 250, 60], image: metro, description: "Dholera MonoRail System" },
    { id: "airport", title: "Dholera International Airport", coords: [290, 55, 320, 85], image: dia, description: "International Airport Project" },
    { id: "expressway", title: "Expressway", coords: [210, 85, 240, 115], image: expressway, description: "Dholera Expressway" },
    { id: "tata", title: "Tata Semicon", coords: [170, 165, 200, 195], image: tata, description: "Tata Semiconductor Facility" },
    { id: "renew", title: "ReNew Power", coords: [190, 175, 220, 205], image: renew, description: "ReNew Power Plant" },
    { id: "solar", title: "Solar Park", coords: [240, 260, 270, 290], image: solarPark, description: "Solar Energy Park" },
  ];

  const areas = isMobile ? mobileAreas : desktopAreas;

  /* 🧠 Calculate position for modal */
  const handleAreaClick = (area, e) => {
    if (!imageRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const imgRect = imageRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Get natural image dimensions
    const naturalWidth = isMobile ? 400 : 1080;
    const naturalHeight = isMobile ? 400 : 1080;
    
    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;

    const [x1, y1, x2, y2] = area.coords;
    const centerX = ((x1 + x2) / 2) * scaleX;
    const centerY = ((y1 + y2) / 2) * scaleY;

    const modalWidth = Math.min(350, window.innerWidth - 40);
    const modalHeight = 400;

    let left = imgRect.left + centerX - modalWidth / 2 + scrollX;
    let top = imgRect.top + centerY + 20 + scrollY;

    // Boundary checks
    const margin = 20;
    if (left < margin + scrollX) left = margin + scrollX;
    if (left + modalWidth > window.innerWidth + scrollX - margin) {
      left = window.innerWidth + scrollX - modalWidth - margin;
    }
    if (top + modalHeight > window.innerHeight + scrollY - margin) {
      top = imgRect.top + centerY - modalHeight - 20 + scrollY;
    }
    if (top < margin + scrollY) top = scrollY + margin;

    setModalPosition({ x: left, y: top });
    setSelectedArea(area);
    setModalOpen(true);
  };

  /* 🎯 Render clickable areas */
  const renderAreas = () => {
    if (!imageRef.current || !imageLoaded) return null;

    const imgRect = imageRef.current.getBoundingClientRect();
    const naturalWidth = isMobile ? 400 : 1080;
    const naturalHeight = isMobile ? 400 : 1080;
    
    const scaleX = imgRect.width / naturalWidth;
    const scaleY = imgRect.height / naturalHeight;

    return areas.map((area) => {
      const [x1, y1, x2, y2] = area.coords;
      
      const left = x1 * scaleX;
      const top = y1 * scaleY;
      const width = (x2 - x1) * scaleX;
      const height = (y2 - y1) * scaleY;

      // Skip rendering if area is too small
      if (width <= 2 || height <= 2) return null;

      return (
        <button
          key={area.id}
          onClick={(e) => handleAreaClick(area, e)}
          className="absolute  transition-all duration-200 "
          style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${width}px`,
            height: `${height}px`,
            minWidth: "12px",
            minHeight: "12px",
          }}
          aria-label={area.title}
          title={area.title}
        >
          
        </button>
      );
    });
  };

  /* 🪄 Auto close modal on click outside */
  useEffect(() => {
    const handleOutside = (e) => {
      if (modalOpen && !e.target.closest(".modal-content") && !e.target.closest("button[aria-label]")) {
        setModalOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [modalOpen]);

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Interactive Dholera Map
      </h1>

      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl bg-white">
        <div className="relative w-full aspect-square max-w-4xl mx-auto">
          <Image
            ref={imageRef}
            src={isMobile ? dholeraMapM : dholeraMap}
            alt="Dholera Map"
            fill
            priority
            className="object-contain select-none"
            onLoad={() => setImageLoaded(true)}
            onLoadingComplete={() => setImageLoaded(true)}
            draggable={false}
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* 🔵 Clickable Areas */}
          {imageLoaded && (
            <div className="absolute inset-0">
              {renderAreas()}
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-center mt-6 text-lg">
        {isMobile ? "Tap" : "Click"} on highlighted areas to explore details.
      </p>

      {/* 🧩 Animated Modal */}
      <AnimatePresence>
        {modalOpen && selectedArea && (
          <>
            <motion.div
              className="fixed inset-0 bg-transparent bg-opacity-60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              className="fixed z-50 bg-white rounded-xl shadow-2xl modal-content overflow-hidden border-2 border-gray-200"
              style={{
                left: `${modalPosition.x}px`,
                top: `${modalPosition.y}px`,
                width: "350px",
                maxWidth: "calc(100vw - 40px)",
              }}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
                <h2 className="text-xl font-bold text-gray-800">{selectedArea.title}</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-red-500 text-2xl font-light leading-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="p-5">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={selectedArea.image}
                    alt={selectedArea.title}
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                </div>
                <p className="text-gray-700 text-base leading-relaxed">{selectedArea.description}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}