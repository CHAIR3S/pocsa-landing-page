"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function PocsaLanding() {
  useEffect(() => {
    const tl = gsap.timeline({
      ease: "power2.out",
      scrollTrigger: {
        scrub: 1,
      },
    });

    tl.to("#subtitle", {
      opacity: 0,
      duration: 0.1,
    })
    .to("#hero-title", {
      y: -50,
      opacity: 0,
      duration: 0.2,
    }, "<")
    .to("#logo-mask", {
      maskSize: "clamp(20vh, 25%, 30vh)",
    }, 0.3)
    ;
  }, []);

  return (
    <>
      {/* Navigation */}
      <header className="fixed w-full z-40 flex items-center justify-between  lg:px-12">
        <div className="flex items-center space-x-2 ">
          
          <Image src="/logo-pocsa-color.svg" alt="Icono" width={100} height={100} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 md:pl-[7vw]">
          <Link
            href="#"
            className="text-white/90 hover:text-white transition-colors font-medium"
          >
            HOME
          </Link>
          <Link
            href="#"
            className="text-white/90 hover:text-white transition-colors font-medium"
          >
            PRODUCTOS
          </Link>
          <Link
            href="#"
            className="text-white/90 hover:text-white transition-colors font-medium"
          >
            SERVICIOS
          </Link>
          <Link
            href="#"
            className="text-white/90 hover:text-white transition-colors font-medium"
          >
            GALERÍA
          </Link>
          <Link
            href="#"
            className="text-white/90 hover:text-white transition-colors font-medium"
          >
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
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md"
          >
            Cotizar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      
      <div id="logo-mask" className="fixed top-0 w-full h-screen ">

        <section className="">
          {/* Background Image */}
          <div className="fixed inset-0 z-10">
            <Image
              id="hero-bg"
              src="/images/living-room.jpg"
              alt="Modern living room interior"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center  min-h-[calc(100vh-120px)] px-6">
            <div className="fixed flex flex-col items-center justify-center">
              {/* Liquid Glass Text Effect */}
              <div id="hero-title" className="text-center mb-8">
                <h1 className="liquid-glass-text text-6xl md:text-8xl lg:text-9xl font-bold mb-4 pr-1.5 pb-2.5">
                  POCSA
                </h1>
                <h2 className="liquid-glass-text-secondary text-3xl md:text-5xl lg:text-6xl font-light mb-5">
                  MUEBLES
                </h2>
              </div>

              {/* Subtitle */}
              <p id="subtitle" className="text-white/90 text-lg md:text-xl text-center max-w-2xl mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/20">
                Diseños únicos que transforman espacios en experiencias
                extraordinarias
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
                  className="bg-transparent border-white/50 text-white hover:bg-white/10 backdrop-blur-md px-8 py-3 cursor-pointer p-5"
                >
                  Contactar Ahora
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <footer className="absolute bottom-8 left-6 right-6 z-10">
            <div className="fixed flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 w-[97%]">
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

          <style jsx>{`
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


            #logo-mask {
              background: white;
              mask-image: url('/logo-pocsa-color.svg');
              mask-position: center;
              mask-repeat: no-repeat;
              mask-size: clamp(50vh, 35%, 0vh);
            }


          `}</style>
        </section>
      </div>
    </>
  );
}
