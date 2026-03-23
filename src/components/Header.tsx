"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EMPRESA } from "@/config/data";
import { buildWhatsAppUrl, getPhoneHref, getMapsHref } from "@/lib/contact";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
];

const WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, quiero recibir informacion sobre sus opciones de alquiler para eventos."
);
const PHONE_HREF = getPhoneHref();
const MAPS_HREF = getMapsHref();

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-primary/12 text-primary"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-secondary/90 text-white backdrop-blur-xl">
      <div className="border-b border-white/8 bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] text-gray-300 sm:flex-wrap sm:text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:flex-wrap sm:gap-4">
            <span className="inline-flex items-center gap-2 truncate">
              <span className="accent-dot" />
              <span className="sm:hidden">WhatsApp directo</span>
              <span className="hidden sm:inline">
                WhatsApp directo para consultas y reservas
              </span>
            </span>
            <span className="text-gray-500">
              24 hs
            </span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {PHONE_HREF ? (
              <a
                href={PHONE_HREF}
                className="hover:text-primary transition-colors"
              >
                {EMPRESA.telefono}
              </a>
            ) : (
              <span className="text-gray-400">{EMPRESA.telefono}</span>
            )}
            {MAPS_HREF && (
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline hover:text-primary transition-colors"
              >
                Ver ubicación
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-3 lg:min-h-22">
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-2xl shadow-[inset_0_0_0_1px_rgba(201,168,76,0.15)] transition-transform group-hover:scale-105">
              🍽️
            </div>
            <div className="min-w-0">
              <span className="block truncate font-display text-lg font-semibold leading-none text-gradient-gold sm:text-2xl lg:text-3xl">
                {EMPRESA.nombre}
              </span>
              <span className="mt-1 hidden text-[10px] uppercase tracking-[0.18em] text-gray-400 min-[360px]:block sm:text-[11px] sm:tracking-[0.22em]">
                Eventos en Zona Norte
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {WHATSAPP_URL ? (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/5"
              >
                Consultar
              </a>
            ) : (
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/5"
              >
                Contacto
              </Link>
            )}
              <Link
                href="/presupuesto"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-secondary transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
              Pedir propuesta
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-gray-200 transition-colors hover:bg-white/5 xl:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-white/8 bg-[#12131f] xl:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="grid gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </div>

            <div className="mt-4 grid gap-2 rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                <span>Asesoramiento rápido</span>
              </div>
              <p className="text-sm text-gray-300">
                Elegi un servicio, escribinos y te respondemos con disponibilidad
                y forma de reserva.
              </p>
              {WHATSAPP_URL ? (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Hablar por WhatsApp
                </a>
              ) : (
                <Link
                  href="/contacto"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Contactanos
                </Link>
              )}
              <Link
                href="/presupuesto"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-dark"
              >
                Armar presupuesto
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
