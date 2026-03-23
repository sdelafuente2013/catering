import Link from "next/link";
import type { Servicio } from "@/config/data";
import { buildServiceWhatsAppUrl } from "@/lib/contact";

export default function ServiceCardActions({
  servicio,
}: {
  servicio: Servicio;
}) {
  const whatsappUrl = buildServiceWhatsAppUrl(servicio.nombre);

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          aria-label={`Consultar ${servicio.nombre} por WhatsApp`}
        >
          WhatsApp
        </a>
      ) : (
        <Link
          href="/contacto"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
        >
          Contacto
        </Link>
      )}

      <Link
        href={{
          pathname: "/presupuesto",
          query: { producto: servicio.id },
        }}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-secondary/12 px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:border-primary/35 hover:text-primary"
      >
        Propuesta
      </Link>
    </div>
  );
}
