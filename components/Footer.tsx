"use client"

import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-screen bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Únete a POCSA Hoy.</h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light">Haciendo Más Juntos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Dirección */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dirección</h3>
            <p className="text-gray-300 leading-relaxed">
              Boulevard #123, Col. Centro
              <br />
              Celaya, Guanajuato, México
              <br />
              C.P. 37000
            </p>
          </div>

          {/* Teléfono */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Número de Teléfono</h3>
            <p className="text-gray-300">(555) 123-4567</p>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-300">info@pocsamuebles.com</p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">© 2025 POCSA Muebles. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
