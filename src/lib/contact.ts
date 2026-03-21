import { EMPRESA } from "@/config/data";

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function hasConfiguredPhone(phone: string): boolean {
  const digits = onlyDigits(phone);
  return digits.length >= 10 && !/0{6,}/.test(digits);
}

export function hasConfiguredWhatsapp(whatsapp: string): boolean {
  const digits = onlyDigits(whatsapp);
  return digits.length >= 10 && !/[xX]/.test(whatsapp);
}

export function hasConfiguredEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getPhoneHref(): string | null {
  if (!hasConfiguredPhone(EMPRESA.telefono)) {
    return null;
  }

  return `tel:+${onlyDigits(EMPRESA.telefono)}`;
}

export function getMapsHref(): string | null {
  return EMPRESA.googleMapsUrl?.trim() ? EMPRESA.googleMapsUrl : null;
}

export function buildWhatsAppUrl(message: string): string | null {
  if (!hasConfiguredWhatsapp(EMPRESA.telefonoWhatsapp)) {
    return null;
  }

  return `https://wa.me/${EMPRESA.telefonoWhatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildServiceWhatsAppUrl(serviceName: string): string | null {
  return buildWhatsAppUrl(
    `Hola, quiero consultar por ${serviceName} para un evento en Zona Norte. Me gustaria saber disponibilidad y valor final.`
  );
}

export function buildMailtoUrl(subject: string, body: string): string | null {
  if (!hasConfiguredEmail(EMPRESA.email)) {
    return null;
  }

  const search = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${EMPRESA.email}?${search.toString()}`;
}

export function buildPrimaryContactUrl(options: {
  message: string;
  subject: string;
  emailBody?: string;
}): string | null {
  const whatsappUrl = buildWhatsAppUrl(options.message);

  if (whatsappUrl) {
    return whatsappUrl;
  }

  return buildMailtoUrl(options.subject, options.emailBody ?? options.message);
}
