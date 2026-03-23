import type { Metadata } from "next";
import Link from "next/link";
import InstagramShowcase from "@/components/InstagramShowcase";
import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import ServiceCardActions from "@/components/ServiceCardActions";
import { CATEGORIAS, SERVICIOS } from "@/config/data";
import {
  getAvailablePublicImages,
  hasAvailablePublicImage,
} from "@/lib/publicImages";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Inspirate con la linea visual actual del catalogo: vajilla, barra, servicio de mozo, manteleria, cascada de chocolate y robot LED para eventos.",
  alternates: {
    canonical: "/galeria",
  },
};

export default function GaleriaPage() {
  const availableImages = getAvailablePublicImages();

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Galeria e inspiracion
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Una vista rapida del estilo actual de la propuesta.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Esta galeria acompaña el catalogo real. A medida que sumemos mas
              fotos y mas productos, se ira volviendo mas completa.
            </p>
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
                fallbackSubtitle={index === 0 ? "Categoria actual" : "Coleccion"}
                sizes="(max-width: 1024px) 100vw, 24vw"
                className={`rounded-[2rem] ${
                  index === 0 ? "h-60 sm:col-span-2" : "h-44"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICIOS.map((service) => {
              const category = CATEGORIAS.find(
                (item) => item.id === service.categoriaId
              );

              return (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)]"
                >
                  <ProductImage
                    src={service.imagen}
                    hasImage={hasAvailablePublicImage(service.imagen, availableImages)}
                    alt={service.nombre}
                    imagePosition={service.imagePosition}
                    fallbackIcon={service.icono || category?.icono || "📦"}
                    fallbackTitle={service.nombre}
                    fallbackSubtitle={category?.nombre || "Servicio"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-56"
                  />
                  <div className="p-6">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                      {category?.nombre}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-secondary">
                      {service.nombre}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {service.descripcion}
                    </p>
                    <ServiceBadges items={service.idealPara} className="mt-4" />
                    <ServiceCardActions servicio={service} />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
            >
              Ver catalogo
            </Link>
            <Link
              href="/presupuesto"
              className="inline-flex items-center justify-center rounded-full border border-secondary/10 px-6 py-3 font-semibold text-secondary transition-colors hover:border-primary/30 hover:text-primary"
            >
              Pedir cotizacion
            </Link>
          </div>
        </div>
      </section>
      <InstagramShowcase />
    </>
  );
}
