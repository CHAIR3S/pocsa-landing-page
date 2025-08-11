"use client";

import React from "react";
import { FurAnimation } from "./WebMAnimation";

// util simple para combinar clases (sin depender de nada)
function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

// Badge propio (pill)
export function BadgePill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        "text-white/80 bg-white/5 backdrop-blur-sm",
        "ring-1 ring-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
        className
      )}
    >
      {children}
    </span>
  );
}

const brandGreen = "#77eb76";
const brandBlue = "#3b94d0";

export default function CalidadSection({
  className,
  furWidth = 600,
  furHeight = 723,
}: {
  className?: string;
  furWidth?: number;
  furHeight?: number;
}) {
  return (
    <section
      aria-labelledby="calidad-durabilidad-heading"
      className={cx(
        "relative isolate w-full min-h-screen bg-black text-white flex items-center",
        className
      )}
    >
      {/* Fondo decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Manchas/gradientes */}
        <div
          className="absolute left-[-20%] top-[-20%] h-[50vw] w-[50vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(119,235,118,0.14), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-15%] bottom-[-25%] h-[55vw] w-[55vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,148,208,0.16), transparent 70%)",
          }}
        />
        {/* Rejilla sutil */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Desvanecido central */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(60% 60% at 60% 50%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 60% 50%, black 50%, transparent 100%)",
            background:
              "radial-gradient(60% 60% at 60% 50%, rgba(0,0,0,0.25), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div className="order-2 md:order-1 flex items-center justify-center">
            <figure className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background: `linear-gradient(135deg, ${brandGreen}33, ${brandBlue}33)`,
                }}
              />
              {/* Tu componente EXACTO */}
              <FurAnimation width={furWidth} height={furHeight} />
              <figcaption className="sr-only">
                Textura animada que representa la calidad de acabados
              </figcaption>
            </figure>
          </div>

          {/* Texto */}
          <div className="order-1 md:order-2">
            <BadgePill className="mb-5">Hecho a medida</BadgePill>

            <h2
              id="calidad-durabilidad-heading"
              className="font-semibold leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Calidad y durabilidad en cada diseño
            </h2>

            <p
              className="mt-3 font-medium bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${brandGreen}, ${brandBlue})`,
                fontSize: "clamp(1.125rem, 2.4vw, 1.75rem)",
              }}
            >
              Muebles a tu medida, listos para inspirar.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: brandBlue }}
                aria-hidden="true"
              />
              <span>
                Materiales certificados —{" "}
                <span className="font-medium" style={{ color: brandBlue }}>
                  Marca Guanajuato
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
