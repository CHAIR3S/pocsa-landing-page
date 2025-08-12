// hooks/useFrameBlobs.ts
"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  basePath: string;          // ej: "/images/vest-animation/frame_"
  frameCount: number;        // ej: 64
  pad?: number;              // ej: 3 -> 000, 001...
  ext?: string;              // "webp" | "jpg" | ...
  preloadAhead?: number;     // cuantos frames por delante asegurar
  concurrent?: number;       // cuántas descargas simultáneas
  startIndex?: number;       // primer frame visible (0 o 1)
};

export function useFrameBlobs({
  basePath,
  frameCount,
  pad = 3,
  ext = "webp",
  preloadAhead = 12,
  concurrent = 6,
  startIndex = 0,
}: Options) {
  const [ready, setReady] = useState(false);
  const urlsRef = useRef<(string | null)[]>(Array(frameCount).fill(null));
  const loadedRef = useRef<boolean[]>(Array(frameCount).fill(false));
  const abortersRef = useRef<AbortController[]>([]);
  const inFlightRef = useRef(0);

  const toUrl = (i: number) =>
    `${basePath}${String(i).padStart(pad, "0")}.${ext}`;

  // Preload con control de concurrencia
  const queueRef = useRef<number[]>([]);
  const schedule = (indices: number[]) => {
    const set = new Set(queueRef.current);
    indices.forEach((i) => {
      if (i >= 0 && i < frameCount && !loadedRef.current[i] && !set.has(i)) {
        set.add(i);
      }
    });
    queueRef.current = Array.from(set.values());
    pump();
  };

  const pump = () => {
    while (
      inFlightRef.current < concurrent &&
      queueRef.current.length > 0
    ) {
      const i = queueRef.current.shift()!;
      download(i);
    }
  };

  const download = async (i: number) => {
    inFlightRef.current++;
    const ac = new AbortController();
    abortersRef.current.push(ac);
    try {
      const res = await fetch(toUrl(i), { signal: ac.signal, cache: "force-cache" });
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      urlsRef.current[i] = objUrl;
      loadedRef.current[i] = true;
    } catch {
      // Ignora errores puntuales, dejamos el slot para reintentos si quieres
    } finally {
      inFlightRef.current--;
      // si es el primer lote, marca ready cuando haya al menos 1/3 precargado
      if (!ready) {
        const loaded = loadedRef.current.filter(Boolean).length;
        if (loaded >= Math.min(frameCount, Math.max(8, Math.ceil(frameCount / 3)))) {
          setReady(true);
        }
      }
      pump();
    }
  };

  // Arranque: prioriza una ventana alrededor del startIndex y luego el resto
  useEffect(() => {
    const primary: number[] = [];
    for (let d = 0; d <= preloadAhead; d++) {
      const fwd = startIndex + d;
      const bwd = startIndex - d;
      if (d === 0) {
        primary.push(startIndex);
      } else {
        if (fwd < frameCount) primary.push(fwd);
        if (bwd >= 0) primary.push(bwd);
      }
    }
    const rest: number[] = [];
    for (let i = 0; i < frameCount; i++) if (!primary.includes(i)) rest.push(i);
    schedule([...primary, ...rest]);

    return () => {
      abortersRef.current.forEach((a) => a.abort());
      urlsRef.current.forEach((u) => u && URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePath, frameCount, pad, ext, startIndex]);

  // API para el componente
  const getSrc = (i: number) => urlsRef.current[i] ?? null;
  const isLoaded = (i: number) => loadedRef.current[i] === true;

  // Si te mueves mucho, puedes pedir que pre-cargue alrededor
  const warmAround = (center: number) => {
    const windowIdx: number[] = [];
    for (let d = 0; d <= preloadAhead; d++) {
      const fwd = center + d;
      const bwd = center - d;
      if (fwd < frameCount) windowIdx.push(fwd);
      if (bwd >= 0) windowIdx.push(bwd);
    }
    schedule(windowIdx);
  };

  return { ready, getSrc, isLoaded, warmAround };
}
