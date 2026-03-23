import Link from "next/link";
import { EMPRESA, CONFIG } from "@/config/data";
import {
  buildWhatsAppUrl,
  getMapsHref,
  getPhoneHref,
} from "@/lib/contact";

const WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, quiero informacion sobre sus opciones de alquiler para eventos."
);
const PHONE_HREF = getPhoneHref();
const MAPS_HREF = getMapsHref();

const FOOTER_LINKS = [
  { href: "/catalogo", label: "Catálogo completo" },
  { href: "/presupuesto", label: "Armar presupuesto" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

const SOCIALS = EMPRESA.redesSociales.instagram
  ? [
      {
        href: EMPRESA.redesSociales.instagram,
        label: "Instagram",
        icon: "📷",
      },
    ]
  : [];

export default function Footer() {
  return (
    <footer className="bg-mesh-dark overflow-hidden text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="dark-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.95fr]">
            <div className="max-w-xl">
              <span className="eyebrow text-primary">
                <span className="accent-dot" />
                Alquiler para eventos
              </span>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-2xl">
                  🍽️
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold text-gradient-gold">
                    {EMPRESA.nombre}
                  </p>
                  <p className="text-sm text-gray-400">{EMPRESA.slogan}</p>
                </div>
              </div>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-300">
                {EMPRESA.descripcion}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-gray-400">
                Si ya tienes fecha y zona, podemos orientarte mucho mas rapido por WhatsApp.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                  Seña del {CONFIG.porcentajeSena}%
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                  Cobertura en toda Zona Norte
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                  Precios base cuando aplica
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/presupuesto"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-secondary transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  Pedir presupuesto
                </Link>
                {WHATSAPP_URL ? (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:bg-white/5"
                  >
                    Consultar por WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:bg-white/5"
                  >
                    Hablar con nosotros
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Navegación
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center text-gray-300 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {SOCIALS.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Seguinos
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  {EMPRESA.redesSociales.instagram && (
                    <a
                      href={EMPRESA.redesSociales.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm text-gray-300 transition-colors hover:text-primary"
                    >
                      @griselda_catering
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-5">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Contacto
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Teléfono
                    </p>
                    {PHONE_HREF ? (
                      <a
                        href={PHONE_HREF}
                        className="mt-1 inline-flex text-white transition-colors hover:text-primary"
                      >
                        {EMPRESA.telefono}
                      </a>
                    ) : (
                      <p className="mt-1 text-white">{EMPRESA.telefono}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Ubicación
                    </p>
                    <p className="mt-1 text-white">{EMPRESA.direccion}</p>
                    {MAPS_HREF && (
                      <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-primary transition-colors hover:text-primary-dark"
                      >
                        Abrir en Google Maps
                      </a>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Horario
                    </p>
                    <p className="mt-1 text-white">{EMPRESA.horario}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Medios de pago
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CONFIG.mediosPago.map((medio) => (
                    <span
                      key={medio}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-gray-200"
                    >
                      {medio}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/8 pt-6">
            <p className="text-xs leading-6 text-gray-400">
              <span className="font-semibold text-gray-300">
                Zonas de cobertura:
              </span>{" "}
              {EMPRESA.zonasCobertura.join(" · ")}
            </p>
            <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} {EMPRESA.nombre}. Todos los derechos
                reservados.
              </p>
              <p>
                Sitio optimizado para pedir presupuesto, resolver dudas y cerrar
                reservas más rápido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
