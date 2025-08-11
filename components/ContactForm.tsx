"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MapPin } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interestedIn: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para enviar el formulario
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="w-screen py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ponte en contacto</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-700 mb-2">
                    Interesado en
                  </label>
                  <select
                    id="interestedIn"
                    name="interestedIn"
                    value={formData.interestedIn}
                    onChange={handleChange}
                    className="text-black w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="linea-metalica">Islas</option>
                    <option value="linea-almacenamiento">Escolar</option>
                    <option value="linea-escolar">Hogar</option>
                    <option value="linea-hogar">Módulos Ejecutivos</option>
                    <option value="linea-oficina">Mesas de Juntas</option>
                    <option value="cotizacion">Recepciones</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="text-black w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  required
                />
              </div>

              <Button type="submit" className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors cursor-pointer">
                Enviar
              </Button>
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
                Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM y Sábados de 9 AM a 2 PM para atender tus consultas.
              </p>
<a
  href="tel:+524616133018"
  aria-label="Llamar al 461 613 3018"
  className="group inline-flex items-center gap-2 text-gray-900 font-medium
             hover:text-black transition-colors focus:outline-none
             focus-visible:ring-2 focus-visible:ring-[#71e056]/30 rounded-md"
>
  {/* <Phone className="w-4 h-4 text-[#71e056] transition-transform group-hover:scale-110" /> */}
  <span className="underline underline-offset-4 decoration-[#71e056]/30 group-hover:decoration-[#71e056] pt-1">
    461 613 3018
  </span>
</a>


<p className="mt-2 text-xs text-gray-500">Haz clic para llamar.</p>

            </div>

            {/* <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#71e056]" />
                Visítanos
              </h3>
              <p className="text-gray-600 mb-2">
                Ven a conocer nuestro showroom y taller donde podrás ver la calidad de nuestros muebles.
              </p>
              <p className="text-[#71e056] font-semibold">
                Bouleveard #123, Col. Centro
                <br />
                Celaya, Guanajuato, México
              </p>
            </div> */}

          </div>
        </div>

        {/* Mapa */}
        {/* <div className="mt-16">
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 text-lg">Mapa Celaya</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}
