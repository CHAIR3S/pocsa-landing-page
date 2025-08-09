"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ClientsCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const greenRef = useRef<HTMLDivElement>(null)
  const darkRef = useRef<HTMLDivElement>(null)

  const clientLogos = [
    { id: 1, name: "Universidad de Guanajuato", src: "/images/universidad-guanajuato.png", width: 200, height: 120 },
    { id: 2, name: "Deacero", src: "/images/logo/deacero.png", width: 160, height: 80 },
    { id: 3, name: "Universidad Politécnica de Guanajuato", src: "/images/logo/Universidad Politecnica de Guanajuato.png", width: 160, height: 80 },
    { id: 4, name: "agencia kia", src: "/images/logo/agencia kia.png", width: 160, height: 80 },
    { id: 5, name: "nissan", src: "/images/logo/nissan.png", width: 160, height: 80 },
    { id: 6, name: "sep guanajuato", src: "/images/logo/sep guanajuato.png", width: 160, height: 80 },
    { id: 7, name: "Siiosa", src: "/images/logo/siiosa.png", width: 160, height: 80 },
    { id: 8, name: "Harinera los Pirineos", src: "/images/logo/Harinera los Pirineos.png", width: 160, height: 80 },
    { id: 9, name: "condumex", src: "/images/logo/condumex.png", width: 160, height: 80 },
    { id: 10, name: "mosmex", src: "/images/logo/mosmex.png", width: 160, height: 80 },
    { id: 11, name: "flensa", src: "/images/logo/flensa.png", width: 160, height: 80 },
    { id: 12, name: "geely", src: "/images/logo/geely.png", width: 160, height: 80 },
    { id: 13, name: "agricultores el fuente", src: "/images/logo/agricultores el fuente.png", width: 160, height: 80 },
  ]
  const duplicatedLogos = [...clientLogos, ...clientLogos]

  useEffect(() => {
    const section = sectionRef.current
    const green = greenRef.current
    const dark = darkRef.current
    if (!section || !green || !dark) return

    // Scroll reactivo: crossfade BLANCO → VERDE → NEGRO + movimiento de background
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2, // suavizado interactivo
      },
      defaults: { ease: "none" },
    })

    // Al inicio: blanco puro (capas ocultas)
    gsap.set(green, { opacity: 0, backgroundPosition: "0% 0%" })
    gsap.set(dark, { opacity: 0, backgroundPosition: "0% 0%" })

    // 1) Entra VERDE (suave y “caro”)
    tl.to(green, { opacity: 1 }, 0.12)          // empieza a entrar tras ~12% del scroll
      .to(green, { backgroundPosition: "0% 100%" }, 0) // desplazamiento “vivo” durante todo el scroll

    // 2) Entra NEGRO un poco después (cierre elegante)
    tl.to(dark, { opacity: 1 }, 0.66)            // entra en el último tercio
      .to(dark, { backgroundPosition: "0% 100%" }, 0)  // también se mueve para el efecto

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height: "300vh",
        background: "white", // base blanco
      }}
    >
      {/* Capa VERDE (premium) */}
      <div
        ref={greenRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          // degradado de verde claro → intermedio → VERDE CARO
          background:
            "linear-gradient(180deg, #72e058 0%, #3fa45a 35%, #14532d 100%)",
          backgroundSize: "100% 250%",
          willChange: "opacity, background-position",
        }}
      />
      {/* Capa NEGRA (un poco más al final) */}
      <div
        ref={darkRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a3a1e 0%, #000000 80%)",
          backgroundSize: "100% 250%",
          willChange: "opacity, background-position",
        }}
      />

      {/* CONTENIDO */}
      <div className="relative container mx-auto px-6 pt-[20vh]">
        {/* al inicio se ve sobre blanco, por eso textos oscuros */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Nuestros Clientes</h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Empresas e instituciones que confían en la calidad y profesionalismo de POCSA Muebles
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* fades laterales (arrancan blancos; si quieres, podemos hacer que cambien a oscuros cuando entra el negro) */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div
            className="flex animate-scroll hover:pause-animation"
            style={{ width: `${duplicatedLogos.length * 250}px` }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-[250px] h-[120px] flex items-center justify-center px-8"
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 text-sm">Más de 500 clientes satisfechos nos respaldan</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${clientLogos.length * 250}px); }
        }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .hover\\:pause-animation:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}

export default ClientsCarousel
