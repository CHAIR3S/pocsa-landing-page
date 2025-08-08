"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/**
 * Aplica un gradiente verde al texto y lo anima con el scroll.
 * El efecto consiste en deslizar el gradiente a través del texto (background-position),
 * con stops aproximados a los Pantone solicitados.
 */
export default function NuestrosProductosGradient() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nuestrosRef = useRef<HTMLHeadingElement | null>(null);
  const productosRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !nuestrosRef.current || !productosRef.current) return;

    const targets = [nuestrosRef.current, productosRef.current];

    // Asegura valores iniciales y performance.
    gsap.set(targets, {
      backgroundPosition: "0% 50%",
      willChange: "background-position",
      backgroundSize: "200% 100%", // Asegura que el gradiente cubra el texto
      color: "transparent", // Para que se vea el gradiente
      backgroundImage:
        "linear-gradient(90deg, red 0%, white 25%, blue 50%, red 75%, purple 100%)",
      WebkitBackgroundClip: "text", // Necesario para hacer que el gradiente solo afecte el texto
      backgroundClip: "text",
    });

    // Desplazamos el gradiente de 0% a 100% mientras la sección está en viewport.
    const tween = gsap.to(targets, {
      backgroundPosition: "100% 50%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Empieza cuando la parte superior de la sección entra en el viewport
        end: "bottom top",   // Termina cuando la parte inferior de la sección sale del viewport
        scrub: true,         // Vincula la animación al scroll
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
        aria-label="Nuestros"
      >
        Nuestros
      </h2>
      <h2
        ref={productosRef}
        className="relative -top-[8vh] left-[10vw] text-5xl md:text-6xl lg:text-7xl font-bold leading-none"
        aria-label="Productos"
      >
        Productos
      </h2>
    </section>
  );
}
