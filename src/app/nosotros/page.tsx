import type { Metadata } from "next";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { CATEGORIAS, EMPRESA, SERVICIOS } from "@/config/data";
import {
  getAvailablePublicImages,
  hasAvailablePublicImage,
} from "@/lib/publicImages";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce una propuesta clara y cuidada para eventos en Zona Norte, con foco en atencion directa y servicios reales disponibles hoy.",
  alternates: {
    canonical: "/nosotros",
  },
};

const VALUES = [
  {
    title: "Mostrar lo real",
    description:
      "Preferimos exhibir solo lo que hoy podemos alquilar bien y responder con claridad sobre disponibilidad y armado.",
  },
  {
    title: "Atencion cercana",
    description:
      "La idea es responder rapido, ordenar la consulta y decirte con claridad si podemos tomar tu evento.",
  },
  {
    title: "Evolucion constante",
    description:
      "Vamos sumando opciones con criterio, sin prometer categorias que todavia no existen y cuidando la calidad del servicio.",
  },
];

export default function NosotrosPage() {
  const availableImages = getAvailablePublicImages();

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Quienes somos
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Una propuesta simple, cuidada y honesta para eventos en Zona Norte.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              {EMPRESA.descripcion} Nos interesa que la web refleje exactamente
              eso: una oferta concreta, buena atencion y una forma de trabajo
              clara para resolver consultas rapido.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Hoy disponible
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {SERVICIOS.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  opciones reales para alquilar.
                </p>
              </div>
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Cobertura
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {EMPRESA.localidad}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  con base en Don Torcuato.
                </p>
              </div>
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Atencion
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">24 hs</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  principalmente por WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CATEGORIAS.map((category, index) => (
              <ProductImage
                key={category.id}
                src={category.imagen}
                hasImage={hasAvailablePublicImage(category.imagen, availableImages)}
                alt={category.nombre}
                imagePosition={category.imagePosition}
                fallbackIcon={category.icono}
                fallbackTitle={category.nombre}
                fallbackSubtitle={index === 0 ? "Disponible hoy" : "Catalogo actual"}
                sizes="(max-width: 1024px) 100vw, 24vw"
                className={`rounded-[2rem] ${
                  index === 0 ? "h-64 sm:col-span-2" : "h-44"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {VALUES.map((item) => (
              <div key={item.title} className="soft-panel rounded-[2rem] p-6">
                <h2 className="font-display text-3xl font-semibold leading-none text-secondary">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-secondary px-6 py-10 text-center text-white sm:px-10">
            <span className="eyebrow bg-white/8 text-primary">
              <span className="accent-dot" />
              Proximo paso
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none">
              Si una de estas opciones te sirve, te respondemos rapido por WhatsApp.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-300">
              No hace falta navegar mucho: puedes ir al catalogo, elegir lo que
              te interesa y consultarnos directo para confirmar disponibilidad.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
              >
                Ver catalogo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors hover:border-primary/35 hover:bg-white/5"
              >
                Hablar con nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
