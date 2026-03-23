"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact";

export default function WhatsappButton() {
  const pathname = usePathname();
  const url = buildWhatsAppUrl(
    "Hola, me gustaria pedir informacion sobre sus opciones para eventos."
  );

  if (pathname === "/contacto" || pathname === "/presupuesto") {
    return null;
  }

  const icon = <WhatsAppIcon />;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/96 px-4 py-3 shadow-[0_-14px_34px_rgba(23,24,39,0.1)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              aria-label="Contactar por WhatsApp"
            >
              {icon}
              WhatsApp
            </a>
          ) : (
            <Link
              href="/contacto"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
              aria-label="Ir a contacto"
            >
              {icon}
              Contacto
            </Link>
          )}

          <Link
            href="/presupuesto"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-dark"
          >
            Pedir propuesta
          </Link>
        </div>
      </div>

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 hidden md:flex">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-15 w-15 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_18px_40px_rgba(22,163,74,0.35)] transition-all hover:scale-105 hover:bg-green-600 hover:shadow-[0_22px_50px_rgba(22,163,74,0.42)]"
            aria-label="Contactar por WhatsApp"
          >
            {icon}
          </a>
        ) : (
          <Link
            href="/contacto"
            className="flex h-15 w-15 items-center justify-center rounded-full bg-secondary text-white shadow-[0_18px_40px_rgba(23,24,39,0.25)] transition-all hover:scale-105 hover:shadow-[0_22px_50px_rgba(23,24,39,0.3)]"
            aria-label="Ir a contacto"
          >
            {icon}
          </Link>
        )}
      </div>
    </>
  );
}
