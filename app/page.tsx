"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import BentoGrid from "../components/BentoGrid";
import ClientsCarousel from "@/components/ClientsCarousel";
import { FurAnimation } from "@/components/WebMAnimation";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const Book = dynamic(() => import("@/components/Book"), { ssr: false });
import MelaminesAnimation from "@/components/MelaminesAnimation";
import ShippingSection from "@/components/ShippingSection";
import VestAnimation from "@/components/VestAnimation";
import NuestrosProductosGradient from "@/components/NuestrosProductosGradient";

gsap.registerPlugin(ScrollTrigger);

export default function PocsaLanding() {
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wrapper2Ref = useRef<HTMLDivElement>(null);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const maskSectionRef = useRef<HTMLDivElement>(null);
  const psicologoSectionRef = useRef<HTMLDivElement>(null);
  const calidadYDurabilidadRef = useRef<HTMLHeadingElement>(null);
  const parallaxSecRef = useRef<HTMLDivElement>(null);

  const bgWrapRef = useRef<HTMLDivElement>(null);
  const layerGreenRef = useRef<HTMLDivElement>(null);
  const layerBlueRef = useRef<HTMLDivElement>(null);
  const layerBlackRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // === REFS PARA NAVEGACIÓN ===
  const homeRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const HEADER_OFFSET = 80;

  function scrollToRef(ref: React.RefObject<HTMLElement | HTMLDivElement>) {
    if (!ref.current) return;
    const el = ref.current as HTMLElement;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const goHome = () => scrollToRef(homeRef);
  const goProducts = () => scrollToRef(productsRef);
  const goCatalog = () => scrollToRef(bookRef);
  const goContact = () => scrollToRef(contactRef);

  type ProductId =
    | "islas"
    | "linea-escolar"
    | "linea-hogar"
    | "modulos-ejecutivos"
    | "mesas-juntas"
    | "recepciones";

  function openProductGallery(productId: ProductId) {
    goProducts();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-product", { detail: { id: productId } })
      );
    }
    setIsProductsOpen(false);
  }

  const productLines = [
    { label: "Islas", id: "islas" as ProductId },
    { label: "Línea Escolar", id: "linea-escolar" as ProductId },
    { label: "Línea para el Hogar", id: "linea-hogar" as ProductId },
    { label: "Módulos Ejecutivos", id: "modulos-ejecutivos" as ProductId },
    { label: "Mesas de Juntas", id: "mesas-juntas" as ProductId },
    { label: "Recepciones", id: "recepciones" as ProductId },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProductsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsProductsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // === TUS EFECTOS (sin tocar) ===
  useEffect(() => {
    if (
      !logoMaskRef.current ||
      !heroTitleRef.current ||
      !subtitleRef.current ||
      !imageRef.current ||
      !textRef.current ||
      !wrapper2Ref.current
    )
      return;

    gsap.set([logoMaskRef.current, maskSectionRef.current], {
      clipPath: "circle(100% at 0% 0%)",
      WebkitClipPath: "circle(100% at 0% 0%)",
    });

    if (!bgWrapRef.current) return;

    const tl = gsap.timeline({
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(subtitleRef.current, { opacity: 0, duration: 1.3 })
      .to(imageRef.current, { scale: 0.9, duration: 1.3 }, "<")
      .to(heroTitleRef.current, { y: -50, opacity: 0, duration: 0.4 }, "<")
      .to(
        logoMaskRef.current,
        { maskSize: "clamp(65vh, 45%, 30vh)", duration: 0.6 },
        "<"
      )
      .to(imageRef.current, { opacity: 0, duration: 0.4 }, 0.3)
      .fromTo(
        textRef.current,
        { x: "100%" },
        { x: "-75%", ease: "none", duration: 1.2 },
        0.2
      )
      .to(
        wrapper2Ref.current,
        { position: "fixed", top: "35%", left: "45%", duration: 0 },
        "<"
      );

    tl.fromTo(
      [logoMaskRef.current, maskSectionRef.current],
      {
        clipPath: "circle(200% at 0% 0%)",
        WebkitClipPath: "circle(200% at 0% 0%)",
      },
      {
        clipPath: "circle(0% at 0% 0%)",
        WebkitClipPath: "circle(0% at 0% 0%)",
        ease: "none",
        duration: 0.5,
      },
      1.3
    )
      .to(
        [wrapper2Ref.current],
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        "<"
      )
      .to(
        psicologoSectionRef.current,
        { opacity: 1, duration: 1, ease: "power2.out" },
        "<+0.3"
      )
      .fromTo(
        calidadYDurabilidadRef.current,
        { y: "100%" },
        { y: "-15%", ease: "circ.inOut", duration: 0.3 },
        2
      );

  }, []);

  useEffect(() => {
    const el = parallaxSecRef.current;
    if (!el) return;

    const baseY = 50;
    const travel = 18;

    const tween = gsap.fromTo(
      el,
      { backgroundPosition: `80% ${baseY + travel / 2}%` },
      {
        backgroundPosition: `80% ${baseY - travel / 2}%`,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

  }, []);

  useEffect(() => {
    if (!bgWrapRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bgWrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(layerGreenRef.current, { opacity: 0, ease: "none", duration: 0.5 }, 0)
      .to(layerBlueRef.current, { opacity: 1, ease: "none", duration: 0.5 }, 0)
      .to(layerBlueRef.current, { opacity: 0, ease: "none", duration: 0.5 }, 0.5)
      .to(layerBlackRef.current, { opacity: 1, ease: "none", duration: 0.5 }, 0.5);

  }, []);

  return (
    <>
      {/* ANCLA DE HOME */}
      <div ref={homeRef} />

      {/* Navigation */}
      <header className="fixed w-full z-50 flex items-center justify-between lg:px-12 backdrop-blur-xl">
        <div
          className="space-x-2 cursor-pointer"
          style={{ width: 100, height: 67, overflow: "hidden", position: "relative" }}
          onClick={goHome}
        >
          <Image src="/logo-pocsa-color.svg" alt="Icono" fill style={{ objectFit: "cover", cursor: "pointer" }} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 md:pl-[7vw] text-white/90 text-shadow-white">
          <button onClick={goHome} className="hover:text-white transition-colors font-medium cursor-pointer">
            HOME
          </button>

          {/* Dropdown de Productos */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="hover:text-white transition-colors font-medium flex items-center gap-1 py-2 ">
              <span className="text-white/90 text-shadow-white">PRODUCTOS</span>
              <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isProductsOpen ? "rotate-180 text-[#9bef86]" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <div
              ref={dropdownRef}
              className={`rounded-sm bg-white absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 transition-all duration-200 ease-out ${
                isProductsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 overflow-hidden">
                {productLines.map((line, index) => (
                  <button
                    key={line.id}
                    onClick={() => openProductGallery(line.id)}
                    className="block w-full text-left px-6 py-4 text-gray-800 hover:bg-[#9bef86]/20 hover:text-black transition-all duration-150 font-medium border-l-4 border-transparent hover:border-[#9bef86] hover:pl-8"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isProductsOpen ? "slideInFromLeft 0.3s ease-out forwards" : "none",
                    }}
                  >
                    {line.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={goCatalog} className="hover:text-white transition-colors font-medium cursor-pointer">
            CATÁLOGO
          </button>
          <button onClick={goContact} className="hover:text-white transition-colors font-medium">
            CONTACTO
          </button>
        </nav>

        {/* Contact Info */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white/90">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+1 234 567 890</span>
          </div>
          <Button variant="outline" className="cursor-pointer bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md cursorpoin" onClick={goContact}>
            Cotizar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Contenido principal con máscara */}
      <div
        ref={logoMaskRef}
        className="logo-mask fixed top-0 w-full h-screen z-40"
        style={{ clipPath: "circle(100% at 50% 100%)", WebkitClipPath: "circle(100% at 50% 100%)" }}
      >
        <section className="relative h-full">
          {/* Background Image */}
          <div ref={imageRef} className="absolute inset-0">
            <Image src="/images/office-cover.jpg" alt="Modern living room interior" fill className="object-cover scale-[1.2]" priority />
            <div className="absolute inset-0 bg-black/20 m-[-5vw]" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-6">
            <div className="flex flex-col items-center justify-center">
              {/* Liquid Glass Text Effect */}
              <div ref={heroTitleRef} className="relative text-center mb-8 h-52 w-2xl">
                <Image
                  src="/pocsa-letras-color.svg"
                  alt="POCSA Letras"
                  fill
                  style={{ objectFit: "contain", filter: "drop-shadow(0 0 12px white)" }}
                />
              </div>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-white/90 text-lg md:text-xl text-center max-w-2xl mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/20"
              >
                Somos una empresa especializada en la fabricación de una amplia gama de muebles personalizados de alta calidad. Nuestro
                compromiso es transformar tus ideas en piezas únicas que reflejen tu estilo y necesidades.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-5">
                <Button
                  size="lg"
                  onClick={goCatalog}
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-8 py-3 cursor-pointer"
                >
                  Ver Catálogo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={goContact}
                  className="bg-transparent border-white/50 text-white hover:bg-white/10 backdrop-blur-md px-8 py-3 cursor-pointer"
                >
                  Contactar Ahora
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <footer className="absolute bottom-[2vh] left-6 right-6 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 w-full">
              <div className="flex items-center space-x-6 text-white/80 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ciudad de México</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>pocsaproyectos@gmail.com</span>
                </div>
              </div>
              <div className="text-white/60 text-sm">© 2024 POCSA Muebles. Todos los derechos reservados.</div>
            </div>
          </footer>
        </section>
      </div>

      <div className="h-[15vh]" />

      {/* — Sección extra con el texto que revelamos — */}
      <div
        ref={maskSectionRef}
        className="relative z-30 bg-black"
        style={{ clipPath: "circle(100% at 50% 100%)", WebkitClipPath: "circle(100% at 50% 100%)" }}
      >
        <section className="min-h-screen p-8 flex items-center justify-center">
          <div
            ref={wrapper2Ref}
            className="relative w-full max-w-3xl h-64 overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(circle at 50% 100%, black 70%, rgba(0,0,0,0.5) 85%, transparent 100%)",
              maskImage: "radial-gradient(circle at 50% 100%, black 70%, rgba(0,0,0,0.5) 85%, transparent 100%)",
              WebkitMaskSize: "200% 200%",
              maskSize: "200% 200%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              transition: "mask-size 1.2s ease-in-out",
            }}
          >
            <div
              ref={textRef}
              className="absolute whitespace-nowrap text-white text-8xl font-bold top-1/2 left-0"
              style={{ transform: "translateY(-50%)" }}
            >
              USTED LO IMAGINA, NOSOTROS LO HACEMOS REALIDAD
            </div>
          </div>
        </section>
      </div>

      <section ref={psicologoSectionRef} className="w-screen h-screen opacity-0">
        <MelaminesAnimation />
      </section>

      {/* SECCIÓN PRODUCTOS */}
      <section ref={productsRef} className="w-screen bg-black">
        <NuestrosProductosGradient />
        <BentoGrid />
      </section>

      {/* Clients Carousel */}
      <ClientsCarousel />

      <VestAnimation />

      <section className="w-screen h-screen bg-black flex flex-row container">
        <div className="w-1/2 h-full flex items-center justify-center">
          <FurAnimation width={600} height={723} />
        </div>

        <div className="w-1/2 h-full px-[10vw]">
          <h3 ref={calidadYDurabilidadRef} className="relative top-[-2vh] text-7xl font-bold">
            Calidad y durabilidad en cada diseño
          </h3>

          <h4 className="relative left-[-5vw] py-[5vh] text-4xl text-[#77eb76] font-semibold animate-glow">
            Muebles a tu medida, listos para inspirar.
          </h4>

          <div className="mt-[10vh]">
            <span className="text-2xl font-bold ">
              Creamos muebles personalizados con materiales premium, certificados bajo los más altos estándares de
            </span>
            <span className="text-2xl font-bold text-[#3b94d0]"> Marca Guanajuato</span>
            <span className="text-2xl font-bold ">, para garantizar belleza, resistencia y satisfacción total.</span>
          </div>
        </div>
      </section>

      <div className="bg-black">
        <section
          ref={parallaxSecRef}
          className="w-screen h-screen bg-black/10 bg-blend-multiply"
          style={{
            clipPath: "polygon(0 0%, 100% 0, 100% 95%, 0% 100%)",
            backgroundImage: 'url("/images/office-hd.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "80% 50%",
            willChange: "background-position",
          }}
        >
          <h3 className="relative top-[13%] right-[-40%] text-7xl font-semibold">
            <span className="text-4xl align-top leading-none">«</span>
            Comodidad y Elegancia.
            <span className="text-4xl align-bottom leading-none">»</span>
          </h3>
        </section>

        {/* === WRAPPER 300vh con fondo que cambia por scroll === */}
        <section ref={bgWrapRef} className="relative w-screen min-h-[300vh] overflow-visible">
          {/* Capas de fondo (si las usas) */}
          <div className="absolute inset-0 z-0 pointer-events-none h-full">
            <div ref={layerGreenRef} className="absolute inset-0" />
            <div ref={layerBlueRef} className="absolute inset-0" />
            <div ref={layerBlackRef} className="absolute inset-0" />
          </div>

          {/* Contenido encima del fondo */}
          <div className="relative z-10">
            <section className="w-screen bg-transparent flex items-center justify-center flex-col pt-[5vh] min-h-[140vh]">
              <ShippingSection />
            </section>

            {/* SECCIÓN CATÁLOGO / BOOK */}
            <section
              className="w-full bg-transparent flex justify-center items-center overflow-visible min-h-[160vh]"
            >
              <div 
              ref={bookRef}>
                <Book />
              </div>
            </section>
          </div>
        </section>
      </div>

      <video style={{ width: "100vw", height: "auto" }} autoPlay loop muted preload="auto">
        <source src="/videos/saw-video/saw-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Formulario de Contacto */}
      <section ref={contactRef}>
        <ContactForm />
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .glass-header {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .glass-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%);
          pointer-events: none;
          z-index: -1;
        }
        .glass-header:hover {
          background: rgba(255, 255, 255, 0.12);
          border-bottom-color: rgba(255, 255, 255, 0.15);
        }
        .liquid-glass-text {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.7) 25%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.6) 75%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          filter: drop-shadow(0 4px 20px rgba(255, 255, 255, 0.2));
          backdrop-filter: blur(10px);
          position: relative;
        }
        .liquid-glass-text::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          z-index: -1;
        }
        .liquid-glass-text-secondary {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          filter: drop-shadow(0 2px 10px rgba(255, 255, 255, 0.1));
        }
        .logo-mask {
          background-color: white;
          -webkit-mask-image: url("/pocsa-sin-fondo-logo-blanco.svg");
          mask-image: url("/pocsa-sin-fondo-logo-blanco.svg");
          -webkit-mask-position: 15%;
          mask-position: 15%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: clamp(3200vh, 110%, 0vh);
          mask-size: clamp(3200vh, 110%, 0vh);
        }
        .text-shadow-white {
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
