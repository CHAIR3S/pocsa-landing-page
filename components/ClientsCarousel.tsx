"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------- Tipos ----------------------
type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};
type Proyecto = {
  id: string;
  titulo: string;
  descripcion: string;
  imagenes: MediaItem[];
};

// ---------------------- Datos ----------------------
const proyectos: Proyecto[] = [
  {
    id: "proj-1",
    titulo: "Sala Modular en Nogal",
    descripcion:
      "Sistema cálido y funcional que ordena el área social sin saturar el espacio.",
    imagenes: [
      {
        type: "image",
        src: "/images/finished/islas-proyecto-1.jpg",
        alt: "Sala modular en nogal con líneas limpias y luz cálida",
      },
      {
        type: "image",
        src: "/images/finished/islas-proyecto-2.jpg",
        alt: "Detalle de veta de nogal y herrajes ocultos",
      },
      {
        type: "image",
        src: "/images/finished/islas-proyecto-3.jpg",
        alt: "Módulos de almacenaje oculto con cierre suave",
      },
    ],
  },
  {
    id: "proj-2",
    titulo: "Cocina Abierta",
    descripcion:
      "Superficies durables y flujo de trabajo claro para una rutina ágil.",
    imagenes: [
      {
        type: "image",
        src: "/images/finished/cca-escuela-1.jpg",
        alt: "Cocina integral con isla central y frentes de madera",
      },
      {
        type: "image",
        src: "/images/finished/cca-escuela-2.jpg",
        alt: "Organizadores internos que optimizan el espacio en cajones",
      },
    ],
  },
  {
    id: "proj-3",
    titulo: "Recámara con Vestidor",
    descripcion:
      "Texturas cálidas y módulos personalizables para descanso sereno y ordenado.",
    imagenes: [
      {
        type: "video",
        src: "/videos/oficina-proyecto-1-video.mp4",
        poster: "/videos/poster1.jpg",
        alt: "Recámara principal con cabecera iluminada y vestidor",
      },
      {
        type: "video",
        src: "/videos/oficina-proyecto-2-video.mp4",
        poster: "/videos/poster2.jpg",
        alt: "Vestidor modular con frentes de madera",
      },
    ],
  },
];

const clientLogos = [
  {
    id: 1,
    name: "Universidad de Guanajuato",
    src: "/images/universidad-guanajuato.png",
    width: 200,
    height: 420,
  },
  {
    id: 2,
    name: "Deacero",
    src: "/images/logo/deacero.png",
    width: 160,
    height: 80,
  },
  {
    id: 3,
    name: "Universidad Politécnica de Guanajuato",
    src: "/images/logo/Universidad Politecnica de Guanajuato.png",
    width: 160,
    height: 80,
  },
  {
    id: 4,
    name: "agencia kia",
    src: "/images/logo/agencia kia.png",
    width: 160,
    height: 80,
  },
  {
    id: 5,
    name: "nissan",
    src: "/images/logo/nissan.png",
    width: 160,
    height: 80,
  },
  {
    id: 6,
    name: "sep guanajuato",
    src: "/images/logo/sep guanajuato.png",
    width: 160,
    height: 80,
  },
  {
    id: 7,
    name: "Siiosa",
    src: "/images/logo/siiosa.png",
    width: 160,
    height: 80,
  },
  {
    id: 8,
    name: "Harinera los Pirineos",
    src: "/images/logo/Harinera los Pirineos.png",
    width: 160,
    height: 80,
  },
  {
    id: 9,
    name: "condumex",
    src: "/images/logo/condumex.png",
    width: 160,
    height: 80,
  },
  {
    id: 10,
    name: "mosmex",
    src: "/images/logo/mosmex.png",
    width: 160,
    height: 80,
  },
  {
    id: 11,
    name: "flensa",
    src: "/images/logo/flensa.png",
    width: 160,
    height: 180,
  },
  {
    id: 12,
    name: "geely",
    src: "/images/logo/geely.png",
    width: 160,
    height: 180,
  },
  {
    id: 13,
    name: "agricultores el fuente",
    src: "/images/logo/agricultores el fuente.png",
    width: 160,
    height: 180,
  },
];

// ---------------------- Helpers de render ----------------------
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
    );
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
  );
}
function MediaMini({ item }: { item: MediaItem }) {
  if (item.type === "video")
    return (
      <video
        src={item.src}
        poster={item.poster}
        className="h-20 w-full object-cover"
        muted
        playsInline
      />
    );
  return (
    <Image
      src={item.src || "/placeholder.svg"}
      alt={item.alt}
      width={300}
      height={200}
      className="h-20 w-full object-cover"
      sizes="160px"
    />
  );
}

// ---------------------- Componente ----------------------
export default function ClientesYProyectos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Trigger dedicado de "Marca Guanajuato"
  const marcaRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Lightbox
  const [abierto, setAbierto] = useState(false);
  const [proyectoActivo, setProyectoActivo] = useState<number>(0);
  const [indiceImagen, setIndiceImagen] = useState<number>(0);

  const imagenActual = useMemo(
    () => proyectos[proyectoActivo]?.imagenes?.[indiceImagen],
    [proyectoActivo, indiceImagen]
  );

  const abrirGaleria = useCallback((idxProyecto: number, idxImagen: number) => {
    setProyectoActivo(idxProyecto);
    setIndiceImagen(idxImagen);
    setAbierto(true);
    document.documentElement.style.overflow = "hidden";
  }, []);
  const cerrarGaleria = useCallback(() => {
    setAbierto(false);
    document.documentElement.style.overflow = "";
  }, []);

  const siguiente = useCallback(() => {
    const total = proyectos[proyectoActivo].imagenes.length;
    setIndiceImagen((i) => (i + 1) % total);
  }, [proyectoActivo]);
  const anterior = useCallback(() => {
    const total = proyectos[proyectoActivo].imagenes.length;
    setIndiceImagen((i) => (i - 1 + total) % total);
  }, [proyectoActivo]);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarGaleria();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, siguiente, anterior, cerrarGaleria]);

  // Gradiente scroll-reactivo del fondo grande
  useEffect(() => {
    const section = sectionRef.current,
      bg = bgRef.current;
    if (!section || !bg) return;

    gsap.set(bg, { backgroundPosition: "0% 0%" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
      defaults: { ease: "none" },
    });
    tl.to(bg, { backgroundPosition: "0% 100%" }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ✅ Entrada por scroll: aparece apenas asoma y NO desaparece al seguir bajando
  useEffect(() => {
    const triggerEl = marcaRef.current,
      heading = headingRef.current,
      logo = logoRef.current;
    if (!triggerEl || !heading || !logo) return;

    // Estado inicial por CSS (clase .pre-anim). Refresco para layout dinámico
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const tlIn = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom", // se dispara cuando el top de la sección toca el borde inferior del viewport
        end: "bottom top", // duración del trigger (no usamos scrub aquí)
        toggleActions: "play none none reverse", // NO se revierte al bajar; solo al volver hacia arriba
        // markers: true,
      },
      defaults: { ease: "power3.out", duration: 0.9 },
    });

    tlIn
      .to(heading, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, 0)
      .to(
        logo,
        { opacity: 1, y: 0, scale: 1.02, rotate: 0, filter: "blur(0px)" },
        0.05
      )
      .to(logo, { scale: 1, duration: 0.3, ease: "power2.out" }, ">-0.1");

    return () => {
      tlIn.scrollTrigger?.kill();
      tlIn.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Fondo degradado grande */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute -inset-px"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #ffffff 22%, #f0f8ff 30%, #cde7f9 40%, #5fb0ff 56%, #2f7bcc 68%, #1b4f8f 78%, #0d2747 84%, #000000 88%, #000000 100%)",
          backgroundSize: "100% 300%",
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
          willChange: "background-position",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* Degradado inferior largo y suave hacia negro puro */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.05) 40%,
              rgba(0,0,0,0.15) 60%,
              rgba(0,0,0,0.35) 78%,
              rgba(0,0,0,0.6) 90%,
              rgba(0,0,0,1) 100%
            )
          `,
        }}
      />

      {/* ===================== CLIENTES ===================== */}
      <div className="relative container mx-auto px-6 py-[20vh] z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Nuestros Clientes
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Empresas e instituciones que confían en la calidad y profesionalismo
            de POCSA Muebles
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Fades laterales */}
          <div className="pointer-events-none absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee continuo */}
          <div className="marquee group">
            <div className="marquee__track group-hover:[animation-play-state:paused]">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="marquee__item w-[260px] h-[160px] flex items-center justify-center"
                >
                  <div className="px-6 py-4">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      className="h-[92px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                      sizes="(max-width: 768px) 200px, 240px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 text-sm">
            Más de 500 clientes satisfechos nos respaldan
          </p>
        </div>
      </div>

      {/* ===================== MARCA GUANAJUATO ===================== */}
      <div
        ref={marcaRef}
        className="relative z-10 flex items-center justify-center h-screen w-screen flex-col gap-6"
      >
        {/* TEXTO (estado inicial oculto) */}
        <span
          ref={headingRef}
          className="pre-anim text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white pb-24 md:pb-28 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        >
          Somos marca guanajuato
        </span>

        {/* LOGO (estado inicial oculto + flotado continuo via CSS) */}
        <div
          ref={logoRef}
          className="pre-anim logo-float group select-none"
          aria-label="Logo Marca Guanajuato animado"
          role="img"
        >
          <Image
            height={1200}
            width={1000}
            alt="logo marca guanajuato"
            src="/images/logo/logo-marca-guanajuato.png"
            priority
            sizes="(max-width: 768px) 280px, 380px"
            className="logo-img w-[260px] md:w-[380px] h-auto transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </div>
      </div>

      {/* KEYFRAMES DEL CARRUSEL */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${clientLogos.length * 250}px);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Animaciones y estados iniciales */}
      <style jsx>{`
        /* Estado inicial para evitar parpadeos antes de hidratar */
        .pre-anim {
          opacity: 0;
          transform: translateY(34px) scale(0.98);
          filter: blur(6px);
          will-change: transform, opacity, filter;
        }

        .marquee {
          overflow: hidden;
          width: 100%;
          will-change: transform;
        }
        .marquee__track {
          display: flex;
          width: max-content; /* ancho real del contenido */
          animation: scrollX 30s linear infinite;
        }
        .marquee__item {
          flex: 0 0 auto; /* ancho fijo por item */
        }
        @keyframes scrollX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          } /* avanza media tira (porque está duplicada) */
        }

        /* Flotado continuo del logo */
        @keyframes logoFloat {
          0% {
            transform: translate3d(-3px, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(3px, -16px, 0) rotate(1.2deg);
          }
          100% {
            transform: translate3d(-3px, 0, 0) rotate(0deg);
          }
        }
        .logo-float {
          animation: logoFloat 3.6s ease-in-out 1s infinite;
          will-change: transform;
        }

        /* Contorno al alfa del PNG en hover/focus */
        .logo-float .logo-img {
          filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
        }
        .logo-float:hover .logo-img,
        .logo-float:focus-visible .logo-img {
          filter: drop-shadow(0 0 0 #ffffff) drop-shadow(0 0 2px #ffffff)
            drop-shadow(0 0 4px #ffffff)
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.65));
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ===================== MODAL LIGHTBOX ===================== */}
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
              <p className="text-xs md:text-sm text-gray-600">
                {imagenActual?.alt}
              </p>
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
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={siguiente}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow"
                aria-label="Siguiente"
                title="Siguiente"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Miniaturas */}
            <div className="p-3 grid grid-cols-4 gap-2 bg-white">
              {proyectos[proyectoActivo]?.imagenes.map((img, i) => {
                const activa = i === indiceImagen;
                return (
                  <button
                    key={img.src + i}
                    onClick={() => setIndiceImagen(i)}
                    className={`overflow-hidden rounded-md border ${
                      activa ? "ring-2 ring-black" : ""
                    }`}
                    aria-label={`Ver media ${i + 1}`}
                    title={`Ver media ${i + 1}`}
                  >
                    <MediaMini item={img} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
