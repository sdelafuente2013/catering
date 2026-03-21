"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CONFIG, EMPRESA, FAQS, TIPOS_EVENTO } from "@/config/data";
import {
  buildPrimaryContactUrl,
  buildWhatsAppUrl,
  getMapsHref,
  getPhoneHref,
} from "@/lib/contact";

type ContactFormState = {
  nombre: string;
  telefono: string;
  asunto: string;
  tipoEvento: string;
  fechaEvento: string;
  invitados: string;
  mensaje: string;
};

function openContactUrl(targetUrl: string): void {
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

export default function ContactoClient({
  minEventDate,
}: {
  minEventDate: string;
}) {
  const [formData, setFormData] = useState<ContactFormState>({
    nombre: "",
    telefono: "",
    asunto: "",
    tipoEvento: "",
    fechaEvento: "",
    invitados: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const whatsappUrl = buildWhatsAppUrl(
    "Hola, quiero hacer una consulta sobre sus opciones para eventos."
  );
  const phoneHref = getPhoneHref();
  const mapsHref = getMapsHref();

  const mensajeArmado = useMemo(() => {
    const lineas = [
      "Hola, quiero hacer una consulta desde la web.",
      "",
      `Nombre: ${formData.nombre}`,
      `Teléfono / WhatsApp: ${formData.telefono}`,
      `Asunto: ${formData.asunto}`,
    ];

    if (formData.tipoEvento) {
      lineas.push(`Tipo de evento: ${formData.tipoEvento}`);
    }

    if (formData.fechaEvento) {
      lineas.push(`Fecha estimada: ${formData.fechaEvento}`);
    }

    if (formData.invitados) {
      lineas.push(`Invitados estimados: ${formData.invitados}`);
    }

    lineas.push("", "Mensaje:");
    lineas.push(formData.mensaje);

    return lineas.join("\n");
  }, [formData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const targetUrl = buildPrimaryContactUrl({
      message: mensajeArmado,
      subject: formData.asunto || "Consulta desde la web",
      emailBody: mensajeArmado,
    });

    if (!targetUrl) {
      return;
    }

    openContactUrl(targetUrl);
    setEnviado(true);
  };

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Contacto comercial
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Contanos fecha, zona y que te interesa, y seguimos por WhatsApp.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Puedes escribirnos para consultar por cualquiera de las opciones
              actuales. Cuanto mas claro sea el pedido, mas rapido podemos orientarte.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Respuesta
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">24 hs</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Atención continua para consultas y presupuesto inicial.
                </p>
              </div>
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Cobertura
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">Zona Norte</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Don Torcuato y gran parte de la franja norte del GBA.
                </p>
              </div>
              <div className="dark-panel rounded-[1.75rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Medios de pago
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {CONFIG.mediosPago.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="soft-panel rounded-[2rem] p-6 text-secondary">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Canal rápido
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-none">
                WhatsApp para cotizar mas rapido.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Como el canal principal es WhatsApp, dejamos el contacto pensado
                para resolver todo rapido desde el celular.
              </p>
            </div>
            <div className="soft-panel rounded-[2rem] p-6 text-secondary">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Mejor consulta
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-none">
                Fecha, zona, invitados y servicio.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Con eso ya podemos decirte rapido si tenemos disponibilidad y
                como seria la cotizacion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
              {enviado ? (
                <div className="text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-3xl">
                    ✓
                  </span>
                  <h2 className="mt-6 font-display text-4xl font-semibold leading-none text-secondary">
                    Tu consulta esta lista para enviar.
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
                    Se abrio WhatsApp con tu mensaje armado para que lo envies y
                    sigamos por ahi.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEnviado(false);
                      setFormData({
                        nombre: "",
                        telefono: "",
                        asunto: "",
                        tipoEvento: "",
                        fechaEvento: "",
                        invitados: "",
                        mensaje: "",
                      });
                    }}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <>
                  <span className="eyebrow text-primary">
                    <span className="accent-dot" />
                    Formulario de contacto
                  </span>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-secondary">
                    Dejanos los datos basicos y te orientamos enseguida.
                  </h2>

                  <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Nombre *
                        </span>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.nombre}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              nombre: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Nombre y apellido"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Teléfono / WhatsApp *
                        </span>
                        <input
                          type="tel"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.telefono}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              telefono: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="11 1234 5678"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Asunto *
                        </span>
                          <input
                            type="text"
                            required
                            value={formData.asunto}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              asunto: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Ej: fuente de chocolate para cumpleanos"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Tipo de evento
                        </span>
                        <select
                          value={formData.tipoEvento}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              tipoEvento: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Seleccionar...</option>
                          {TIPOS_EVENTO.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Fecha estimada
                        </span>
                        <input
                          type="date"
                          min={minEventDate}
                          value={formData.fechaEvento}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              fechaEvento: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <span className="mt-2 block text-xs text-muted">
                          Recomendamos reservar con al menos {CONFIG.diasAntelacionMinima} dias de anticipacion.
                        </span>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-secondary">
                          Invitados estimados
                        </span>
                        <input
                          type="number"
                          min="1"
                          inputMode="numeric"
                          value={formData.invitados}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              invitados: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Ej: 80"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Mensaje *
                      </span>
                      <textarea
                        required
                        rows={6}
                        value={formData.mensaje}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            mensaje: event.target.value,
                          }))
                        }
                        className="w-full resize-none rounded-[1.75rem] border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Ej: necesito robot LED para un cumpleanos en Don Torcuato, de noche, para unas 60 personas."
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-secondary transition-colors hover:bg-primary-dark"
                    >
                      Abrir WhatsApp con mi consulta
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="grid gap-6">
              <div className="dark-panel rounded-[2rem] p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
                  Contacto directo
                </p>
                <div className="mt-5 grid gap-3">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      Consultar ahora por WhatsApp
                    </a>
                  ) : (
                    <Link
                      href="/presupuesto"
                      className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      Ir al presupuesto
                    </Link>
                  )}
                </div>

                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Ubicación
                    </p>
                    <p className="mt-1">{EMPRESA.direccion}</p>
                    {mapsHref && (
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-primary transition-colors hover:text-primary-dark"
                      >
                        Abrir mapa
                      </a>
                    )}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Teléfono
                    </p>
                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        className="mt-1 inline-flex transition-colors hover:text-primary"
                      >
                        {EMPRESA.telefono}
                      </a>
                    ) : (
                      <p className="mt-1">{EMPRESA.telefono}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Horario
                    </p>
                    <p className="mt-1">{EMPRESA.horario}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Instagram
                    </p>
                    <a
                      href={EMPRESA.redesSociales.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex transition-colors hover:text-primary"
                    >
                      @griselda_catering
                    </a>
                  </div>
                </div>
              </div>

              <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
                <h2 className="font-display text-3xl font-semibold leading-none text-secondary">
                  Dudas que solemos resolver antes de reservar
                </h2>
                <div className="mt-5 space-y-3">
                  {FAQS.slice(0, 3).map((faq) => (
                    <div
                      key={faq.pregunta}
                      className="rounded-[1.5rem] border border-line bg-white px-5 py-4"
                    >
                      <p className="font-semibold text-secondary">{faq.pregunta}</p>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {faq.respuesta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
