"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function NuestrosProductosGradient() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nuestrosRef = useRef<HTMLHeadingElement | null>(null);
  const productosRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !nuestrosRef.current || !productosRef.current) return;

    const targets = [nuestrosRef.current, productosRef.current];

    gsap.set(targets, {
      backgroundPosition: "0% 50%",
      willChange: "background-position",
      backgroundSize: "200% 100%",
      color: "transparent",
      backgroundImage:
        "linear-gradient(90deg, #000000 0%, #153d1d 20%, #2b602e 50%, #488f46 40%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    });

    const tween = gsap.to(targets, {
      backgroundPosition: "100% 50%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-screen bg-black py-16">
      <h2
        ref={nuestrosRef}
        className="relative -top-[8vh] left-[6vw] text-5xl md:text-6xl lg:text-7xl font-bold leading-none"
      >
        Nuestros
      </h2>
      <h2
        ref={productosRef}
        className="relative -top-[8vh] left-[10vw] text-5xl md:text-6xl lg:text-7xl font-bold leading-none"
      >
        Productos
      </h2>
    </section>
  );
}
