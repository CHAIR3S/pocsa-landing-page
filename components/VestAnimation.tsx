"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameBlobs } from "@/hooks/useFrameBlobs";

gsap.registerPlugin(ScrollTrigger);

export default function VestAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // tus archivos: frame_001.webp ... frame_065.webp
  const first = 1;
  const frameCount = 65;
  const last = first + frameCount - 1;

  const { ready, getSrc, isLoaded, warmAround } = useFrameBlobs({
    basePath: "/images/vest-animation/frame_",
    frameCount,
    pad: 3,
    ext: "webp",
    preloadAhead: 20,
    concurrent: 6,
    startIndex: first, // 👈 importante
  });

  const poster = "/images/vest-animation/frame_001.webp";

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current) return;

    // Póster desde el arranque
    imgRef.current.src = poster;
    lastFrameRef.current = first;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top top",
          toggleActions: "play none none reverse",
        },
      }
    );

    const state = { f: first };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=170%",
        scrub: true,
        pin: true,
        pinSpacing: true,
        onLeaveBack: () => {
          // Al volver arriba, pon SIEMPRE un src válido
          const s = getSrc(first);
          if (imgRef.current) {
            imgRef.current.src = s && isLoaded(first) ? s : poster;
            lastFrameRef.current = first;
          }
        },
      },
    });

    const update = () => {
      // estado f va de first..last
      const idx = Math.min(last, Math.max(first, Math.round(state.f)));
      if (idx === lastFrameRef.current) return;

      if (isLoaded(idx)) {
        const s = getSrc(idx);
        if (s && imgRef.current) {
          imgRef.current.src = s;
          lastFrameRef.current = idx;
          warmAround(idx);
        }
      }
    };

    tl.to(state, {
      f: last,
      ease: "none",
      onUpdate: () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
      },
    });

    // Si ya está ready, intenta poner el primer frame real
    if (ready) {
      const s = getSrc(first);
      if (s && isLoaded(first) && imgRef.current) {
        imgRef.current.src = s;
        lastFrameRef.current = first;
      }
    }

    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tl.kill();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-black"
    >
      <img
        ref={imgRef}
        alt="Animación por frames"
        src="/images/vest-animation/frame_001.webp"   // 👈 SSR poster
        loading="eager"
        decoding="sync"
        className="block w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />
    </section>
  );
}
