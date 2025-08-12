"use client";

import { useRef, useState, useMemo, useCallback, useLayoutEffect, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Plus } from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false }) as any;

const PAGES = [
  "/pdfs/catalog/catalogo-pocsa_00001.webp",
  "/pdfs/catalog/catalogo-pocsa_00002.webp",
  "/pdfs/catalog/catalogo-pocsa_00003.webp",
  "/pdfs/catalog/catalogo-pocsa_00004.webp",
  "/pdfs/catalog/catalogo-pocsa_00005.webp",
  "/pdfs/catalog/catalogo-pocsa_00006.webp",
  "/pdfs/catalog/catalogo-pocsa_00007.webp",
  "/pdfs/catalog/catalogo-pocsa_00008.webp",
  "/pdfs/catalog/catalogo-pocsa_00009.webp",
  "/pdfs/catalog/catalogo-pocsa_00010.webp",
  "/pdfs/catalog/catalogo-pocsa_00011.webp",
  "/pdfs/catalog/catalogo-pocsa_00012.webp",
  "/pdfs/catalog/catalogo-pocsa_00013.webp",
  "/pdfs/catalog/catalogo-pocsa_00014.webp",
  "/pdfs/catalog/catalogo-pocsa_00015.webp",
  "/pdfs/catalog/catalogo-pocsa_00016.webp",
  "/pdfs/catalog/catalogo-pocsa_00017.webp",
  "/pdfs/catalog/catalogo-pocsa_00018.webp",
  "/pdfs/catalog/catalogo-pocsa_00019.webp",
  "/pdfs/catalog/catalogo-pocsa_00020.webp",
  "/pdfs/catalog/catalogo-pocsa_00021.webp",
  "/pdfs/catalog/catalogo-pocsa_00022.webp",
  "/pdfs/catalog/catalogo-pocsa_00023.webp",
  "/pdfs/catalog/catalogo-pocsa_00024.webp",
  "/pdfs/catalog/catalogo-pocsa_00025.webp",
  "/pdfs/catalog/catalogo-pocsa_00026.webp",
  "/pdfs/catalog/catalogo-pocsa_00027.webp",
  "/pdfs/catalog/catalogo-pocsa_00028.webp",
  "/pdfs/catalog/catalogo-pocsa_00029.webp",
  "/pdfs/catalog/catalogo-pocsa_00030.webp",
  "/pdfs/catalog/catalogo-pocsa_00031.webp",
  "/pdfs/catalog/catalogo-pocsa_00032.webp",
  "/pdfs/catalog/catalogo-pocsa_00033.webp",
  "/pdfs/catalog/catalogo-pocsa_00034.webp",
  "/pdfs/catalog/catalogo-pocsa_00035.webp",
  "/pdfs/catalog/catalogo-pocsa_00036.webp",
  "/pdfs/catalog/catalogo-pocsa_00037.webp",
  "/pdfs/catalog/catalogo-pocsa_00038.webp",
  "/pdfs/catalog/catalogo-pocsa_00039.webp",
  "/pdfs/catalog/catalogo-pocsa_00040.webp",
  "/pdfs/catalog/catalogo-pocsa_00041.webp",
  "/pdfs/catalog/catalogo-pocsa_00042.webp",
  "/pdfs/catalog/catalogo-pocsa_00043.webp",
  "/pdfs/catalog/catalogo-pocsa_00044.webp",
  "/pdfs/catalog/catalogo-pocsa_00045.webp",
  "/pdfs/catalog/catalogo-pocsa_00046.webp",
  "/pdfs/catalog/catalogo-pocsa_00047.webp",
  "/pdfs/catalog/catalogo-pocsa_00048.webp",
  "/pdfs/catalog/catalogo-pocsa_00049.webp",
  "/pdfs/catalog/catalogo-pocsa_00050.webp",
  "/pdfs/catalog/catalogo-pocsa_00051.webp",
  "/pdfs/catalog/catalogo-pocsa_00052.webp",
  "/pdfs/catalog/catalogo-pocsa_00053.webp",
  "/pdfs/catalog/catalogo-pocsa_00054.webp",
  "/pdfs/catalog/catalogo-pocsa_00055.webp",
  "/pdfs/catalog/catalogo-pocsa_00056.webp",
  "/pdfs/catalog/catalogo-pocsa_00057.webp",
  "/pdfs/catalog/catalogo-pocsa_00058.webp",
  "/pdfs/catalog/catalogo-pocsa_00059.webp",
  "/pdfs/catalog/catalogo-pocsa_00060.webp",
  "/pdfs/catalog/catalogo-pocsa_00061.webp",
  "/pdfs/catalog/catalogo-pocsa_00062.webp",
  "/pdfs/catalog/catalogo-pocsa_00063.webp",
  "/pdfs/catalog/catalogo-pocsa_00064.webp",
  "/pdfs/catalog/catalogo-pocsa_00065.webp",
  "/pdfs/catalog/catalogo-pocsa_00066.webp",
  "/pdfs/catalog/catalogo-pocsa_00067.webp",
  "/pdfs/catalog/catalogo-pocsa_00068.webp",
  "/pdfs/catalog/catalogo-pocsa_00069.webp",
  "/pdfs/catalog/catalogo-pocsa_00070.webp",
  "/pdfs/catalog/catalogo-pocsa_00071.webp",
  "/pdfs/catalog/catalogo-pocsa_00072.webp",
  "/pdfs/catalog/catalogo-pocsa_00073.webp",
  "/pdfs/catalog/catalogo-pocsa_00074.webp",
  "/pdfs/catalog/catalogo-pocsa_00075.webp",
  "/pdfs/catalog/catalogo-pocsa_00076.webp",
  "/pdfs/catalog/catalogo-pocsa_00077.webp",
  "/pdfs/catalog/catalogo-pocsa_00078.webp",
  "/pdfs/catalog/catalogo-pocsa_00079.webp",
  "/pdfs/catalog/catalogo-pocsa_00080.webp",
  "/pdfs/catalog/catalogo-pocsa_00081.webp",
  "/pdfs/catalog/catalogo-pocsa_00082.webp",
  "/pdfs/catalog/catalogo-pocsa_00083.webp",
  "/pdfs/catalog/catalogo-pocsa_00084.webp",
];


export default function Book() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const total = PAGES.length;

  // fullscreen
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const onFs = () => {
      const active = !!document.fullscreenElement;
      setIsFs(active);
      // re-medimos para recentrar y permitir mayor zoom/área
      setTimeout(() => measure(), 0);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // spreads con portada individual
  const totalSpreads = useMemo(() => 1 + Math.ceil((total - 1) / 2), [total]);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const dims = useRef<{ vw: number; vh: number; cw: number; ch: number }>({ vw: 0, vh: 0, cw: 0, ch: 0 });

  const clampTranslate = (nx: number, ny: number, z: number, recenter = false) => {
    const { vw, vh, cw, ch } = dims.current;
    const maxX = Math.max(0, (cw * z - vw) / 2);
    const maxY = Math.max(0, (ch * z - vh) / 2);
    const clampedX = recenter ? 0 : Math.min(maxX, Math.max(-maxX, nx));
    const clampedY = recenter ? 0 : Math.min(maxY, Math.max(-maxY, ny));
    setTx(clampedX);
    setTy(clampedY);
  };

  const measure = useCallback(() => {
    const v = wrapRef.current;
    const c = v?.querySelector(".flipbook-host") as HTMLElement | null;
    if (!v || !c) return;
    const vr = v.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    dims.current = { vw: vr.width, vh: vr.height, cw: cr.width, ch: cr.height };
    clampTranslate(0, 0, zoom, true);
  }, [zoom]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const changeZoom = (z: number) => {
    const newZ = Math.min(isFs ? 2.6 : 2.2, Math.max(1, z));
    setZoom(newZ);
    clampTranslate(tx, ty, newZ, newZ === 1);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === 1) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: tx, oy: ty };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || zoom === 1) return;
    const { sx, sy, ox, oy } = drag.current;
    clampTranslate(ox + (e.clientX - sx), oy + (e.clientY - sy), zoom);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Navegación
  const flipPrev = useCallback(() => bookRef.current?.pageFlip?.()?.flipPrev?.(), []);
  const flipNext = useCallback(() => bookRef.current?.pageFlip?.()?.flipNext?.(), []);

  const goToSpread = (s: number) => {
    const spread = Math.max(0, Math.min(s, totalSpreads - 1));
    if (spread === 0) {
      bookRef.current?.pageFlip?.()?.flip?.(0);
    } else {
      const leftIndex = (spread - 1) * 2 + 1;
      bookRef.current?.pageFlip?.()?.flip?.(leftIndex);
    }
  };

  const onFlip = (e: any) => {
    const p = Number(e?.data ?? 0);
    setCurrentPage(p);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await wrapRef.current?.requestFullscreen?.();
    } else {
      await document.exitFullscreen();
    }
  };

  // numeración y progreso
  const isCover = currentPage === 0;
  const visibleLeft = isCover ? 0 : (currentPage % 2 === 0 ? currentPage - 1 : currentPage);
  const leftNum = isCover ? 1 : visibleLeft + 1;
  const rightNum = isCover ? 1 : Math.min(visibleLeft + 2, total);
  const spreadIndex = isCover ? 0 : 1 + Math.floor((visibleLeft - 1) / 2);
  const pct = totalSpreads > 1 ? (spreadIndex / (totalSpreads - 1)) * 100 : 0;

  // tamaños más grandes cuando está en fullscreen
  const containerWidth = isFs ? "min(96vw, 2500px)" : "min(94vw, 1400px)";
  const containerHeight = isFs ? "min(96vh, 1785px)" : "min(88vh, 1000px)";
  const maxW = isFs ? 1800 : 1100;
  const maxH = isFs ? 2200 : 1500;

  return (
    <div className="w-full flex flex-col items-center">
      {/* CONTENEDOR PRINCIPAL */}
      <div
        ref={wrapRef}
        className="relative grid place-items-center overflow-hidden rounded-2xl shadow-2xl bg-transparent"
        style={{ width: containerWidth, height: containerHeight, marginInline: "auto" }}
      >
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none rounded-2xl"
          style={{
            background: `
              radial-gradient(980px 520px at 24% 30%, rgba(119,235,118,0.20), rgba(119,235,118,0) 62%),
              radial-gradient(880px 480px at 76% 70%, rgba(59,148,208,0.20), rgba(59,148,208,0) 62%),
              linear-gradient(180deg, rgba(0,0,0,0.50), rgba(0,0,0,0.50))
            `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto, auto, cover",
            backgroundPosition: "24% 30%, 76% 70%, center",
            filter: "saturate(1.03) brightness(1.01)",
          }}
        />

        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={flipPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/75 text-white"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Zoom + libro */}
        <div
          className="will-change-transform"
          style={{ transform: `translate(${tx}px, ${ty}px) scale(${zoom})`, transformOrigin: "center center" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="flipbook-host inline-block">
            <HTMLFlipBook
              ref={bookRef}
              width={717}
              height={928}
              size="stretch"
              minWidth={560}
              maxWidth={maxW}          // ✅ más grande en fullscreen
              minHeight={720}
              maxHeight={maxH}         // ✅ más grande en fullscreen
              showCover={true}         // ✅ portada sola
              usePortrait={false}
              mobileScrollSupport
              maxShadowOpacity={0.45}
              flippingTime={600}
              swipeDistance={5}
              className="bg-transparent [pointer-events:auto]"
              onFlip={onFlip}
              onInit={() => setTimeout(measure, 0)}
            >
              {PAGES.map((src, i) => {
                const isHard = i === 0 || i === PAGES.length - 1;

                // ✅ SOLO esquinas EXTERNAS redondeadas:
                // - Portada (0) y contraportada (última): redondeadas completas (es todo externo).
                // - Interior:
                //    * Páginas impares (1,3,5...) son izquierda -> rounded-l-2xl
                //    * Páginas pares   (2,4,6...) son derecha  -> rounded-r-2xl
                let cornerClass =
                  i === 0 || i === PAGES.length - 1
                    ? "rounded-2xl"
                    : i % 2 === 1
                    ? "rounded-l-2xl"
                    : "rounded-r-2xl";

                return (
                  <div
                    key={i}
                    data-density={isHard ? "hard" : "soft"}
                    className={`relative w-[720px] h-[960px] bg-white ${cornerClass} overflow-hidden shadow-xl`}
                  >
                    <Image
                      src={src}
                      alt={`Página ${i + 1}`}
                      fill
                      sizes="720px"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div>
                );
              })}
            </HTMLFlipBook>
          </div>
        </div>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={flipNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/75 text-white"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* BARRA DE CONTROL */}
      <div className="mt-4 w-[min(1400px,94vw)] rounded-xl bg-[#1c1c1c] text-white px-4 py-3 flex items-center gap-4">
        <div className="text-sm tabular-nums whitespace-nowrap">
          {leftNum === rightNum ? `${leftNum}` : `${leftNum}-${rightNum}`} / {total}
        </div>

        <input
          type="range"
          min={0}
          max={totalSpreads - 1}
          step={1}
          value={spreadIndex}
          onChange={(e) => goToSpread(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none bg-transparent"
          style={{ background: `linear-gradient(to right, #22c55e ${pct}%, #3a3a3a ${pct}%)` }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 9999px;
            background: transparent;
          }
          input[type="range"]::-moz-range-track {
            height: 8px;
            border-radius: 9999px;
            background: transparent;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            margin-top: -5px;
            border-radius: 9999px;
            background: white;
            border: 2px solid #22c55e;
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 9999px;
            background: white;
            border: 2px solid #22c55e;
          }
        `}</style>

        <div className="flex items-center gap-2">
          <button onClick={() => changeZoom(zoom - 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom out">
            <Plus className="w-5 h-5 rotate-45" />
          </button>
          <input
            type="range"
            min={1}
            max={isFs ? 2.6 : 2.2}
            step={0.05}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            className="w-32 accent-white"
          />
          <button onClick={() => changeZoom(zoom + 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom in">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-white/10" title="Pantalla completa">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
