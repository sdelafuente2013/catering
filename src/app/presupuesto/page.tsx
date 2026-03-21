import type { Metadata } from "next";
import { CONFIG, SERVICIOS, TIPOS_EVENTO } from "@/config/data";
import { getMinEventDateInputValue } from "@/lib/eventDate";
import { getAvailablePublicImages } from "@/lib/publicImages";
import PresupuestoClient from "./PresupuestoClient";

export const metadata: Metadata = {
  title: "Pedir presupuesto",
  description:
    "Elige una de las opciones disponibles hoy y enviá tu consulta por WhatsApp para recibir una cotización personalizada.",
  alternates: {
    canonical: "/presupuesto",
  },
};

type PresupuestoPageProps = {
  searchParams: Promise<{
    producto?: string | string[];
    evento?: string | string[];
  }>;
};

export default async function PresupuestoPage({
  searchParams,
}: PresupuestoPageProps) {
  const resolvedSearchParams = await searchParams;
  const productoParam = resolvedSearchParams.producto;
  const eventoParam = resolvedSearchParams.evento;

  const productoInicial =
    typeof productoParam === "string" &&
    SERVICIOS.some((servicio) => servicio.id === productoParam)
      ? productoParam
      : "";

  const eventoInicial =
    typeof eventoParam === "string" && TIPOS_EVENTO.includes(eventoParam)
      ? eventoParam
      : "";

  return (
    <PresupuestoClient
      availableImages={getAvailablePublicImages()}
      productoInicial={productoInicial}
      eventoInicial={eventoInicial}
      minEventDate={getMinEventDateInputValue(CONFIG.diasAntelacionMinima)}
    />
  );
}
