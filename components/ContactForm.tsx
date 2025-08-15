"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

type FormState = "idle" | "sending" | "sent" | "error";

const OPTIONS = [
  { value: "islas", label: "Islas" },
  { value: "escolar", label: "Escolar" },
  { value: "hogar", label: "Hogar" },
  { value: "modulos-ejecutivos", label: "Módulos Ejecutivos" },
  { value: "mesas-de-juntas", label: "Mesas de Juntas" },
  { value: "recepciones", label: "Recepciones" },
];

const TO_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_TO || "pocsaproyectos@gmail.com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interestedIn: "",
    phone: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  // --- Dropdown state
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildSubject = () => {
    const { name, interestedIn } = formData;
    return `Contacto Web: ${name || "Sin nombre"} — ${
      interestedIn || "Sin categoría"
    }`;
  };

  const buildBody = () => {
    const { name, email, interestedIn, phone, message } = formData;
    const lines = [
      "Nuevo mensaje desde el sitio POCSA",
      "---------------------------------",
      `Nombre: ${name || "No proporcionado"}`,
      `Correo: ${email || "No proporcionado"}`,
      `Teléfono: ${phone || "No proporcionado"}`,
      `Interesado en: ${interestedIn || "No especificado"}`,
      "",
      "Mensaje:",
      message || "(Sin mensaje)",
      "",
      "—",
      "Enviado automáticamente desde el formulario web.",
    ];
    return lines.join("\n");
  };

  const openGmailCompose = (to: string, subject: string, body: string) => {
    const url =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(to)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");

    // Fallback a mailto si el popup fue bloqueado
    if (!win) {
      const mailto = `mailto:${encodeURIComponent(
        to
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;
      window.location.href = mailto;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Abre Gmail con el borrador listo (no usa servidor ni contraseñas)
    openGmailCompose(TO_EMAIL, buildSubject(), buildBody());

    // Feedback visual
    setFormState("sent");
    setFormData({
      name: "",
      email: "",
      interestedIn: "",
      phone: "",
      message: "",
    });
    setTimeout(() => setFormState("idle"), 3000);
  };

  const selectLabel =
    OPTIONS.find((o) => o.value === formData.interestedIn)?.label ||
    "Selecciona una categoría";

  return (
    <section className="w-screen py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Ponte en contacto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent !text-gray-900 placeholder:text-gray-400 caret-black focus:border-black focus:outline-none transition-colors"
                    style={{ WebkitTextFillColor: "#111827" }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent !text-gray-900 placeholder:text-gray-400 caret-black focus:border-black focus:outline-none transition-colors"
                    style={{ WebkitTextFillColor: "#111827" }}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Dropdown de categorías bonito */}
                <div ref={boxRef}>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Interesado en
                  </span>
                  <div className="relative">
                    <button
                      ref={btnRef}
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={open}
                      onClick={() => {
                        setOpen(!open);
                        const i = OPTIONS.findIndex(
                          (o) => o.value === formData.interestedIn
                        );
                        setHighlight(i >= 0 ? i : 0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpen(true);
                          setHighlight((h) => (h + 1) % OPTIONS.length);
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setOpen(true);
                          setHighlight(
                            (h) => (h - 1 + OPTIONS.length) % OPTIONS.length
                          );
                        } else if (e.key === "Enter" && open) {
                          e.preventDefault();
                          const opt = OPTIONS[highlight];
                          setFormData((f) => ({
                            ...f,
                            interestedIn: opt.value,
                          }));
                          setOpen(false);
                        } else if (e.key === "Escape") {
                          setOpen(false);
                        }
                      }}
                      className={clsx(
                        "w-full text-left px-4 py-3 border-b-2 bg-transparent transition-colors",
                        open ? "border-black" : "border-gray-300",
                        "focus:outline-none !text-gray-900"
                      )}
                      style={{ WebkitTextFillColor: "#111827" }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={clsx(
                            selectLabel ? "text-gray-900" : "text-gray-400"
                          )}
                        >
                          {selectLabel}
                        </span>
                        <ChevronDown
                          className={clsx(
                            "w-4 h-4 transition-transform",
                            open && "rotate-180"
                          )}
                        />
                      </div>
                    </button>

                    {/* Panel estilo “header de categorías” */}
                    <div
                      className={clsx(
                        "absolute left-1/2 -translate-x-1/2 z-20 mt-3 w-[22rem]",
                        "rounded-2xl border border-black/5 bg-white/90 backdrop-blur shadow-2xl",
                        "transition-all duration-150",
                        open
                          ? "opacity-100 scale-100"
                          : "pointer-events-none opacity-0 scale-95"
                      )}
                    >
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {OPTIONS.map((opt, idx) => {
                          const selected = formData.interestedIn === opt.value;
                          const active = idx === highlight;
                          return (
                            <button
                              key={opt.value}
                              role="option"
                              aria-selected={selected}
                              onMouseEnter={() => setHighlight(idx)}
                              onClick={() => {
                                setFormData((f) => ({
                                  ...f,
                                  interestedIn: opt.value,
                                }));
                                setOpen(false);
                                btnRef.current?.focus();
                              }}
                              className={clsx(
                                "group flex items-center justify-between rounded-xl px-3 py-3 text-sm",
                                "border border-transparent",
                                active && "bg-gray-100 border-gray-200",
                                selected && "ring-1 ring-green-500/50"
                              )}
                            >
                              <span className="font-medium text-gray-900">
                                {opt.label}
                              </span>
                              {selected && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <div className="px-3 pb-3">
                        <div className="text-[11px] text-gray-500">
                          Selecciona una categoría para tu consulta.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent !text-gray-900 placeholder:text-gray-400 caret-black focus:border-black focus:outline-none transition-colors"
                    style={{ WebkitTextFillColor: "#111827" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent !text-gray-900 placeholder:text-gray-400 caret-black focus:border-black focus:outline-none transition-colors resize-none"
                  style={{ WebkitTextFillColor: "#111827" }}
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={formState === "sending"}
                  className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  {formState === "sending" ? "Enviando..." : "Enviar"}
                </Button>

                {formState === "sent" && (
                  <span className="text-sm text-green-600">¡Borrador abierto en Gmail!</span>
                )}
                {formState === "error" && (
                  <span className="text-sm text-red-600">
                    Hubo un error. Intenta de nuevo.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#71e056]" />
                Llámanos
              </h3>
              <p className="text-gray-600 mb-2">
                Lunes a Viernes 9:00–18:00 · Sábado 9:00–14:00
              </p>
              <a
                href="tel:+524612191762"
                aria-label="Llamar al 461 219 1762"
                className="group inline-flex items-center gap-2 text-gray-900 font-medium hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#71e056]/30 rounded-md"
              >
                <span className="underline underline-offset-4 decoration-[#71e056]/30 group-hover:decoration-[#71e056] pt-1">
                  461 219 1762
                </span>
              </a>
              <p className="mt-2 text-xs text-gray-500">Haz clic para llamar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
