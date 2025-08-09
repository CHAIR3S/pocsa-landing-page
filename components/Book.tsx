"use client";

import { useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Plus, Minus } from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false }) as any;

const PAGES = [
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0001.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0002.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0003.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0004.jpg",
];

export default function Book() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);

  const [leftPage, setLeftPage] = useState(0);
  const total = PAGES.length;
  const totalSpreads = useMemo(() => Math.max(1, Math.ceil(total / 2)), [total]);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const dims = useRef<{ vw: number; vh: number; cw: number; ch: number }>({ vw: 0, vh: 0, cw: 0, ch: 0 });

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

  const clampTranslate = (nx: number, ny: number, z: number, recenter = false) => {
    const { vw, vh, cw, ch } = dims.current;
    const maxX = Math.max(0, (cw * z - vw) / 2);
    const maxY = Math.max(0, (ch * z - vh) / 2);
    const clampedX = recenter ? 0 : Math.min(maxX, Math.max(-maxX, nx));
    const clampedY = recenter ? 0 : Math.min(maxY, Math.max(-maxY, ny));
    setTx(clampedX);
    setTy(clampedY);
  };

  const changeZoom = (z: number) => {
    const newZ = Math.min(2.2, Math.max(1, z));
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
    const leftIndex = spread * 2;
    bookRef.current?.pageFlip?.()?.flip?.(leftIndex);
  };
  const onFlip = (e: any) => {
    const p = Number(e?.data ?? 0);
    setLeftPage(p % 2 === 0 ? p : p - 1);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await wrapRef.current?.requestFullscreen?.();
    else await document.exitFullscreen();
  };

  const leftNum = leftPage + 1;
  const rightNum = Math.min(leftPage + 2, total);

  // % para pintar de verde el progreso ya recorrido
  const spreadIndex = Math.floor(leftPage / 2);
  const pct = totalSpreads > 1 ? (spreadIndex / (totalSpreads - 1)) * 100 : 0;

  return (
    <div className="w-full flex flex-col items-center">
      {/* CONTENEDOR PRINCIPAL CENTRAL, MÁS GRANDE */}
      <div
        ref={wrapRef}
        className="relative grid place-items-center overflow-hidden rounded-2xl shadow-2xl bg-[#0f0f0f]/40 backdrop-blur"
        style={{
          width: "min(1400px, 94vw)",
          height: "min(88vh, 1000px)",
          marginInline: "auto",
        }}
      >
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={flipPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/75 text-white"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Capa zoom + libro (centrado real) */}
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
              // tamaños más grandes
              width={720}
              height={960}
              size="stretch"
              minWidth={560}
              maxWidth={1100}
              minHeight={720}
              maxHeight={1500}
              showCover={false}
              usePortrait={false}
              mobileScrollSupport
              maxShadowOpacity={0.45}
              flippingTime={600}
              swipeDistance={5}
              className="bg-transparent [pointer-events:auto]"
              onFlip={onFlip}
              onInit={() => setTimeout(measure, 0)}
            >
              {PAGES.map((src, i) => (
                <div
                  key={i}
                  className="relative w-[720px] h-[960px] bg-white rounded-2xl overflow-hidden shadow-xl"
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
              ))}
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

      {/* BARRA DE CONTROL – MÁS GRANDE + PROGRESO VERDE */}
      <div className="mt-4 w-[min(1400px,94vw)] rounded-xl bg-[#1c1c1c] text-white px-4 py-3 flex items-center gap-4">
        <div className="text-sm tabular-nums whitespace-nowrap">
          {leftNum}-{rightNum} / {total}
        </div>

        {/* Slider por spreads con track verde del progreso */}
        <input
          type="range"
          min={0}
          max={totalSpreads - 1}
          step={1}
          value={spreadIndex}
          onChange={(e) => goToSpread(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none bg-transparent"
          style={{
            // track "pintado" a la izquierda en verde y a la derecha oscuro
            background: `linear-gradient(to right, #22c55e ${pct}%, #3a3a3a ${pct}%)`,
          }}
        />
        {/* estilos del thumb nativo */}
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

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button onClick={() => changeZoom(zoom - 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom out">
            <Minus className="w-5 h-5" />
          </button>
          <input
            type="range"
            min={1}
            max={2.2}
            step={0.05}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            className="w-32 accent-white"
          />
          <button onClick={() => changeZoom(zoom + 0.1)} className="p-2 rounded hover:bg-white/10" title="Zoom in">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Extras */}
        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-white/10" title="Pantalla completa">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/** Miniaturas */
function Thumbs({
  pages,
  activeLeft,
  onPick,
}: {
  pages: string[];
  activeLeft: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="flex gap-2">
        {pages
          .slice(Math.max(0, activeLeft - 2), Math.min(pages.length, activeLeft + 4))
          .map((src, idx) => {
            const realIndex = Math.max(0, activeLeft - 2) + idx;
            const active = realIndex === activeLeft || realIndex === activeLeft + 1;
            return (
              <button
                key={src}
                onClick={() => onPick(realIndex)}
                className={`relative w-16 h-24 overflow-hidden rounded-lg transition 
                ${active ? "ring-2 ring-white" : "ring-1 ring-white/20 hover:ring-white/50"} 
                hover:scale-105 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.06),rgba(255,255,255,.02))] shadow`}
                title={`Ir a página ${realIndex + 1}`}
              >
                <Image src={src} alt={`Pág ${realIndex + 1}`} fill sizes="64px" className="object-cover" />
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
