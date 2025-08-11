'use client'

import ShippingSection from "./ShippingSection";
import Book from "./Book";
import { RefObject } from "react";


interface Props {
  bookRef: RefObject<HTMLDivElement>;
}

export default function FullSectionWithBackground({ bookRef }: Props) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* FONDO NEGRO + MANCHAS VERDES */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(900px 480px at 18% 28%, rgba(119,235,118,0.18), rgba(119,235,118,0) 62%),
            radial-gradient(760px 420px at 82% 76%, rgba(48,52,144,0.22), rgba(48,52,144,0) 60%),
            linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.55))
          `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto, auto, cover",
          backgroundPosition: "18% 28%, 82% 76%, center",
          filter: "saturate(1.04) brightness(1.02)",
        }}
      />
      {/* Brillos verdes extra */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#77eb76]/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-[#77eb76]/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* CONTENIDO */}
      <div className="relative z-10">
        {/* SECCIÓN DE ENVÍOS */}
        <section className="w-screen bg-transparent flex items-center justify-center flex-col pt-[5vh] min-h-[140vh]">
          <ShippingSection />
        </section>

        {/* SECCIÓN DEL BOOK */}
        <section className="w-full bg-transparent flex justify-center items-center overflow-visible min-h-[160vh]">
          <div ref={bookRef}>
            <Book />
          </div>
        </section>
      </div>
    </section>
  );
}
