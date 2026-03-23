import Link from "next/link";
import InstagramShowcase from "@/components/InstagramShowcase";
import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import ServiceCardActions from "@/components/ServiceCardActions";
import {
  CATEGORIAS,
  EMPRESA,
  FAQS,
  SERVICIOS,
  formatDetallePrecio,
  formatPrecioOConsulta,
} from "@/config/data";
import { buildWhatsAppUrl, getMapsHref, getPhoneHref } from "@/lib/contact";
import {
  getAvailablePublicImages,
  hasAvailablePublicImage,
} from "@/lib/publicImages";

const WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, quiero informacion sobre sus opciones de alquiler para eventos."
);
const PHONE_HREF = getPhoneHref();
const MAPS_HREF = getMapsHref();
const INSTAGRAM_URL = EMPRESA.redesSociales.instagram;
const HOME_FEATURED_IDS = new Set([
  "copa-agua",
  "plato-llano-24cm",
  "barra-movil",
  "copa-vino",
  "mantel-redondo",
  "servicio-mozo",
  "plato-postre-18cm",
  "fuente-chocolate",
  "robot-led",
]);
const FEATURED_SERVICES = SERVICIOS.filter((service) =>
  HOME_FEATURED_IDS.has(service.id)
);

const DIFFERENTIATORS = [
  {
    title: "Cotizacion clara",
    description:
      "Ves solo lo que hoy esta disponible, con valores base cuando aplica y cotizacion clara para el resto.",
  },
  {
    title: "Respuesta rapida",
    description:
      "La idea es que puedas escribir, confirmar disponibilidad y avanzar por WhatsApp sin perder tiempo.",
  },
  {
    title: "Buena presencia",
    description:
      "Si quieres sumar servicio, presencia visual o animacion, armamos una propuesta prolija y bien presentada.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="eyebrow text-primary">
        <span className="accent-dot" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-secondary sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function HeroSection({ availableImages }: { availableImages: string[] }) {
  return (
    <section className="bg-mesh-dark overflow-hidden text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-22">
        <div className="relative z-10">
          <span className="eyebrow text-primary">
            <span className="accent-dot" />
            Alquiler para eventos en Zona Norte
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-3xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Servicios para eventos que suman presencia y se reservan facil.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
            {EMPRESA.descripcion} Si buscas una opcion puntual, bien resuelta y
            con respuesta rapida, hoy puedes consultar vajilla, barra,
            servicio de mozo, manteleria, cascada de chocolate y robot LED.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-secondary transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto"
            >
              Ver catalogo y cotizaciones
            </Link>

            {WHATSAPP_URL ? (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-primary/40 hover:bg-white/5 sm:w-auto"
              >
                Consultar disponibilidad
              </a>
            ) : (
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-primary/40 hover:bg-white/5 sm:w-auto"
              >
                Ir a contacto
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-gray-200">
              Precios base cuando aplica
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-gray-200">
              Atencion 24 horas
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-gray-200">
              Zona Norte
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="dark-panel rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Disponible hoy
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {SERVICIOS.length} opciones reales
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Elegis sin perder tiempo con opciones que hoy no estan disponibles.
              </p>
            </div>
            <div className="dark-panel rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Atencion
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                WhatsApp directo
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                La forma mas rapida de confirmar fecha, zona y cotizacion segun tu evento.
              </p>
            </div>
            <div className="dark-panel rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Cobertura
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {EMPRESA.localidad}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Don Torcuato y gran parte de la franja norte del GBA.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-300">
            {PHONE_HREF ? (
              <a href={PHONE_HREF} className="transition-colors hover:text-primary">
                {EMPRESA.telefono}
              </a>
            ) : (
              <span>{EMPRESA.telefono}</span>
            )}
            {INSTAGRAM_URL && (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                Instagram
              </a>
            )}
            {MAPS_HREF && (
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                Ver ubicacion
              </a>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 sm:hidden">
            <p className="text-sm font-medium text-gray-300">
              Elegí un rubro y sigue al catálogo:
            </p>
          </div>

          <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
            {CATEGORIAS.map((category) => (
              <Link
                key={category.id}
                href={{ pathname: "/catalogo", query: { categoria: category.id } }}
                className="min-w-[84vw] max-w-[18rem] shrink-0 snap-start"
              >
                <ProductImage
                  src={category.imagen}
                  hasImage={hasAvailablePublicImage(category.imagen, availableImages)}
                  alt={category.nombre}
                  imagePosition={category.imagePosition}
                  fallbackIcon={category.icono}
                  fallbackTitle={category.nombre}
                  fallbackSubtitle="Disponible ahora"
                  sizes="85vw"
                  className="h-52 rounded-[2rem]"
                />
                <div className="soft-panel mt-3 rounded-[1.5rem] p-4">
                  <h2 className="text-base font-semibold text-secondary">
                    {category.nombre}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {category.descripcion}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2">
            {CATEGORIAS.map((category, index) => (
              <Link
                key={category.id}
                href={{ pathname: "/catalogo", query: { categoria: category.id } }}
                className={index === 0 ? "sm:col-span-2" : ""}
              >
                <ProductImage
                  src={category.imagen}
                  hasImage={hasAvailablePublicImage(category.imagen, availableImages)}
                  alt={category.nombre}
                  imagePosition={category.imagePosition}
                  fallbackIcon={category.icono}
                  fallbackTitle={category.nombre}
                  fallbackSubtitle={index === 0 ? "Disponible ahora" : "Catalogo actual"}
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className={`rounded-[2rem] ${
                    index === 0 ? "h-64" : "h-44"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section-shell bg-mesh-light py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className="soft-panel rounded-[1.75rem] p-6">
              <h3 className="text-xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurrentOfferSection({
  availableImages,
}: {
  availableImages: string[];
}) {
  return (
    <section className="section-shell py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Lo que ofrecemos hoy"
          title="Destacados del catalogo actual"
          description="Mostramos una seleccion corta para decidir rapido desde la home. En el catalogo completo puedes ver toda la vajilla, la cristaleria y los servicios disponibles."
        />

        <div className="hide-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden">
          {FEATURED_SERVICES.map((service, index) => {
            const category = CATEGORIAS.find(
              (item) => item.id === service.categoriaId
            );

            return (
              <article
                key={service.id}
                className="group min-w-[84vw] max-w-[19rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(23,24,39,0.12)]"
              >
                <div className="relative">
                  <ProductImage
                    src={service.imagen}
                    hasImage={hasAvailablePublicImage(service.imagen, availableImages)}
                    alt={service.nombre}
                    imagePosition={service.imagePosition}
                    fallbackIcon={service.icono || category?.icono || "📦"}
                    fallbackTitle={service.nombre}
                    fallbackSubtitle={category?.nombre || "Servicio"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-60"
                  />
                  {service.destacado && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">
                      Disponible ahora
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                    {category?.nombre}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-secondary">
                    {service.nombre}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {service.descripcion}
                  </p>
                  <ServiceBadges
                    items={service.idealPara.slice(0, 2)}
                    className="mt-4"
                  />
                  <div className="mt-4 rounded-[1.5rem] bg-accent px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      Incluye
                    </p>
                    <p className="mt-2 text-sm leading-6 text-secondary">
                      {service.incluye[0]}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {service.detalles.slice(0, 2).map((detail) => (
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

        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {FEATURED_SERVICES.map((service, index) => {
            const category = CATEGORIAS.find(
              (item) => item.id === service.categoriaId
            );

            return (
              <article
                key={service.id}
                className="group overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(23,24,39,0.12)]"
              >
                <div className="relative">
                  <ProductImage
                    src={service.imagen}
                    hasImage={hasAvailablePublicImage(service.imagen, availableImages)}
                    alt={service.nombre}
                    imagePosition={service.imagePosition}
                    fallbackIcon={service.icono || category?.icono || "📦"}
                    fallbackTitle={service.nombre}
                    fallbackSubtitle={category?.nombre || "Servicio"}
                    sizes="(max-width: 1280px) 50vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-60"
                  />
                  {service.destacado && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">
                      Disponible ahora
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                    {category?.nombre}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-secondary">
                    {service.nombre}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {service.descripcion}
                  </p>
                  <ServiceBadges items={service.idealPara} className="mt-4" />
                  <div className="mt-4 rounded-[1.5rem] bg-accent px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      Incluye
                    </p>
                    <p className="mt-2 text-sm leading-6 text-secondary">
                      {service.incluye[0]}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
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

        <div className="mt-8 flex">
          <Link
            href="/catalogo"
            className="inline-flex w-full items-center justify-center rounded-full border border-secondary/12 px-6 py-3 font-semibold text-secondary transition-colors hover:border-primary/35 hover:text-primary sm:w-auto"
          >
            Ver catalogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Nos escribes",
      description:
        "Nos cuentas que te interesa, la fecha, la zona y el tipo de evento.",
    },
    {
      number: "02",
      title: "Te confirmamos disponibilidad",
      description:
        "Revisamos si tenemos fecha, cantidad y formato para lo que estas buscando.",
    },
    {
      number: "03",
      title: "Cerramos la reserva",
      description:
        "Definimos detalles y coordinamos todo por WhatsApp para que quede claro y simple.",
    },
  ];

  return (
    <section className="section-shell bg-accent py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Como trabajamos"
          title="Reservar es simple y lleva solo 3 pasos"
          description="Como la mayoria de las consultas llegan desde el celular, dejamos un recorrido corto para pasar de la web a una conversacion clara por WhatsApp."
          centered
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="soft-panel rounded-[1.75rem] p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-gold text-lg font-bold text-secondary">
                {step.number}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-secondary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQPreviewSection() {
  return (
    <section className="section-shell py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo que mas conviene saber antes de reservar"
            description="Respondemos las dudas que normalmente frenan una decision para que te sea mas facil avanzar."
          />

          <div className="grid gap-4">
            {FAQS.slice(0, 4).map((faq) => (
              <div key={faq.pregunta} className="soft-panel rounded-[1.5rem] p-5">
                <h3 className="text-lg font-semibold text-secondary">
                  {faq.pregunta}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
          >
            Ver preguntas
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-full border border-secondary/10 px-6 py-3 font-semibold text-secondary transition-colors hover:border-primary/30 hover:text-primary"
          >
            Hacer una consulta
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="gradient-gold py-18 lg:py-22">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="eyebrow bg-secondary/8 text-secondary">
          <span className="accent-dot" />
          Reserva por WhatsApp
        </span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-none text-secondary sm:text-5xl">
          Si ya viste lo que te interesa, escribinos hoy y te pasamos disponibilidad.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-secondary/75">
          Con fecha, zona y servicio elegido ya podemos orientarte mucho mejor
          y decirte rapido como seguir con la reserva.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/presupuesto"
            className="inline-flex w-full items-center justify-center rounded-full bg-secondary px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-secondary/90 sm:w-auto"
          >
            Pedir propuesta
          </Link>
          {WHATSAPP_URL ? (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-secondary/20 px-7 py-4 text-base font-semibold text-secondary transition-colors hover:bg-secondary/8 sm:w-auto"
            >
              Hablar por WhatsApp
            </a>
          ) : (
            <Link
              href="/contacto"
              className="inline-flex w-full items-center justify-center rounded-full border border-secondary/20 px-7 py-4 text-base font-semibold text-secondary transition-colors hover:bg-secondary/8 sm:w-auto"
            >
              Ir a contacto
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const availableImages = getAvailablePublicImages();

  return (
    <>
      <HeroSection availableImages={availableImages} />
      <TrustSection />
      <CurrentOfferSection availableImages={availableImages} />
      <ProcessSection />
      <InstagramShowcase />
      <FAQPreviewSection />
      <FinalCtaSection />
    </>
  );
}
