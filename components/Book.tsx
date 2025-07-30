import Image from "next/image";
import HTMLFlipBook from "react-pageflip";


const pages = [
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0001.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0002.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0003.jpg",
  "/pdfs/catalog/2025-03-10_TNM_CELAYA_LAII-A_T3EQ_03_21030090_HURTADO_GONZÁLEZ_OSCAR_ENE-JUN25_page-0004.jpg",
];


function Book() {

  return (
    <HTMLFlipBook className="bg-white text-slate-800" width={600} height={800}>
      {pages.map((src, index) => (
        <div key={index} className="relative w-full h-full">
          <Image
            src={src}
            alt={`Página ${index + 1}`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </HTMLFlipBook>
  );
}

export default Book;
