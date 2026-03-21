import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG, EMPRESA, FAQS, SERVICIOS } from "@/config/data";
import { buildWhatsAppUrl, getPhoneHref } from "@/lib/contact";
import { getFaqSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respondemos dudas sobre reservas, precios base, medios de pago, cobertura y disponibilidad para eventos en Zona Norte.",
  alternates: {
    canonical: "/faq",
  },
};

const WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, tengo una consulta sobre sus opciones para eventos."
);
const PHONE_HREF = getPhoneHref();

const QUICK_FACTS = [
  {
    label: "Anticipacion sugerida",
    value: `${CONFIG.diasAntelacionMinima}+ dias`,
    detail: "Cuanto antes escribas, mas facil es confirmar disponibilidad.",
  },
  {
    label: "Catalogo actual",
    value: `${SERVICIOS.length} opciones`,
    detail: "Mostramos solo lo que hoy tenemos disponible para alquilar.",
  },
  {
    label: "Seña para reservar",
    value: `${CONFIG.porcentajeSena}%`,
    detail: "Sirve para bloquear la fecha y ordenar la reserva.",
  },
];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFaqSchema()) }}
      />
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Información útil antes de reservar
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Respondemos lo que normalmente frena una decisión.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Plazos, pagos, cobertura, disponibilidad y reservas.
              Si despues de esto queres una recomendacion mas puntual, seguimos
              por contacto o presupuesto.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label} className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {fact.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="soft-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.pregunta}
                  className="group rounded-[1.5rem] border border-line bg-white px-5 py-4 open:border-primary/30 open:bg-primary/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <span className="text-lg font-semibold text-secondary">
                      {faq.pregunta}
                    </span>
                    <span className="text-xl font-semibold text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                    {faq.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
              <span className="eyebrow text-primary">
                <span className="accent-dot" />
                Si querés avanzar rápido
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-secondary">
                El siguiente paso ideal es pedir una propuesta orientada a tu evento.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Asi pasamos de preguntas generales a algo concreto: fecha, zona,
                tipo de evento y cual de las opciones actuales te interesa.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/presupuesto"
                  className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
                >
                  Armar presupuesto
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-secondary/12 px-6 py-3 font-semibold text-secondary transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Hacer una consulta
                </Link>
              </div>
            </div>

            <div className="dark-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
                Contacto directo
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-none text-white">
                Si preferís resolverlo hablando, también lo hacemos así.
              </h2>
              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>{EMPRESA.direccion}</p>
                {PHONE_HREF ? (
                  <a
                    href={PHONE_HREF}
                    className="block transition-colors hover:text-primary"
                  >
                    {EMPRESA.telefono}
                  </a>
                ) : (
                  <p>{EMPRESA.telefono}</p>
                )}
                <p>{EMPRESA.horario}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {WHATSAPP_URL ? (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
                  >
                    Seguir por WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
                  >
                    Ir a contacto
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
