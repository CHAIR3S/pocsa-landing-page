
import "./globals.css";


import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata = {
  title: "Pocsa Muebles | Diseño y Calidad",
  description:
    "Muebles personalizados, modernos y duraderos. Transformamos tus espacios con diseño y calidad.",
  openGraph: {
    title: "Pocsa Muebles",
    description:
      "Transforma tu hogar con muebles de diseño, hechos a medida y con los mejores materiales.",
    url: "https://pocsamuebles.com",
    siteName: "Pocsa Muebles",
    images: [
      {
        url: "/og-image.jpg", // Debe estar en /public
        width: 1200,
        height: 630,
        alt: "Muebles Pocsa",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pocsa Muebles",
    description:
      "Diseño, calidad y durabilidad para tu hogar y oficina.",
    images: ["/og-image.jpg"],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Aquí colocas las variables de font si las necesitas en CSS:
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      {/* Al body le pones la clase que inyecta NextFont */}
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
