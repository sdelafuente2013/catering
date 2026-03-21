import type { Metadata } from "next";
import { CONFIG } from "@/config/data";
import { getMinEventDateInputValue } from "@/lib/eventDate";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Consultanos por WhatsApp o formulario para pedir informacion sobre las opciones disponibles hoy para eventos en Zona Norte.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <ContactoClient
      minEventDate={getMinEventDateInputValue(CONFIG.diasAntelacionMinima)}
    />
  );
}
