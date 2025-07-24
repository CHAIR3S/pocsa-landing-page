import Image from "next/image"

export default function MaterialsSection() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Menu hamburger */}
      <div className="absolute top-12 right-12 z-10">
        <div className="space-y-2">
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-center px-16 py-20">
          {/* Main headline */}
          <h1 className="text-7xl xl:text-8xl font-bold leading-none mb-12 text-pink-400 max-w-2xl">
            Seleccionamos solo las mejores materias primas.
          </h1>

          {/* Description paragraph */}
          <p className="text-xl leading-relaxed text-white max-w-xl">
            Cada pieza de madera es cuidadosamente seleccionada por nuestros expertos. Trabajamos con roble europeo,
            nogal americano y cerezo natural. Nuestros herrajes provienen de fabricantes alemanes reconocidos
            mundialmente. Los acabados y lacas son de grado premium, garantizando durabilidad y belleza que perdura por
            generaciones.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 flex items-center justify-center p-16">
          <div className="relative">
            {/* Main framed image */}
            <div className="w-96 h-[500px] border-4 border-amber-100 overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=384&text=Madera+de+Roble+Premium"
                alt="Textura de madera de roble premium"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with additional images */}
      <div className="absolute bottom-0 left-0 right-0 p-16">
        <div className="flex justify-between items-end">
          {/* Left bottom image */}
          <div className="w-80 h-64 border-4 border-amber-100 overflow-hidden">
            <Image
              src="/placeholder.svg?height=256&width=320&text=Herrajes+Alemanes"
              alt="Herrajes premium alemanes"
              fill
              className="object-cover"
            />
          </div>

          {/* Right bottom image */}
          <div className="w-72 h-56 border-4 border-amber-100 overflow-hidden">
            <Image
              src="/placeholder.svg?height=224&width=288&text=Acabados+Premium"
              alt="Acabados y lacas premium"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}