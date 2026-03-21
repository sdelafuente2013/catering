import type { Metadata } from "next";
import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import ServiceCardActions from "@/components/ServiceCardActions";
import {
  CATEGORIAS,
  EMPRESA,
  SERVICIOS,
  formatDetallePrecio,
  formatPrecioOConsulta,
} from "@/config/data";
import {
  getAvailablePublicImages,
  hasAvailablePublicImage,
} from "@/lib/publicImages";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conoce las opciones reales disponibles hoy: pack grande de vasijas, fuente de chocolate y robot LED para eventos en Zona Norte.",
  alternates: {
    canonical: "/servicios",
  },
};

export default function ServiciosPage() {
  const availableImages = getAvailablePublicImages();

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="eyebrow text-primary">
            <span className="accent-dot" />
            Servicios disponibles hoy
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
            Una seleccion puntual y pensada para resolver bien una parte del evento.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            {EMPRESA.descripcion} Si buscas algo fuera de estas opciones, igual
            puedes escribirnos y te decimos con honestidad si hoy podemos ayudarte.
          </p>
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
                  className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)]"
                >
                  <ProductImage
                    src={service.imagen}
                    hasImage={hasAvailablePublicImage(service.imagen, availableImages)}
                    alt={service.nombre}
                    imagePosition={service.imagePosition}
                    fallbackIcon={category?.icono || "📦"}
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
                    <div className="mt-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                        Incluye
                      </p>
                      <ul className="mt-3 space-y-1.5 text-sm text-muted">
                        {service.incluye.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <ul className="mt-5 space-y-1.5 text-sm text-muted">
                      {service.detalles.map((detail) => (
                        <li key={detail}>• {detail}</li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrecioOConsulta(
                            service.precioUnitario,
                            service.precioDesde
                          )}
                        </p>
                        <p className="text-sm text-muted">
                          {formatDetallePrecio(
                            service.precioUnitario,
                            service.unidad,
                            service.precioDesde
                          )}
                        </p>
                      </div>
                    </div>
                    <ServiceCardActions servicio={service} />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-[2rem] bg-accent px-6 py-10 text-center">
            <h2 className="font-display text-4xl font-semibold leading-none text-secondary">
              Seguimos ampliando la propuesta.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted">
              Preferimos sumar opciones con criterio y mantener una web realista.
              Si estas buscando algo puntual para tu evento, consúltanos igual.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
