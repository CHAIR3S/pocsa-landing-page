"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MelaminesAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const frameCount = 39; // cambia esto al total de tus imágenes
  const [currentFrame, setCurrentFrame] = useState(0);

  const getFrameSrc = (index: number) =>
    `/images/melamine-animation/frame_${String(index).padStart(3, "0")}.jpg`;

useEffect(() => {
  requestAnimationFrame(() => {
    const obj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=190%",
        scrub: true,
        pin: true,
        // markers: true,
        pinSpacing: true,
      },
    });

    tl.to(obj, {
      frame: frameCount - 1,
      ease: "none",
      onUpdate: () => {
        const index = Math.round(obj.frame);
        setCurrentFrame(index);
        if (imageRef.current) {
          imageRef.current.src = getFrameSrc(index);
        }
        console.log("Frame:", index);
      },
    });

    ScrollTrigger.refresh();
  });

}, []);


  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen flex items-center justify-center bg-black"
    >
      <img
        ref={imageRef}
        src={getFrameSrc(0)}
        alt="Animación por frames"
        className="w-full h-full object-cover"
      />

      {console.log("Current Frame:", currentFrame)}
    </section>
  );
}
