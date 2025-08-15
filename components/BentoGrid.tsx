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
    id: "islas",
    title: "Islas",
    category: "ISLAS",
    image: "/images/grid/cover/islas-cover.webp",
    bgColor: "bg-slate-800",
    textColor: "text-white",
    size: "large",
    sampleImages: [
      "/images/grid/islas/isla-1.webp",
      "/images/grid/islas/isla-2.webp",
      "/images/grid/islas/isla-3.webp",
      "/images/grid/islas/isla-4.webp",
      "/images/grid/islas/isla-5.webp",
      "/images/grid/islas/isla-6.jpg",
      "/images/grid/islas/isla-8.jpg",
      "/images/grid/islas/isla-10.webp",
    ],
  },
  {
    id: "escolar",
    title: "Escolar",
    category: "EDUCACIÓN",
    image: "/images/grid/cover/escolar-cover.webp",
    bgColor: "bg-orange-400",
    textColor: "text-white",
    size: "medium",
    sampleImages: [
      "/images/grid/escolar/butacas.webp",
      "/images/grid/escolar/escolar-1.webp",
      "/images/grid/escolar/escolar-2.webp",
      "/images/grid/escolar/escolar-3.webp",
      "/images/grid/escolar/escolar-4.webp",
      "/images/grid/escolar/escolar-5.webp",
      "/images/grid/escolar/escolar-6.webp",
      "/images/grid/escolar/escolar-7.webp",
      "/images/grid/escolar/escolar-8.webp",
      "/images/grid/escolar/escolar-9.webp",
      "/images/grid/escolar/escolar-10.webp",
      "/images/grid/escolar/escolar-11.webp",
      "/images/grid/escolar/escolar-12.webp",
      "/images/grid/escolar/escolar-14.webp",
      "/images/grid/escolar/escolar-17.webp",
      "/images/grid/escolar/escolar-18.webp",
    ],
  },
  {
    id: "hogar",
    title: "Hogar",
    category: "HOGAR",
    image: "/images/grid/cover/hogar-cover.webp",
    bgColor: "bg-amber-200",
    textColor: "text-gray-800",
    size: "medium",
    sampleImages: [
      "/images/grid/hogar/hogar-1.webp",
      "/images/grid/hogar/hogar-2.webp",
      "/images/grid/hogar/hogar-3.webp",
      "/images/grid/hogar/hogar-4.webp",
      "/images/grid/hogar/hogar-5.webp",
      "/images/grid/hogar/hogar-6.webp",
      "/images/grid/hogar/hogar-7.webp",
      "/images/grid/hogar/hogar-8.webp",
      "/images/grid/hogar/hogar-9.webp",
      "/images/grid/hogar/hogar-10.webp",
      "/images/grid/hogar/hogar-11.webp",
      "/images/grid/hogar/hogar-12.webp",
    ],
  },
  {
    id: "modulos",
    title: "Módulos Ejecutivos",
    category: "OFICINA",
    image: "/images/grid/cover/modulo-ejecutivo-cover.webp",
    bgColor: "bg-rose-300",
    textColor: "text-gray-800",
    size: "medium",
    sampleImages: [
      "/images/grid/modulos-ejecutivos/modulos-1.webp",
      "/images/grid/modulos-ejecutivos/modulos-2.webp",
      "/images/grid/modulos-ejecutivos/modulos-3.webp",
      "/images/grid/modulos-ejecutivos/modulos-5.webp",
      "/images/grid/modulos-ejecutivos/modulos-6.webp",
      "/images/grid/modulos-ejecutivos/modulos-7.webp",
      "/images/grid/modulos-ejecutivos/modulos-8.webp",
      "/images/grid/modulos-ejecutivos/modulos-9.webp",
      "/images/grid/modulos-ejecutivos/modulos-11.webp",
    ],
  },
  {
    id: "mesas",
    title: "Mesas de Juntas",
    category: "REUNIONES",
    image: "/images/grid/cover/mesa-juntas-cover.webp",
    bgColor: "bg-blue-400",
    textColor: "text-white",
    size: "medium",
    sampleImages: [
      "/images/grid/mesa-junta/mesa-1.webp",
      "/images/grid/mesa-junta/mesa-2.webp",
      "/images/grid/mesa-junta/mesa-3.webp",
      "/images/grid/mesa-junta/mesa-4.webp",
      "/images/grid/mesa-junta/mesa-5.webp",
      "/images/grid/mesa-junta/mesa-6.webp",
      "/images/grid/mesa-junta/mesa-7.webp",
      "/images/grid/mesa-junta/mesa-8.webp",
      "/images/grid/mesa-junta/mesa-9.webp",
    ],
  },
  {
    id: "recepciones",
    title: "Recepciones",
    category: "BIENVENIDA",
    image: "/images/grid/cover/recepcion-cover.webp",
    bgColor: "bg-slate-700",
    textColor: "text-white",
    size: "medium",
    sampleImages: [
      "/images/grid/recepcion/recepcion-1.webp",
      "/images/grid/recepcion/recepcion-2.webp",
      "/images/grid/recepcion/recepcion-3.webp",
      "/images/grid/recepcion/recepcion-4.webp",
      "/images/grid/recepcion/recepcion-5.webp",
      "/images/grid/recepcion/recepcion-6.webp",
      "/images/grid/recepcion/recepcion-7.webp",
      "/images/grid/recepcion/recepcion-8.webp",
      "/images/grid/recepcion/recepcion-9.webp",
    ],
  },
];

// ===================== UTILIDADES =====================
const imgCache = new Set<string>();

function preloadImage(url: string) {
  if (imgCache.has(url)) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imgCache.add(url);
      resolve();
    };
    img.onerror = reject;
    img.decoding = "async";
    (img as any).fetchPriority = "low";
    img.src = url;
  });
}

function preloadImages(urls: string[]) {
  return Promise.all(urls.map(preloadImage));
}

function lockBodyScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }
  document.documentElement.classList.add("modal-open");
}
function unlockBodyScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.documentElement.classList.remove("modal-open");
}
// ======================================================

export default function BentoGrid() {
  const [selectedLine, setSelectedLine] = useState<ProductLine | null>(null);

  // LIGHTBOX
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opening, setOpening] = useState(false); // spinner al abrir galería

  const openGallery = async (line: ProductLine) => {
    try {
      setOpening(true);
      await preloadImages([line.image, ...line.sampleImages]);
      setSelectedLine(line);
      setCurrentIndex(0);
    } finally {
      setOpening(false);
    }
  };
  const closeGallery = () => {
    setSelectedLine(null);
    setLightboxOpen(false);
  };

  const openLightbox = (idx: number) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImg = useCallback(() => {
    if (!selectedLine) return;
    setCurrentIndex((i) => (i + 1) % selectedLine.sampleImages.length);
  }, [selectedLine]);

  const prevImg = useCallback(() => {
    if (!selectedLine) return;
    setCurrentIndex((i) => (i - 1 + selectedLine.sampleImages.length) % selectedLine.sampleImages.length);
  }, [selectedLine]);

  // Teclado en lightbox (← → Esc)
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

  // Parallax suave para el hero (Islas)
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.fromTo(heroRef.current, { backgroundPosition: "center 50%" }, { backgroundPosition: "center 20%", ease: "none", duration: 0.5 });
  }, []);

  // Precarga global al montar (covers + galerías)
  useEffect(() => {
    const all = productLines.flatMap((l) => [l.image, ...l.sampleImages]);
    const run = () => {
      preloadImages(all).catch(() => {});
    };
    if (typeof (window as any).requestIdleCallback === "function") {
      (window as any).requestIdleCallback(run);
    } else {
      setTimeout(run, 0);
    }
  }, []);

  // Lock body scroll cuando haya modal o lightbox abiertos
  useEffect(() => {
    const shouldLock = !!selectedLine || !!lightboxOpen;
    if (shouldLock) lockBodyScroll();
    else unlockBodyScroll();
    return () => unlockBodyScroll();
  }, [selectedLine, lightboxOpen]);

  return (
    <div className="min-h-screen mb-[10vh]">



      {/* overlay mientras abre galería */}
      {opening && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-white text-sm">Cargando galería…</div>
        </div>
      )}

      <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-4">
        {/* ===== Bento (12 cols XL / 6 cols MD / 1 col SM) ===== */}
        <div
          className="
            grid grid-flow-dense gap-4
            grid-cols-1
            md:grid-cols-6
            xl:grid-cols-12
            auto-rows-[140px] md:auto-rows-[170px] xl:auto-rows-[180px]
          "
        >
          {/* Banda 1-2 Izquierda: ISLAS (grande) */}
          <div
            ref={heroRef}
            className="
              relative overflow-hidden group rounded-2xl cursor-pointer
              transition-transform duration-300 hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
              md:col-span-6 md:row-span-3
              xl:col-start-1 xl:col-span-7 xl:row-start-1 xl:row-span-4
            "
            onClick={() => openGallery(productLines[0])}
            onMouseEnter={() => preloadImages([productLines[0].image, ...productLines[0].sampleImages])}
            style={{
              backgroundImage: `url(${productLines[0].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <InfoCard item={productLines[0]} />
          </div>

          {/* Banda 1 Derecha Arriba: ESCOLAR */}
          <Tile
            item={productLines[1]}
            className="
              md:col-span-6 md:row-span-2
              xl:col-start-8 xl:col-span-5 xl:row-start-1 xl:row-span-2
            "
            onClick={() => openGallery(productLines[1])}
            onPreload={() => preloadImages([productLines[1].image, ...productLines[1].sampleImages])}
          />

          {/* Banda 2 Derecha: HOGAR */}
          <Tile
            item={productLines[2]}
            className="
              md:col-span-6 md:row-span-2
              xl:col-start-8 xl:col-span-5 xl:row-start-3 xl:row-span-2
            "
            onClick={() => openGallery(productLines[2])}
            onPreload={() => preloadImages([productLines[2].image, ...productLines[2].sampleImages])}
          />

          {/* ===== Banda 3 ===== */}
          <Tile
            item={productLines[3]}
            className="
              md:col-span-6 md:row-span-2
              xl:col-start-1 xl:col-span-4 xl:row-start-5 xl:row-span-2
            "
            onClick={() => openGallery(productLines[3])}
            onPreload={() => preloadImages([productLines[3].image, ...productLines[3].sampleImages])}
          />

          <Tile
            item={productLines[4]} // Mesas
            className="
              md:col-span-6 md:row-span-2
              xl:col-start-5 xl:col-span-4 xl:row-start-5 xl:row-span-2
            "
            onClick={() => openGallery(productLines[4])}
            onPreload={() => preloadImages([productLines[4].image, ...productLines[4].sampleImages])}
          />
          <Tile
            item={productLines[5]} // Recepciones
            className="
              md:col-span-6 md:row-span-2
              xl:col-start-9 xl:col-span-4 xl:row-start-5 xl:row-span-2
            "
            onClick={() => openGallery(productLines[5])}
            onPreload={() => preloadImages([productLines[5].image, ...productLines[5].sampleImages])}
          />
        </div>
      </div>

      {/* ======= MODAL DE GALERÍA ======= */}
      {selectedLine && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={closeGallery} // click fuera cierra
        >
          <div
            className="relative w-[min(1100px,95vw)] max-h-[85vh] bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // evita cierre al click dentro
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-neutral-900/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{selectedLine.title}</h2>
                <p className="text-sm text-gray-300">{selectedLine.category}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeGallery} className="text-white hover:bg-white/10" aria-label="Cerrar">
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Contenido scrolleable */}
            <div className="overflow-y-auto max-h-[calc(85vh-72px)] px-4 pb-4 scrollbar-sleek">
              <div className="mx-auto max-w-5xl px-2">
                <div className="masonry-container">
                  <style jsx>{`
                    .masonry-container {
                      column-count: 2;
                      column-gap: 0.75rem;
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
                    .masonry-item {
                      break-inside: avoid;
                      margin-bottom: 0.75rem;
                      display: inline-block;
                      width: 100%;
                      opacity: 0;
                      animation: fadeIn 0.5s ease forwards;
                    }
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                        transform: translateY(12px);
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
                      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
                      transition: transform 0.25s ease, box-shadow 0.25s ease;
                      cursor: zoom-in;
                    }
                    .masonry-item img:hover {
                      transform: scale(1.015);
                      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
                    }
                  `}</style>

                  {selectedLine.sampleImages.map((image, index) => (
                    <div key={index} className="masonry-item">
                      <img
                        src={image}
                        alt={`${selectedLine.title} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
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
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <div
            className="relative"
            style={{ width: "min(1100px, 95vw)", height: "min(760px, 85vh)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen en marco fijo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={selectedLine.sampleImages[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                className="rounded-lg shadow-2xl"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                decoding="async"
              />
            </div>

            {/* Prev */}
            <button
              onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next */}
            <button
              onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Paginador */}
            <div className="absolute bottom-3 inset-x-0 text-center text-sm text-white/70">
              {currentIndex + 1} / {selectedLine.sampleImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Subcomponentes ===== */
function InfoCard({ item }: { item: ProductLine }) {
  return (
    <div
      className="absolute bottom-6 left-6 right-6 rounded-xl p-4 shadow-lg backdrop-blur-md"
      style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
    >
      <span className="text-sm font-medium text-white opacity-90 block mb-1">{item.category}</span>
      <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{item.title}</h2>
      <Button
        variant="secondary"
        size="sm"
        className="backdrop-blur-sm border-0 shadow-md cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.90)", color: "#111" }}
      >
        Ver Galería
      </Button>
    </div>
  );
}

function Tile({
  item,
  className,
  onClick,
  onPreload,
}: {
  item: ProductLine;
  className?: string;
  onClick?: () => void;
  onPreload?: () => void;
}) {
  return (
    <div
      className={`
        relative overflow-hidden group rounded-2xl cursor-pointer
        transition-transform duration-300 hover:scale-[1.02]
        hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
        ${className || ""}
      `}
      onClick={onClick}
      onMouseEnter={onPreload}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute bottom-4 left-4 right-4 rounded-xl p-4 shadow-lg backdrop-blur-md"
        style={{ backgroundColor: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.30)" }}
      >
        <span className="text-sm font-medium text-white block mb-1 opacity-90">{item.category}</span>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
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
  );
}
