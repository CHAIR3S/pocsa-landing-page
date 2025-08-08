"use client";

import { useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, Maximize2, Grid, Search, Share2, Plus, Minus,
} from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false }) as any;

const PAGES = [
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0001.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0002.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0003.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0004.jpg",
];

export default function Book() {
  const wrapRef = useRef<HTMLDivElement>(null);     // viewport
  const bookRef = useRef<any>(null);                // flipbook

  // ---- Estado UI ----
  const [leftPage, setLeftPage] = useState(0);      // izquierda del spread
  const total = PAGES.length;
  const totalSpreads = useMemo(() => Math.max(1, Math.ceil(total / 2)), [total]);

  // ---- Zoom + Pan internos (sin salirse) ----
  const [zoom, setZoom] = useState(1);             // 1..2
  const [tx, setTx]   = useState(0);               // translateX
  const [ty, setTy]   = useState(0);               // translateY
  const drag = useRef<{sx:number; sy:number; ox:number; oy:number} | null>(null);
  const dims = useRef<{vw:number; vh:number; cw:number; ch:number}>({vw:0,vh:0,cw:0,ch:0});

  // mide viewport (vw,vh) y “contenido” (cw,ch = flipbook renderizado)
  const measure = useCallback(() => {
    const v = wrapRef.current;
    const c = v?.querySelector(".flipbook-host") as HTMLElement | null;
    if (!v || !c) return;
    const vr = v.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    dims.current = { vw: vr.width, vh: vr.height, cw: cr.width, ch: cr.height };
    // al cambiar tamaño, recentra y clampa
    clampTranslate(0, 0, zoom, true);
  }, [zoom]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const clampTranslate = (nx:number, ny:number, z:number, recenter=false) => {
    const { vw, vh, cw, ch } = dims.current;
    // cuando escalas desde el centro, el “sobrante” permitible a cada lado:
    const maxX = Math.max(0, (cw * z - vw) / 2);
    const maxY = Math.max(0, (ch * z - vh) / 2);
    const clampedX = recenter ? 0 : Math.min(maxX, Math.max(-maxX, nx));
    const clampedY = recenter ? 0 : Math.min(maxY, Math.max(-maxY, ny));
    setTx(clampedX);
    setTy(clampedY);
  };

  const changeZoom = (z:number) => {
    const newZ = Math.min(2, Math.max(1, z));
    setZoom(newZ);
    // al cambiar zoom, re-clampa (si vuelves a 1, centra)
    clampTranslate(tx, ty, newZ, newZ === 1);
  };

  // drag para pan
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === 1) return; // sin pan si no hay zoom
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: tx, oy: ty };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || zoom === 1) return;
    const { sx, sy, ox, oy } = drag.current;
    const nx = ox + (e.clientX - sx);
    const ny = oy + (e.clientY - sy);
    clampTranslate(nx, ny, zoom);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // ---- Navegación y slider (por spread) ----
  const flipPrev = useCallback(() => bookRef.current?.pageFlip?.()?.flipPrev?.(), []);
  const flipNext = useCallback(() => bookRef.current?.pageFlip?.()?.flipNext?.(), []);
  const goToSpread = (s: number) => {
    const spread = Math.max(0, Math.min(s, totalSpreads - 1));
    const leftIndex = spread * 2; // página izquierda
    bookRef.current?.pageFlip?.()?.flip?.(leftIndex);
  };
  const onFlip = (e:any) => {
    const p = Number(e?.data ?? 0);
    setLeftPage(p % 2 === 0 ? p : p - 1);
  };

  // fullscreen
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await wrapRef.current?.requestFullscreen?.();
    else await document.exitFullscreen();
  };

  const leftNum  = leftPage + 1;
  const rightNum = Math.min(leftPage + 2, total);

  return (
    <div className="w-full flex flex-col items-center">
{/* CONTENEDOR PRINCIPAL */}
<div ref={wrapRef} className="relative overflow-hidden rounded-lg" style={{ width: "min(1100px, 95vw)" }}>

  {/* Flecha izquierda fija */}
  <button
    type="button"
    onClick={flipPrev}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white"
    aria-label="Página anterior"
  >
    <ChevronLeft className="w-8 h-8" />
  </button>

  {/* CAPA ZOOM + LIBRO */}
  <div
    className="will-change-transform"
    style={{
      transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
      transformOrigin: "center center",
    }}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerCancel={onPointerUp}
  >
    <div className="flipbook-host inline-block">
      <HTMLFlipBook
        ref={bookRef}
        width={600}
        height={800}
        size="stretch"
        minWidth={450}
        maxWidth={800}
        minHeight={600}
        maxHeight={1200}
        showCover={false}
        usePortrait={false}
        mobileScrollSupport
        maxShadowOpacity={0.4}
        flippingTime={600}
        swipeDistance={5}
        className="bg-white text-slate-800 shadow-xl [pointer-events:auto]"
        onFlip={onFlip}
        onInit={() => setTimeout(measure, 0)}
      >
        {PAGES.map((src, i) => (
          <div key={i} className="relative w-[600px] h-[800px] bg-white">
            <Image src={src} alt={`Página ${i + 1}`} fill sizes="600px" className="object-contain" priority={i === 0}/>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  </div>

  {/* Flecha derecha fija */}
  <button
    type="button"
    onClick={flipNext}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white"
    aria-label="Página siguiente"
  >
    <ChevronRight className="w-8 h-8" />
  </button>

</div>


      {/* === BARRA DE CONTROL === */}
      <div className="mt-4 w-[min(1100px,95vw)] rounded-md bg-[#1f1f1f] text-white px-4 py-3 flex items-center gap-4">
        {/* 12-13 / 42 */}
        <div className="text-sm tabular-nums whitespace-nowrap">{leftNum}-{rightNum} / {total}</div>

        {/* Slider spreads – YA FUNCIONA */}
        <input
          type="range"
          min={0}
          max={totalSpreads - 1}
          step={1}
          value={Math.floor(leftPage / 2)}
          onChange={(e) => goToSpread(Number(e.target.value))}
          className="flex-1 accent-white"
        />

        {/* Miniaturas */}
        <Thumbs
          pages={PAGES}
          activeLeft={leftPage}
          onPick={(i) => goToSpread(Math.floor(i / 2))}
        />

        {/* Zoom interno */}
        <div className="flex items-center gap-2">
          <button onClick={() => changeZoom(zoom - 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom out">
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="range"
            min={1}
            max={2}
            step={0.05}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            className="w-28 accent-white"
          />
          <button onClick={() => changeZoom(zoom + 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom in">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Opcionales visuales */}
        <button className="p-2 rounded hover:bg-white/10" title="Buscar"><Search className="w-5 h-5" /></button>
        <button className="p-2 rounded hover:bg-white/10" title="Compartir"><Share2 className="w-5 h-5" /></button>

        {/* Fullscreen */}
        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-white/10" title="Pantalla completa">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/** Miniaturas bonitas */
function Thumbs({
  pages, activeLeft, onPick,
}: { pages:string[]; activeLeft:number; onPick:(i:number)=>void }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="flex gap-2">
        {pages.slice(Math.max(0, activeLeft - 2), Math.min(pages.length, activeLeft + 4)).map((src, idx, arr) => {
          // índice real en el array original
          const realIndex = Math.max(0, activeLeft - 2) + idx;
          const active = realIndex === activeLeft || realIndex === activeLeft + 1;
          return (
            <button
              key={src}
              onClick={() => onPick(realIndex)}
              className={`relative w-14 h-20 overflow-hidden rounded-md transition 
                ${active ? "ring-2 ring-white" : "ring-1 ring-white/20 hover:ring-white/50"} 
                hover:scale-105 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.06),rgba(255,255,255,.02))] shadow`}
              title={`Ir a página ${realIndex + 1}`}
            >
              <Image src={src} alt={`Pág ${realIndex + 1}`} fill sizes="56px" className="object-cover" />
              <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 px-1 rounded">
                {realIndex + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
