"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductLine {
  id: string;
  title: string;
  category: string;
  image: string;
  bgColor: string;
  textColor: string;
  size: "large" | "medium" | "small";
  sampleImages: string[];
}


const productLines: ProductLine[] = [
  {
    id: "metallic",
    title: "Línea Metálica",
    category: "ESTRUCTURA",
    image: "/images/linea-metalica-portada.jpg",
    bgColor: "bg-slate-800",
    textColor: "text-white",
    size: "large",
    sampleImages: [
      "/images/grid/almacenamiento-mueble.jpg",
      "/images/grid/almacenamiento.jpg",
      "/images/grid/banca.jpg",
      "/images/grid/bancas-butacas.jpg",
      "/images/grid/cocina-2.jpg",
      "/images/grid/cocina-integral.jpg",
      "/images/grid/escritorio-de-oficina.jpg",
      "/images/grid/escritorios.jpg",
      "/images/grid/escritorio-2.jpg",
      "/images/grid/psicologo-centro.jpg",
    ],
  },
  {
    id: "storage",
    title: "Línea de Almacenamiento",
    category: "ORGANIZACIÓN",
    image: "/images/linea-almacenamiento-portada.jpg",
    bgColor: "bg-blue-400",
    textColor: "text-white",
    size: "medium",
    sampleImages: [
      "/images/grid/almacenamiento-mueble.jpg",
      "/images/grid/almacenamiento.jpg",
      "/images/grid/banca.jpg",
      "/images/grid/bancas-butacas.jpg",
      "/images/grid/cocina-2.jpg",
      "/images/grid/cocina-integral.jpg",
      "/images/grid/escritorio-de-oficina.jpg",
      "/images/grid/escritorios.jpg",
      "/images/grid/escritorio-2.jpg",
      "/images/grid/psicologo-centro.jpg",
    ],
  },
  {
    id: "school",
    title: "Línea Escolar",
    category: "EDUCACIÓN",
    image: "/images/linea-escolar-portada-3.jpg",
    bgColor: "bg-orange-400",
    textColor: "text-white",
    size: "medium",
    sampleImages: [
      "/images/grid/almacenamiento-mueble.jpg",
      "/images/grid/almacenamiento.jpg",
      "/images/grid/banca.jpg",
      "/images/grid/bancas-butacas.jpg",
      "/images/grid/cocina-2.jpg",
      "/images/grid/cocina-integral.jpg",
      "/images/grid/escritorio-de-oficina.jpg",
      "/images/grid/escritorios.jpg",
      "/images/grid/escritorio-2.jpg",
      "/images/grid/psicologo-centro.jpg",
    ],
  },
  {
    id: "home",
    title: "Línea para el Hogar",
    category: "HOGAR",
    image: "/images/linea-hogar-portada.jpg",
    bgColor: "bg-amber-200",
    textColor: "text-gray-800",
    size: "medium",
    sampleImages: [
      "/images/grid/almacenamiento-mueble.jpg",
      "/images/grid/almacenamiento.jpg",
      "/images/grid/banca.jpg",
      "/images/grid/bancas-butacas.jpg",
      "/images/grid/cocina-2.jpg",
      "/images/grid/cocina-integral.jpg",
      "/images/grid/escritorio-de-oficina.jpg",
      "/images/grid/escritorios.jpg",
      "/images/grid/escritorio-2.jpg",
      "/images/grid/psicologo-centro.jpg",
    ],
  },
  {
    id: "office",
    title: "Línea de Oficina",
    category: "TRABAJO",
    image: "/images/linea-oficina-portada.jpg",
    bgColor: "bg-rose-300",
    textColor: "text-gray-800",
    size: "small",
    sampleImages: [
      "/images/grid/almacenamiento-mueble.jpg",
      "/images/grid/almacenamiento.jpg",
      "/images/grid/banca.jpg",
      "/images/grid/bancas-butacas.jpg",
      "/images/grid/cocina-2.jpg",
      "/images/grid/cocina-integral.jpg",
      "/images/grid/escritorio-de-oficina.jpg",
      "/images/grid/escritorios.jpg",
      "/images/grid/escritorio-2.jpg",
      "/images/grid/psicologo-centro.jpg",
    ],
  },
];

export default function BentoGrid() {
  const [selectedLine, setSelectedLine] = useState<ProductLine | null>(null);

  useEffect(() => {
  const elements = gsap.utils.toArray(".bento-tile");

  elements.forEach((tile) => {
    gsap.fromTo(
      tile,
      { y: 0 },
      {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: tile,
          start: "top bottom", // cuando entra
          end: "bottom top",   // cuando sale
          scrub: true,
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);


  const openGallery = (line: ProductLine) => {
    setSelectedLine(line);
  };

  const closeGallery = () => {
    setSelectedLine(null);
  };

  return (
    <div className="min-h-screen mb-[10vh]">
      <div className="max-w-[80%] mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-12 grid-rows-8 gap-4 h-[800px]">
          {/* Línea Metálica - Large */}
          <div
            className="bento-tile col-span-6 row-span-4 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden group"
            onClick={() => openGallery(productLines[0])}
            style={{
              backgroundImage: `url(${
                productLines[0].image || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Dark overlay for better text readability */}
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.20)",
              }}
            />

            {/* Glass effect container */}
            <div
              className="absolute bottom-6 left-6 right-6 rounded-xl p-4 shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.20)",
                border: "1px solid rgba(255, 255, 255, 0.30)",
              }}
            >
              <span className="text-sm font-medium text-white opacity-90 block mb-1">
                {productLines[0].category}
              </span>
              <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                {productLines[0].title}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.90)",
                  color: "#111",
                }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea de Almacenamiento - Medium */}
          <div
            className="col-span-3 row-span-4 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden"
            onClick={() => openGallery(productLines[1])}
            style={{
              backgroundImage: `url(${
                productLines[1].image || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.20)" }}
            />

            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-3 shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.30)",
              }}
            >
              <span
                className="text-xs font-medium text-white block mb-1"
                style={{ opacity: 0.9 }}
              >
                {productLines[1].category}
              </span>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                {productLines[1].title}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md text-xs px-3 py-1 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.90)",
                  color: "#111",
                }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea Escolar - Medium */}
          <div
            className="col-span-3 row-span-4 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden"
            onClick={() => openGallery(productLines[2])}
            style={{
              backgroundImage: `url(${
                productLines[2].image || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.20)" }}
            />

            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-3 shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.30)",
              }}
            >
              <span
                className="text-xs font-medium text-white block mb-1"
                style={{ opacity: 0.9 }}
              >
                {productLines[2].category}
              </span>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                {productLines[2].title}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md text-xs px-3 py-1 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.90)",
                  color: "#111",
                }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea para el Hogar - Medium */}
          <div
            className="col-span-4 row-span-4 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden"
            onClick={() => openGallery(productLines[3])}
            style={{
              backgroundImage: `url(${
                productLines[3].image || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.20)" }}
            />

            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-4 shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.30)",
              }}
            >
              <span
                className="text-sm font-medium text-white block mb-1"
                style={{ opacity: 0.9 }}
              >
                {productLines[3].category}
              </span>
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                {productLines[3].title}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.90)",
                  color: "#111",
                }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea de Oficina - Small */}
          <div
            className="col-span-8 row-span-4 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] relative overflow-hidden"
            onClick={() => openGallery(productLines[4])}
            style={{
              backgroundImage: `url(${
                productLines[4].image || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.20)" }}
            />

            <div
              className="absolute bottom-4 left-4 rounded-xl p-4 shadow-lg backdrop-blur-md max-w-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.30)",
              }}
            >
              <span
                className="text-sm font-medium text-white block mb-1"
                style={{ opacity: 0.9 }}
              >
                {productLines[4].category}
              </span>
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                {productLines[4].title}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.90)",
                  color: "#111",
                }}
              >
                Ver Galería
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {selectedLine && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="min-h-screen p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedLine.title}
                </h2>
                <p className="text-gray-300">{selectedLine.category}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeGallery}
                className="text-white hover:bg-white hover:bg-opacity-20 cursor-pointer "
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Pinterest-style Masonry Grid */}
            <div className="masonry-container">
              <style jsx>{`
                .masonry-container {
                  column-count: 2;
                  column-gap: 1rem;
                }

                @media (min-width: 768px) {
                  .masonry-container {
                    column-count: 3;
                  }
                }

                @media (min-width: 1024px) {
                  .masonry-container {
                    column-count: 4;
                  }
                }

                @media (min-width: 1280px) {
                  .masonry-container {
                    column-count: 5;
                  }
                }

                @media (min-width: 1536px) {
                  .masonry-container {
                    column-count: 6;
                  }
                }

                .masonry-item {
                  break-inside: avoid;
                  margin-bottom: 1rem;
                  display: inline-block;
                  width: 100%;
                  opacity: 0;
                  animation: fadeIn 0.6s ease forwards;
                }

                .masonry-item:nth-child(1) {
                  animation-delay: 0.1s;
                }
                .masonry-item:nth-child(2) {
                  animation-delay: 0.2s;
                }
                .masonry-item:nth-child(3) {
                  animation-delay: 0.3s;
                }
                .masonry-item:nth-child(4) {
                  animation-delay: 0.4s;
                }
                .masonry-item:nth-child(5) {
                  animation-delay: 0.5s;
                }
                .masonry-item:nth-child(6) {
                  animation-delay: 0.6s;
                }
                .masonry-item:nth-child(7) {
                  animation-delay: 0.7s;
                }
                .masonry-item:nth-child(8) {
                  animation-delay: 0.8s;
                }
                .masonry-item:nth-child(9) {
                  animation-delay: 0.9s;
                }
                .masonry-item:nth-child(10) {
                  animation-delay: 1s;
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .masonry-item img {
                  width: 100%;
                  height: auto;
                  border-radius: 0.5rem;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                  cursor: pointer;
                }

                .masonry-item img:hover {
                  transform: scale(1.02);
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
                }
              `}</style>

              {selectedLine.sampleImages.map((image, index) => (
                <div key={index} className="masonry-item">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${selectedLine.title} ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeGallery} />
        </div>
      )}
    </div>
  );
}
