'use client'

import { Truck, MapPin, Clock, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ShippingSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 bg-transparent relative overflow-hidden w-full h-full">
      {/* ✅ Capa de gradiente PROPIA que no depende del fondo global */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(900px 480px at 18% 28%, rgba(119,235,118,0.18), rgba(119,235,118,0) 62%),
            radial-gradient(760px 420px at 82% 76%, rgba(48,52,144,0.22), rgba(48,52,144,0) 60%),
            linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.55))
          `,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto, auto, cover',
          backgroundPosition: '18% 28%, 82% 76%, center',
          filter: 'saturate(1.04) brightness(1.02)',
        }}
      />

      {/* Brillos verdes extra (si quieres mantenerlos) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#77eb76]/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-[#77eb76]/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título principal con animación */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-[#77eb76] animate-bounce"></div>
            <Truck className="w-8 h-8 text-[#77eb76] animate-bounce delay-200" />
            <div className="w-1 h-8 bg-[#77eb76] animate-bounce delay-400"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ENVÍOS A
          </h1>
          
          <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-[#77eb76] mb-4 animate-glow">
              TODO MÉXICO
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#77eb76] rounded-full animate-expand"></div>
          </div>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Llevamos tus muebles hasta tu hogar en cualquier parte del país
          </p>
        </div>

        {/* Estadísticas con animación */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-20 h-20 mx-auto mb-4 relative group">
              <div className="absolute inset-0 bg-[#77eb76]/20 rounded-full animate-ping"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center border-2 border-[#77eb76] group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-[#77eb76]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">32 Estados</h3>
            <p className="text-gray-400">Cobertura nacional</p>
          </div>

          <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-20 h-20 mx-auto mb-4 relative group">
              <div className="absolute inset-0 bg-[#77eb76]/20 rounded-full animate-ping delay-200"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center border-2 border-[#77eb76] group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-[#77eb76]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">5-15 Días</h3>
            <p className="text-gray-400">Entrega rápida</p>
          </div>

          <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-20 h-20 mx-auto mb-4 relative group">
              <div className="absolute inset-0 bg-[#77eb76]/20 rounded-full animate-ping delay-500"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center border-2 border-[#77eb76] group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-[#77eb76]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Seguro</h3>
            <p className="text-gray-400">Protección total</p>
          </div>
        </div>

        {/* Proceso simple */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            ¿Cómo <span className="text-[#77eb76]">funciona?</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#77eb76] text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:animate-bounce">
                1
              </div>
              <h4 className="font-semibold text-white mb-2">Haz tu pedido</h4>
              <p className="text-gray-400 text-sm">Selecciona tus muebles</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#77eb76] text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:animate-bounce delay-200">
                2
              </div>
              <h4 className="font-semibold text-white mb-2">Preparamos envío</h4>
              <p className="text-gray-400 text-sm">Embalamos con cuidado</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#77eb76] text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:animate-bounce delay-500">
                3
              </div>
              <h4 className="font-semibold text-white mb-2">Recibe en casa</h4>
              <p className="text-gray-400 text-sm">Disfruta tus muebles</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="group relative px-8 py-4 bg-[#77eb76] text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#77eb76]/25 hover:scale-105">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <Truck className="w-6 h-6 group-hover:animate-bounce" />
              Consultar envío
            </div>
          </button>
          
          <p className="text-gray-500 mt-4 text-sm">
            Calculamos el costo según tu ubicación
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #77eb76; }
          50% { text-shadow: 0 0 30px #77eb76, 0 0 40px #77eb76; }
        }
        @keyframes expand {
          0% { width: 0; }
          100% { width: 8rem; }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
      `}</style>
    </section>
  )
}
