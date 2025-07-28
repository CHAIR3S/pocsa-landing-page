"use client"

import Image from "next/image"

const ClientsCarousel = () => {
  // Array de logos de clientes (puedes agregar más logos aquí)
  const clientLogos = [
    {
      id: 1,
      name: "Universidad de Guanajuato",
      src: "/images/universidad-guanajuato.png",
      width: 200,
      height: 120,
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
      height: 80,
    },
    {
      id: 12,
      name: "geely",
      src: "/images/logo/geely.png",
      width: 160,
      height: 80,
    },
    {
      id: 13,
      name: "agricultores el fuente",
      src: "/images/logo/agricultores el fuente.png",
      width: 160,
      height: 80,
    },
  ]

  // duplicar logos efecto
  const duplicatedLogos = [...clientLogos, ...clientLogos]

  return (
    <section className="py-[16vh] bg-white" style={{clipPath: "polygon(0 3%, 100% 0, 100% 100%, 0% 100%)"}}>
    {/* <section className="py-[16vh] bg-[#111]"> */}
      <div className="container mx-auto px-6">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Nuestros Clientes</h2>
          {/* <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestros Clientes</h2> */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empresas e instituciones que confían en la calidad y profesionalismo de POCSA Muebles
          </p>
        </div>

        {/* Carrusel de logos */}
        <div className="relative overflow-hidden">
          {/* Gradientes laterales para efecto de desvanecimiento */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Contenedor del carrusel */}
          <div
            className="flex animate-scroll hover:pause-animation"
            style={{
              width: `${duplicatedLogos.length * 250}px`,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-[250px] h-[120px] flex items-center justify-center px-8"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    // className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                    className="max-w-full max-h-full object-contain  transition-all duration-300  hover:opacity-100"
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texto adicional */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">Más de 500 clientes satisfechos nos respaldan</p>
        </div>
      </div>

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
    </section>
  )
}

export default ClientsCarousel
