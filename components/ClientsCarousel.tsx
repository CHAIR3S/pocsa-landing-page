"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ---------------------- Tipos ----------------------
type MediaItem = {
  type: "image" | "video"
  src: string
  alt: string
  poster?: string // opcional para videos
}

type Proyecto = {
  id: string
  titulo: string
  descripcion: string
  imagenes: MediaItem[]
}

// ---------------------- Datos ----------------------
const proyectos: Proyecto[] = [
  {
    id: "proj-1",
    titulo: "Sala Modular en Nogal",
    descripcion: "Sistema cálido y funcional que ordena el área social sin saturar el espacio.",
    imagenes: [
      { type: "image", src: "/images/finished/islas-proyecto-1.jpg", alt: "Sala modular en nogal con líneas limpias y luz cálida" },
      { type: "image", src: "/images/finished/islas-proyecto-2.jpg", alt: "Detalle de veta de nogal y herrajes ocultos" },
      { type: "image", src: "/images/finished/islas-proyecto-3.jpg", alt: "Módulos de almacenaje oculto con cierre suave" },
    ],
  },
  {
    id: "proj-2",
    titulo: "Cocina Abierta",
    descripcion: "Superficies durables y flujo de trabajo claro para una rutina ágil.",
    // SOLO 2 FOTOS
    imagenes: [
      { type: "image", src: "/images/finished/cca-escuela-1.jpg", alt: "Cocina integral con isla central y frentes de madera" },
      { type: "image", src: "/images/finished/cca-escuela-2.jpg", alt: "Organizadores internos que optimizan el espacio en cajones" },
    ],
  },
  {
    id: "proj-3",
    titulo: "Recámara con Vestidor",
    descripcion: "Texturas cálidas y módulos personalizables para descanso sereno y ordenado.",
    // SOLO 2 VIDEOS
    imagenes: [
      { type: "video", src: "/videos/oficina-proyecto-1-video.mp4", poster: "/videos/poster1.jpg", alt: "Recámara principal con cabecera iluminada y vestidor" },
      { type: "video", src: "/videos/oficina-proyecto-2-video.mp4", poster: "/videos/poster2.jpg", alt: "Vestidor modular con frentes de madera" },
    ],
  },
]

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

// ---------------------- Helpers de render ----------------------
function MediaThumb({ item, className }: { item: MediaItem; className?: string }) {
  if (item.type === "video") {
    return (
      <video
        className={className}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        autoPlay
        loop
      />
    )
  }
  return (
    <Image
      src={item.src || "/placeholder.svg"}
      alt={item.alt}
      width={1400}
      height={900}
      draggable={false}
      className={className}
      sizes="(max-width: 768px) 80vw, 40vw"
    />
  )
}

function MediaMain({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        className="w-full h-[48vh] md:h-[60vh] object-cover"
        controls
        muted
        playsInline
        autoPlay
        loop
      />
    )
  }
  return (
    <Image
      src={item.src || "/placeholder.svg"}
      alt={item.alt}
      width={1600}
      height={1000}
      className="w-full h-[48vh] md:h-[60vh] object-cover"
      sizes="(max-width: 768px) 90vw, 900px"
      priority
    />
  )
}

function MediaMini({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        className="h-20 w-full object-cover"
        muted
        playsInline
      />
    )
  }
  return (
    <Image
      src={item.src || "/placeholder.svg"}
      alt={item.alt}
      width={300}
      height={200}
      className="h-20 w-full object-cover"
      sizes="160px"
    />
  )
}

// ---------------------- Componente ----------------------
export default function ClientesYProyectos() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const duplicatedLogos = [...clientLogos, ...clientLogos]

  // Lightbox
  const [abierto, setAbierto] = useState(false)
  const [proyectoActivo, setProyectoActivo] = useState<number>(0)
  const [indiceImagen, setIndiceImagen] = useState<number>(0)

  const imagenActual = useMemo(() => {
    const p = proyectos[proyectoActivo]
    return p?.imagenes?.[indiceImagen]
  }, [proyectoActivo, indiceImagen])

  const abrirGaleria = useCallback((idxProyecto: number, idxImagen: number) => {
    setProyectoActivo(idxProyecto)
    setIndiceImagen(idxImagen)
    setAbierto(true)
    document.documentElement.style.overflow = "hidden" // lock scroll
  }, [])

  const cerrarGaleria = useCallback(() => {
    setAbierto(false)
    document.documentElement.style.overflow = "" // unlock
  }, [])

  const siguiente = useCallback(() => {
    const total = proyectos[proyectoActivo].imagenes.length
    setIndiceImagen((i) => (i + 1) % total)
  }, [proyectoActivo])

  const anterior = useCallback(() => {
    const total = proyectos[proyectoActivo].imagenes.length
    setIndiceImagen((i) => (i - 1 + total) % total)
  }, [proyectoActivo])

  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarGaleria()
      if (e.key === "ArrowRight") siguiente()
      if (e.key === "ArrowLeft") anterior()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [abierto, siguiente, anterior, cerrarGaleria])

  // Gradiente scroll-reactivo (blanco → verdes → negro) en UNA sola capa
  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    gsap.set(bg, { backgroundPosition: "0% 0%" })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
      defaults: { ease: "none" },
    })

    // Mueve el gradient verticalmente
    tl.to(bg, { backgroundPosition: "0% 100%" }, 0)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#ffffff" }} // base blanca (como querías)
    >
      {/* Capa única del gradiente con sangrado 1px para evitar seams */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute -inset-px"
        style={{
          // Blanco → verdes → negro en un solo gradient alto
          background:
            "linear-gradient(180deg, #ffffff 0%, #f6fff6 8%, #e9ffe9 12%, #72e058 25%, #3fa45a 45%, #14532d 60%, #0a3a1e 75%, #000000 100%)",
          backgroundSize: "100% 300%",
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
          willChange: "background-position",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* ===================== CLIENTES ===================== */}
      <div className="relative container mx-auto px-6 py-[20vh]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Nuestros Clientes</h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Empresas e instituciones que confían en la calidad y profesionalismo de POCSA Muebles
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Fades laterales (inician blancos) */}
          <div className="pointer-events-none absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div
            className="flex animate-scroll hover:pause-animation will-change-transform"
            style={{ width: `${duplicatedLogos.length * 250}px`, transform: "translate3d(0,0,0)" }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-[250px] h-[120px] flex items-center justify-center"
              >
                <div className="px-8">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 text-sm">Más de 500 clientes satisfechos nos respaldan</p>
        </div>
      </div>

      {/* ===================== PROYECTOS ===================== */}
      <div className="relative z-10 w-full bg-transparent">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <div className="mb-10 md:mb-14 text-center">
            <div className="inline-block rounded-full bg-black px-3 py-1 text-xs md:text-sm text-white">
              Proyectos terminados
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Diseño a medida que se siente en casa
            </h2>
            <p className="mt-2 text-gray-100/90">Selección breve y visual. Toca una imagen para ampliarla.</p>
          </div>

          <div className="space-y-14 md:space-y-20">
            {proyectos.map((p, idx) => {
              const invert = idx % 2 === 1
              return (
                <div
                  key={p.id}
                  className={`grid items-center gap-6 md:gap-10 md:grid-cols-2 opacity-0 translate-y-3 will-change-transform`}
                  ref={(el) => {
                    if (!el) return
                    const st = ScrollTrigger.create({
                      trigger: el,
                      start: "top 80%",
                      onEnter: () => el.classList.remove("opacity-0", "translate-y-3"),
                    })
                    return () => st.kill()
                  }}
                  style={{ transition: "opacity .45s ease, transform .45s ease" }}
                >
                  {/* Collage */}
                  <div className={invert ? "md:order-2" : ""}>
                    <div className="relative h-72 sm:h-80 md:h-[26rem]">
                      {/* 1 */}
                      {p.imagenes[0] && (
                        <button
                          type="button"
                          onClick={() => abrirGaleria(idx, 0)}
                          className="absolute left-0 top-0 w-[58%] aspect-[4/3] overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 transition-transform hover:scale-[1.02] hover:-rotate-1"
                          aria-label={`Abrir media 1 de ${p.titulo}`}
                          title={`Abrir media 1 de ${p.titulo}`}
                        >
                          <MediaThumb item={p.imagenes[0]} className="h-full w-full object-cover" />
                        </button>
                      )}

                      {/* 2 */}
                      {p.imagenes[1] && (
                        <button
                          type="button"
                          onClick={() => abrirGaleria(idx, 1)}
                          className="absolute right-2 top-10 w-[48%] aspect-[4/3] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform hover:scale-[1.03] hover:rotate-2"
                          aria-label={`Abrir media 2 de ${p.titulo}`}
                          title={`Abrir media 2 de ${p.titulo}`}
                        >
                          <MediaThumb item={p.imagenes[1]} className="h-full w-full object-cover" />
                        </button>
                      )}

                      {/* 3 (solo si existe) */}
                      {p.imagenes[2] && (
                        <button
                          type="button"
                          onClick={() => abrirGaleria(idx, 2)}
                          className="absolute left-1/3 -bottom-2 w-[42%] aspect-[4/3] overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 transition-transform hover:scale-[1.02] hover:-rotate-3"
                          aria-label={`Abrir media 3 de ${p.titulo}`}
                          title={`Abrir media 3 de ${p.titulo}`}
                        >
                          <MediaThumb item={p.imagenes[2]} className="h-full w-full object-cover" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Texto */}
                  <div className={invert ? "md:order-1" : ""}>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{p.titulo}</h3>
                    <p className="mt-3 text-white/90 text-base leading-relaxed">{p.descripcion}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* KEYFRAMES DEL CARRUSEL */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${clientLogos.length * 250}px); }
        }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .hover\\:pause-animation:hover { animation-play-state: paused; }
      `}</style>

      {/* ===================== MODAL LIGHTBOX (sin librerías) ===================== */}
      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cerrarGaleria}
          />
          <div className="relative z-10 max-w-[920px] w-[92vw] bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h4 className="text-base md:text-lg font-medium">
                {proyectos[proyectoActivo]?.titulo}
              </h4>
              <p className="text-xs md:text-sm text-gray-600">{imagenActual?.alt}</p>
              <button
                onClick={cerrarGaleria}
                className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
                aria-label="Cerrar"
                title="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden">
                {imagenActual && <MediaMain item={imagenActual} />}
              </div>

              {/* Flechas */}
              <button
                onClick={anterior}
                className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow"
                aria-label="Anterior"
                title="Anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={siguiente}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow"
                aria-label="Siguiente"
                title="Siguiente"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Miniaturas */}
            <div className="p-3 grid grid-cols-4 gap-2 bg-white">
              {proyectos[proyectoActivo]?.imagenes.map((img, i) => {
                const activa = i === indiceImagen
                return (
                  <button
                    key={img.src + i}
                    onClick={() => setIndiceImagen(i)}
                    className={`overflow-hidden rounded-md border ${activa ? "ring-2 ring-black" : ""}`}
                    aria-label={`Ver media ${i + 1}`}
                    title={`Ver media ${i + 1}`}
                  >
                    <MediaMini item={img} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}





    </section>
  )
}
