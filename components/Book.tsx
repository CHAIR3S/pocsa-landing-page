"use client";

import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pages = [
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0001.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0002.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0003.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0004.jpg",
];

function Book() {
  const bookRef = useRef<any>(null); // Referencia al flipbook

  const goPrevPage = () => bookRef.current?.pageFlip().flipPrev();
  const goNextPage = () => bookRef.current?.pageFlip().flipNext();

  return (
    <div className="relative w-fit mx-auto flex items-center justify-center gap-4">
      {/* Botón izquierdo */}
      <button
        onClick={goPrevPage}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
      >
        <ChevronLeft className="w-6 h-6 text-slate-700" />
      </button>

      {/* El libro */}
      <HTMLFlipBook
        ref={bookRef}
        width={600}
        height={800}
        className="bg-white text-slate-800 shadow-xl"
      >
        {pages.map((src, index) => (
          <div
            key={index}
            className="w-[600px] h-[800px] relative"
          >
            <Image
              src={src}
              alt={`Página ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority={index === 0}
            />
          </div>
        ))}
      </HTMLFlipBook>

      {/* Botón derecho */}
      <button
        onClick={goNextPage}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow"
      >
        <ChevronRight className="w-6 h-6 text-slate-700" />
      </button>
    </div>
  );
}

export default Book;
