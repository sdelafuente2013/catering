"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/contact";

export default function WhatsappButton() {
  const pathname = usePathname();
  const url = buildWhatsAppUrl(
    "Hola, me gustaria pedir informacion sobre sus opciones para eventos."
  );

  if (pathname === "/contacto" || pathname === "/presupuesto") {
    return null;
  }

  const icon = (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

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
