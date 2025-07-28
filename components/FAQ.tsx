"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    question: "¿Cuánto tiempo toma fabricar un mueble personalizado?",
    answer:
      "El tiempo de fabricación varía según la complejidad del proyecto. Generalmente, nuestros muebles personalizados toman entre 2 a 4 semanas desde la confirmación del diseño y el pago inicial. Para proyectos más grandes o complejos, el tiempo puede extenderse hasta 6 semanas.",
  },
  {
    question: "¿Ofrecen garantía en sus productos?",
    answer:
      "Sí, todos nuestros muebles cuentan con garantía de 2 años contra defectos de fabricación. Además, ofrecemos servicio de mantenimiento y reparación durante el primer año sin costo adicional. Nuestros productos están certificados bajo los estándares de Marca Guanajuato.",
  },
  {
    question: "¿Realizan entregas a domicilio?",
    answer:
      "Absolutamente. Realizamos entregas a todo México. Para el área metropolitana de León, Guanajuato, la entrega es gratuita. Para otras ciudades, el costo de envío se calcula según la distancia y el tamaño del pedido. También ofrecemos servicio de instalación profesional.",
  },
  {
    question: "¿Puedo ver los materiales antes de hacer mi pedido?",
    answer:
      "Por supuesto. Te invitamos a visitar nuestro showroom donde podrás ver y tocar todos los materiales disponibles. También podemos enviarte muestras de materiales por correo si no puedes visitarnos. Contamos con una amplia gama de maderas, metales y acabados.",
  },
  {
    question: "¿Aceptan diseños personalizados completamente únicos?",
    answer:
      "Sí, esa es nuestra especialidad. Nuestro equipo de diseñadores trabajará contigo para crear el mueble exacto que tienes en mente. Desde el concepto inicial hasta el producto final, nos aseguramos de que cada detalle cumpla con tus expectativas y necesidades específicas.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos múltiples formas de pago: efectivo, transferencias bancarias, tarjetas de crédito y débito, y pagos en línea. Para proyectos grandes, ofrecemos planes de financiamiento sin intereses hasta 12 meses. Requerimos un anticipo del 50% para iniciar la fabricación.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Título */}
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Preguntas frecuentes.</h2>
          </div>

          {/* Preguntas */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between text-left py-4 hover:text-gray-600 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="pb-4 pr-8">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
