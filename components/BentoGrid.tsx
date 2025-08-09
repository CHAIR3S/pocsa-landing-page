"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

  // LIGHTBOX
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (line: ProductLine) => {
    setSelectedLine(line);
    setLightboxOpen(false);
    setCurrentIndex(0);
  };
  const closeGallery = () => {
    setSelectedLine(null);
    setLightboxOpen(false);
  };

  const openLightbox = (idx: number) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const nextImg = useCallback(() => {
    if (!selectedLine) return;
    setCurrentIndex((i) => (i + 1) % selectedLine.sampleImages.length);
  }, [selectedLine]);

  const prevImg = useCallback(() => {
    if (!selectedLine) return;
    setCurrentIndex((i) => (i - 1 + selectedLine.sampleImages.length) % selectedLine.sampleImages.length);
  }, [selectedLine]);

  // Teclado en lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, nextImg, prevImg]);

  // Tu animación gsap
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });
    tl.fromTo(
      imageRef.current,
      { backgroundPosition: "center 50%" },
      { backgroundPosition: "center 20%", ease: "none", duration: 0.5 }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen mb-[10vh]">
      <div className="max-w-[80%] mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-12 grid-rows-8 gap-4 h-[800px]">
          {/* Línea Metálica - Large */}
          <div
  className="col-span-6 row-span-4 rounded-2xl cursor-pointer 
              transition-shadow duration-300 
             hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] 
             relative overflow-hidden group"
            ref={imageRef}
            onClick={() => openGallery(productLines[0])}
            style={{
              backgroundImage: `url(${productLines[0].image || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }} />
            <div
              className="absolute bottom-6 left-6 right-6 rounded-xl p-4 shadow-lg backdrop-blur-md"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.20)", border: "1px solid rgba(255, 255, 255, 0.30)" }}
            >
              <span className="text-sm font-medium text-white opacity-90 block mb-1">
                {productLines[0].category}
              </span>
              <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{productLines[0].title}</h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.90)", color: "#111" }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea de Almacenamiento - Medium */}
          <div
            className="col-span-3 row-span-4 rounded-2xl cursor-pointer  hover:scale-[1.02] relative overflow-hidden 
             transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            onClick={() => openGallery(productLines[1])}
            style={{
              backgroundImage: `url(${productLines[1].image || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(0,0,0,0.20)" }} />
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-3 shadow-lg backdrop-blur-md"
              style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
            >
              <span className="text-xs font-medium text-white block mb-1" style={{ opacity: 0.9 }}>
                {productLines[1].category}
              </span>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">{productLines[1].title}</h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md text-xs px-3 py-1 cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.90)", color: "#111" }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea Escolar - Medium */}
          <div
            className="col-span-3 row-span-4 rounded-2xl cursor-pointer  hover:scale-[1.02] relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            onClick={() => openGallery(productLines[2])}
            style={{
              backgroundImage: `url(${productLines[2].image || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(0,0,0,0.20)" }} />
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-3 shadow-lg backdrop-blur-md"
              style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
            >
              <span className="text-xs font-medium text-white block mb-1" style={{ opacity: 0.9 }}>
                {productLines[2].category}
              </span>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">{productLines[2].title}</h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md text-xs px-3 py-1 cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.90)", color: "#111" }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea para el Hogar - Medium */}
          <div
            className="col-span-4 row-span-4 rounded-2xl cursor-pointer  hover:scale-[1.02] relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            onClick={() => openGallery(productLines[3])}
            style={{
              backgroundImage: `url(${productLines[3].image || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(0,0,0,0.20)" }} />
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl p-4 shadow-lg backdrop-blur-md"
              style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
            >
              <span className="text-sm font-medium text-white block mb-1" style={{ opacity: 0.9 }}>
                {productLines[3].category}
              </span>
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">{productLines[3].title}</h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.90)", color: "#111" }}
              >
                Ver Galería
              </Button>
            </div>
          </div>

          {/* Línea de Oficina - Small */}
          <div
            className="col-span-8 row-span-4 rounded-2xl cursor-pointer hover:scale-[1.02] relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            onClick={() => openGallery(productLines[4])}
            style={{
              backgroundImage: `url(${productLines[4].image || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(0,0,0,0.20)" }} />
            <div
              className="absolute bottom-4 left-4 rounded-xl p-4 shadow-lg backdrop-blur-md max-w-md"
              style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
            >
              <span className="text-sm font-medium text-white block mb-1" style={{ opacity: 0.9 }}>
                {productLines[4].category}
              </span>
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">{productLines[4].title}</h2>
              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.90)", color: "#111" }}
              >
                Ver Galería
              </Button>
            </div>
          </div>
        </div>
      </div>

{/* ======= MODAL DE GALERÍA (centrado, NO fullscreen, scroll bonito) ======= */}
{selectedLine && (
  <div
    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    onClick={closeGallery}
  >
    {/* Contenedor del modal */}
    <div
      className="relative w-[min(1100px,95vw)] max-h-[85vh] bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-900/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{selectedLine.title}</h2>
          <p className="text-sm text-gray-300">{selectedLine.category}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeGallery}
          className="text-white hover:bg-white/10"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Contenido scrolleable con scroll estilizado */}
      <div className="overflow-y-auto max-h-[calc(85vh-72px)] px-4 pb-4 styled-scrollbar">
        {/* Grid más angosto */}
        <div className="mx-auto max-w-5xl px-2">
          <div className="masonry-container">
            <style jsx>{`
              /* Masonry */
              .masonry-container { column-count: 2; column-gap: .75rem; }
              @media (min-width: 768px) { .masonry-container { column-count: 3; } }
              @media (min-width: 1024px){ .masonry-container { column-count: 4; } }

              .masonry-item { break-inside: avoid; margin-bottom: .75rem; display: inline-block; width: 100%; opacity: 0; animation: fadeIn .5s ease forwards; }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
              .masonry-item img { width: 100%; height: auto; border-radius: .5rem; box-shadow: 0 4px 10px rgba(0,0,0,.25); transition: transform .25s ease, box-shadow .25s ease; cursor: zoom-in; }
              .masonry-item img:hover { transform: scale(1.015); box-shadow: 0 10px 20px rgba(0,0,0,.35); }

              /* Scroll bonito solo para este modal */
              .styled-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .styled-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .styled-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.4);
                border-radius: 9999px;
              }
              .styled-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.6);
              }
            `}</style>

            {selectedLine.sampleImages.map((image, index) => (
              <div key={index} className="masonry-item">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${selectedLine.title} ${index + 1}`}
                  loading="lazy"
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}



      {/* ======= LIGHTBOX ======= */}
      {selectedLine && lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center">
          {/* Cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={prevImg}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Imagen */}
          <div className="max-w-[90vw] max-h-[85vh]">
            <img
              src={selectedLine.sampleImages[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
            <div className="mt-3 text-center text-sm text-white/70">
              {currentIndex + 1} / {selectedLine.sampleImages.length}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextImg}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Click fuera para cerrar */}
          <div
            className="absolute inset-0"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button, img")) return;
              closeLightbox();
            }}
          />
        </div>
      )}
    </div>
  );
}
