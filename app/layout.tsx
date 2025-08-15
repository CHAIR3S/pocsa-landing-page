// app/layout.tsx
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

// ====== CONSTANTES DEL SITIO ======
const SITE_URL = "https://pocsamuebles.com"; // <-- AJUSTA si usas otro dominio
const metadataBase = new URL(SITE_URL);
const OG_IMAGE = `${SITE_URL}/logo-color.png?v=1`;

// ====== REDES SOCIALES ======
const INSTAGRAM_URL = "https://www.instagram.com/pocsamofic/";
const FACEBOOK_URL = "https://www.facebook.com/POCSA-Muebles-de-Oficina-de-Celaya"; // <-- AJUSTA si tu URL es distinta

// ====== SEO helpers (estados + categorías) ======
const ESTADOS_MX = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua",
  "Ciudad de México","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco",
  "México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo",
  "San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"
];

const CATEGORIAS = [
  "muebles de oficina","muebles para hogar","muebles para comercio","melaminas",
  "escritorios","sillas","archiveros","closets","cocinas","recepciones","salas de espera"
];

const KEYWORDS: string[] = [
  "Pocsa Muebles","mueblería en Celaya","muebles a medida","muebles sobre diseño",
  ...ESTADOS_MX.map(e => `mueblería en ${e}`),
  ...ESTADOS_MX.map(e => `muebles de oficina en ${e}`),
  ...ESTADOS_MX.map(e => `muebles para hogar en ${e}`),
  ...CATEGORIAS,
];

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Pocsa Muebles | Diseño y Calidad", template: "%s | Pocsa Muebles" },
  description:
    "Muebles personalizados de alta calidad para oficina, hogar y comercio. Fabricación a medida en México: diseño, durabilidad y entrega confiable.",
  keywords: KEYWORDS,
  applicationName: "Pocsa Muebles",
  category: "Furniture",
  alternates: { canonical: "/", languages: { "es-MX": "/" } },
  robots: {
    index: true, follow: true, nocache: false,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 }
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pocsa Muebles",
    locale: "es_MX",
    title: "Pocsa Muebles | Diseño y Calidad",
    description:
      "Fabricación de muebles a medida para oficina, hogar y comercio en todo México. Calidad, diseño y servicio profesional.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Logo de Pocsa Muebles" }]
  },
  // Sin X/Twitter por ahora; cuando tengas usuario me lo pasas.
  twitter: {
    card: "summary_large_image",
    title: "Pocsa Muebles | Diseño y Calidad",
    description: "Muebles a medida para oficina, hogar y comercio. Diseño y calidad en México.",
    images: [OG_IMAGE]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ====== JSON-LD (Schema.org) ======
  const ldOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pocsa Muebles",
    url: SITE_URL,
    logo: OG_IMAGE,
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "LikeAction" },
        userInteractionCount: 91,             // Me gusta en Facebook
        location: FACEBOOK_URL
      },
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "FollowAction" },
        userInteractionCount: 96,             // Seguidores en Facebook
        location: FACEBOOK_URL
      }
    ]
  };

  const ldSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pocsa Muebles",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const ldStore = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Pocsa Muebles",
    url: SITE_URL,
    image: OG_IMAGE,
    address: { "@type": "PostalAddress", addressCountry: "MX" },
    areaServed: ESTADOS_MX,
    makesOffer: CATEGORIAS.map(c => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c }
    })),
    priceRange: "$$",
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL]
  };

  return (
    <html lang="es-MX" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* og:see_also para reforzar relación con redes */}
        <meta property="og:see_also" content={INSTAGRAM_URL} />
        <meta property="og:see_also" content={FACEBOOK_URL} />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {/* JSON-LD */}
        <script type="application/ld+json" suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrg) }} />
        <script type="application/ld+json" suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldSite) }} />
        <script type="application/ld+json" suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldStore) }} />
        {children}
      </body>
    </html>
  );
}
