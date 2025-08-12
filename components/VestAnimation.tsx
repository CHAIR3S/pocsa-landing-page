"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameBlobs } from "@/hooks/useFrameBlobs";

gsap.registerPlugin(ScrollTrigger);

export default function VestAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  const frameCount = 64;
  const { ready, getSrc, isLoaded, warmAround } = useFrameBlobs({
    basePath: "/images/vest-animation/frame_",
    frameCount,
    pad: 3,
    ext: "webp",
    preloadAhead: 20,
    concurrent: 6,
    startIndex: 0,
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    // fade-in cuando llega
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

    const state = { f: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=170%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    const update = () => {
      const idx = Math.min(frameCount - 1, Math.max(0, Math.round(state.f)));
      if (idx === lastFrameRef.current) return;
      const src = getSrc(idx);
      if (src && isLoaded(idx) && imgRef.current) {
        lastFrameRef.current = idx;
        imgRef.current.src = src;
        warmAround(idx);
      }
    };

    tl.to(state, {
      f: frameCount - 1,
      ease: "none",
      onUpdate: () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
      },
    });

    // Primer frame
    const id = requestAnimationFrame(() => {
      const s0 = getSrc(0);
      if (s0 && imgRef.current) imgRef.current.src = s0;
    });

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-black"
    >
      <img
        ref={imgRef}
        alt="Animación por frames"
        className="w-full h-full object-cover select-none pointer-events-none bg-cover"
        draggable={false}
      />
    </section>
  );
}
