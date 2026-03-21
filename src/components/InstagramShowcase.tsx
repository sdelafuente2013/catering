import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import { EMPRESA, SERVICIOS } from "@/config/data";
import {
  getAvailablePublicImages,
  hasAvailablePublicImage,
} from "@/lib/publicImages";

export default function InstagramShowcase() {
  const instagramUrl = EMPRESA.redesSociales.instagram;
  const availableImages = getAvailablePublicImages();

  if (!instagramUrl) {
    return null;
  }

  return (
    <section className="section-shell bg-mesh-light py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Instagram
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-secondary sm:text-5xl">
              Mira ideas, armado y momentos del evento en Instagram.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Si quieres ver mejor el estilo de cada opcion, en Instagram podemos
              mostrarte referencias, armado y el tipo de presencia que aporta en
              el evento.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
          >
            Ver @griselda_catering
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICIOS.map((service) => (
            <article
              key={`instagram-${service.id}`}
              className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)]"
            >
              <ProductImage
                src={service.imagen}
                hasImage={hasAvailablePublicImage(service.imagen, availableImages)}
                alt={`${service.nombre} en Instagram`}
                imagePosition={service.imagePosition}
                fallbackIcon="📷"
                fallbackTitle={service.nombre}
                fallbackSubtitle="Instagram"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="h-58"
              />

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  @griselda_catering
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-secondary">
                  {service.nombre}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {service.instagramCaption}
                </p>
                <ServiceBadges items={service.idealPara} className="mt-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
