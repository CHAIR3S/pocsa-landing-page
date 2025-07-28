"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
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

gsap.registerPlugin(ScrollTrigger);

export default function PocsaLanding() {
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wrapper2Ref = useRef<HTMLDivElement>(null);
  
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const productLines = [
    "Línea Metálica",
    "Línea de Almacenamiento",
    "Línea Escolar",
    "Línea para el Hogar",
    "Línea de Oficina",
  ]

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

    // Limpia triggers antiguos
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Timeline único para todo el scroll
    const tl = gsap.timeline({
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=200%",
        scrub: 1,
      },
    });

    tl.to(subtitleRef.current, { opacity: 0, duration: 0.1 })
      .to(heroTitleRef.current, { y: -50, opacity: 0, duration: 0.2 }, "<")
      .to(
        logoMaskRef.current,
        { maskSize: "clamp(15vh, 25%, 30vh)", duration: 0.2 },
        "<"
      )
      .to(imageRef.current, { opacity: 0, duration: 0.2 }, 0.08)
      // Aquí metemos la animación del texto en el mismo timeline 
      .fromTo(
        textRef.current,
        { x: "100%" }, // empieza fuera az la derecha
        {
          x: "-100%", // termina fuera a la izquierda
          ease: "none",
          duration: 0.3, 
        },
        "<" // empalma con la animación anterior
      )
      .to(
        wrapper2Ref.current,
        { position: "fixed", top: "35%", left: "45%", duration: 0 },
        "<"
      )
      .to(
        logoMaskRef.current,
        { autoAlpha: 0, duration: 0.1 }, //  animamos autoAlpha en vez de opacity
        0.3
      )
      .to(wrapper2Ref.current, { autoAlpha: 0, duration: 0.1 }, ">");

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      {/* Navigation */}
      <header className="fixed w-full z-50 flex items-center justify-between lg:px-12 glass-header">
        <div
          className=" space-x-2"
          style={{
            width: 100,
            height: 67,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/logo-pocsa-color.svg"
            alt="Icono"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 md:pl-[7vw]">
          <Link href="#" className="text-white/90 hover:text-white transition-colors font-medium">
            HOME
          </Link>

          {/* Dropdown de Productos */}
          <div className="relative">
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              onMouseEnter={() => setIsProductsOpen(true)}
              className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              PRODUCTOS
              <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`} />
            </button>

            {isProductsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-2"
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                {productLines.map((line, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-black transition-colors font-medium"
                  >
                    {line}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="#" className="text-white/90 hover:text-white transition-colors font-medium">
            SERVICIOS
          </Link>
          <Link href="#" className="text-white/90 hover:text-white transition-colors font-medium">
            GALERÍA
          </Link>
          <Link href="#" className="text-white/90 hover:text-white transition-colors font-medium">
            CONTACTO
          </Link>
        </nav>

        {/* Contact Info */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white/90">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+1 234 567 890</span>
          </div>
          <Button
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md cursorpoin"
          >
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
      >
        <section className="relative h-full">
          {/* Background Image */}
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src="/images/living-room.jpg"
              alt="Modern living room interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-6">
            <div className="flex flex-col items-center justify-center">
              {/* Liquid Glass Text Effect */}
              <div ref={heroTitleRef} className="text-center mb-8">
                <h1 className="liquid-glass-text text-6xl md:text-8xl lg:text-9xl font-bold mb-4 pr-1.5 pb-2.5">
                  POCSA
                </h1>
                <h2 className="liquid-glass-text-secondary text-3xl md:text-5xl lg:text-6xl font-light mb-5">
                  MUEBLES
                </h2>
              </div>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-white/90 text-lg md:text-xl text-center max-w-2xl mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/20"
              >
                Somos una empresa especializada en la fabricación de una amplia
                gama de muebles personalizados de alta calidad. Nuestro
                compromiso es transformar tus ideas en piezas únicas que
                reflejen tu estilo y necesidades.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-5">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-8 py-3 cursor-pointer"
                >
                  Ver Catálogo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
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
                  <span>info@pocsamuebles.com</span>
                </div>
              </div>
              <div className="text-white/60 text-sm">
                © 2024 POCSA Muebles. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </section>
      </div>

      <div className="h-[90vh]" />

      {/* — Sección extra con el texto que revelamos — */}
      <section className="relative z-30 bg-[#111]">
        <section className="min-h-screen p-8 flex items-center justify-center">
          <div
            ref={wrapper2Ref}
            className="relative w-full max-w-3xl h-64 overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <div
              ref={textRef}
              className="absolute whitespace-nowrap text-white text-6xl font-bold top-1/2 left-0"
              style={{ transform: "translateY(-50%)" }}
            >
              USTED LO IMAGINA, NOSOTROS LO HACEMOS REALIDAD
            </div>
          </div>
        </section>
      </section>

      {/* <MaterialsSection /> */}
      <div className=" w-screen h-[90vh] "></div>

      <section className=" w-screen h-screen bg-red-500"></section>

      <section className=" w-screen  bg-[#111] z-[200]">
        <h2 className="relative top-[-8vh] left-[6vw] text-7xl font-bold ">
          Nuestros
        </h2>
        <h2 className="relative top-[-8vh] left-[10vw] text-7xl font-bold">
          Productos
        </h2>

        {/* Bento grid products */}

        <BentoGrid />
      </section>

      {/* Clients Carousel */}

      <ClientsCarousel />

      <section
        className="w-screen h-screen "
        style={{
          backgroundImage: "url('/images/psicologo-foto.jpg')",
          backgroundSize: "cover",
        }}
      ></section>

      <section className="w-screen h-screen bg-[#111] flex flex-row container">
        <div className="w-1/2 h-full flex items-center justify-center">
          <FurAnimation width={600} height={723} />
        </div>

        <div className="w-1/2 h-full px-[10vw] ">
          <h3 className="relative top-[-2vh] text-7xl font-bold">
            Calidad y durabilidad en cada diseño
          </h3>

          <h4 className="relative left-[-5vw] py-[5vh] text-4xl text-[#c8f7bb] font-semibold ">
            Muebles a tu medida, listos para inspirar.
          </h4>

          <div className="mt-[10vh]">
            <span className="text-2xl font-bold ">
              Creamos muebles personalizados con materiales premium,
              certificados bajo los más altos estándares de
            </span>
            <span className="text-2xl font-bold text-[#3b94d0]">
              {" "}
              Marca Guanajuato
            </span>
            <span className="text-2xl font-bold ">
              , para garantizar belleza, resistencia y satisfacción total.
            </span>
          </div>
        </div>
      </section>

      <section
        className="w-screen h-screen bg-black/10 bg-blend-multiply"
        style={{
          clipPath: "polygon(0 0%, 100% 0, 100% 95%, 0% 100%)",
          backgroundImage: 'url("/images/oficina-portada-horizontal.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "80% center",
        }}
      >
        {/* <h3 className="text-7xl font-semibold relative top-[13%] right-[-40%] t">&lt;&lt;Comodidad y Elegancia.&gt;&gt;</h3> */}
        <h3 className="relative top-[13%] right-[-40%] text-7xl font-semibold">
          {/* Apertura */}
          <span className="text-4xl align-top leading-none">«</span>
          Comodidad y Elegancia.
          {/* Cierre */}
          <span className="text-4xl align-bottom leading-none">»</span>
        </h3>
      </section>


      <section className="w-screen h-screen bg-[#111] flex items-center justify-center">
        <h3 className="text-8xl font-semibold">Hacemos envíos a todo México!!</h3>
      </section>


      {/* Formulario de Contacto */}
      <ContactForm />

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
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
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
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          border-radius: 20px;
          backdrop-filter: blur(20px);
          z-index: -1;
        }

        .liquid-glass-text-secondary {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          filter: drop-shadow(0 2px 10px rgba(255, 255, 255, 0.1));
        }

        .logo-mask {
          background-color: white;
          -webkit-mask-image: url("/logo-pocsa-color.svg");
          mask-image: url("/logo-pocsa-color.svg");
          -webkit-mask-position: 35%;
          mask-position: 35%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: clamp(2300vh, 100%, 0vh);
          mask-size: clamp(2300vh, 100%, 0vh);
        }
      `}</style>
    </>
  );
}
