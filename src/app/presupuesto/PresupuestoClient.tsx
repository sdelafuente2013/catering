"use client";

import { useDeferredValue, useMemo, useState } from "react";
import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import {
  CATEGORIAS,
  CONFIG,
  EMPRESA,
  PROCESO_RESERVA,
  SERVICIOS,
  TIPOS_EVENTO,
  formatDetallePrecio,
  formatPrecio,
  formatPrecioOConsulta,
  tienePrecio,
} from "@/config/data";
import { buildPrimaryContactUrl, getPhoneHref } from "@/lib/contact";

type PresupuestoClientProps = {
  availableImages: string[];
  productoInicial: string;
  eventoInicial: string;
  minEventDate: string;
};

type LineaPresupuesto = {
  servicioId: string;
  cantidad: number;
};

type FormDataState = {
  nombre: string;
  telefono: string;
  tipoEvento: string;
  fechaEvento: string;
  numPersonas: string;
  lugar: string;
  mensaje: string;
};

function openContactUrl(targetUrl: string): void {
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

function ContadorCantidad({
  cantidad,
  minimo,
  onChange,
}: {
  cantidad: number;
  minimo: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-line bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(minimo, cantidad - 1))}
        className="h-10 w-10 border-r border-line text-lg font-bold text-secondary transition-colors hover:bg-accent"
      >
        −
      </button>
      <input
        type="number"
        min={minimo}
        value={cantidad}
        onChange={(event) => {
          const nextValue = Number.parseInt(event.target.value, 10);
          if (!Number.isNaN(nextValue)) {
            onChange(Math.max(minimo, nextValue));
          }
        }}
        className="h-10 w-16 border-none text-center text-base font-semibold text-secondary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(cantidad + 1)}
        className="h-10 w-10 border-l border-line text-lg font-bold text-secondary transition-colors hover:bg-accent"
      >
        +
      </button>
    </div>
  );
}

function canEditCantidad(servicioId: string): boolean {
  const servicio = SERVICIOS.find((item) => item.id === servicioId);
  return Boolean(servicio?.permiteMultiples);
}

export default function PresupuestoClient({
  availableImages,
  productoInicial,
  eventoInicial,
  minEventDate,
}: PresupuestoClientProps) {
  const availableImageSet = useMemo(
    () => new Set(availableImages),
    [availableImages]
  );
  const productoInicialData = SERVICIOS.find(
    (servicio) => servicio.id === productoInicial
  );
  const [formData, setFormData] = useState<FormDataState>({
    nombre: "",
    telefono: "",
    tipoEvento: eventoInicial,
    fechaEvento: "",
    numPersonas: "",
    lugar: "",
    mensaje: productoInicialData
      ? `Me interesa consultar por ${productoInicialData.nombre}.`
      : "",
  });
  const [lineas, setLineas] = useState<LineaPresupuesto[]>(
    productoInicialData
      ? [
          {
            servicioId: productoInicialData.id,
            cantidad: productoInicialData.minimoUnidades,
          },
        ]
      : []
  );
  const [categoriaFiltro, setCategoriaFiltro] = useState("todos");
  const [busquedaProductos, setBusquedaProductos] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [resumenAbierto, setResumenAbierto] = useState(false);
  const busquedaDiferida = useDeferredValue(busquedaProductos);
  const phoneHref = getPhoneHref();

  const agregarProducto = (servicioId: string) => {
    const existe = lineas.some((linea) => linea.servicioId === servicioId);
    if (existe) {
      return;
    }

    const servicio = SERVICIOS.find((item) => item.id === servicioId);
    if (!servicio) {
      return;
    }

    setLineas((current) => [
      ...current,
      {
        servicioId,
        cantidad: servicio.minimoUnidades,
      },
    ]);
  };

  const actualizarCantidad = (servicioId: string, cantidad: number) => {
    if (!canEditCantidad(servicioId)) {
      return;
    }

    setLineas((current) =>
      current.map((linea) =>
        linea.servicioId === servicioId ? { ...linea, cantidad } : linea
      )
    );
  };

  const eliminarLinea = (servicioId: string) => {
    setLineas((current) =>
      current.filter((linea) => linea.servicioId !== servicioId)
    );
  };

  const productosFiltrados = useMemo(() => {
    let resultado = SERVICIOS.filter((servicio) => servicio.disponible);
    const termino = busquedaDiferida.trim().toLowerCase();

    if (categoriaFiltro !== "todos") {
      resultado = resultado.filter(
        (servicio) => servicio.categoriaId === categoriaFiltro
      );
    }

    if (termino) {
      resultado = resultado.filter(
        (servicio) =>
          servicio.nombre.toLowerCase().includes(termino) ||
          servicio.descripcion.toLowerCase().includes(termino) ||
          servicio.detalles.some((detalle) =>
            detalle.toLowerCase().includes(termino)
          )
      );
    }

    return resultado.sort((left, right) => {
      if (left.destacado !== right.destacado) {
        return Number(right.destacado) - Number(left.destacado);
      }

      return left.nombre.localeCompare(right.nombre, "es");
    });
  }, [busquedaDiferida, categoriaFiltro]);

  const estimacion = useMemo(() => {
    let total = 0;
    let tienePrecios = false;
    let tienePreciosDesde = false;

    for (const linea of lineas) {
      const servicio = SERVICIOS.find((item) => item.id === linea.servicioId);
      if (!servicio) {
        continue;
      }

      if (tienePrecio(servicio.precioUnitario)) {
        tienePrecios = true;
        tienePreciosDesde ||= Boolean(servicio.precioDesde);
        total += servicio.precioUnitario * linea.cantidad;
      }
    }

    return {
      total,
      sena: total * (CONFIG.porcentajeSena / 100),
      tienePrecios,
      tienePreciosDesde,
    };
  }, [lineas]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageLines = [
      "Hola, quiero pedir presupuesto para un evento.",
      "",
      `Nombre: ${formData.nombre}`,
      `Telefono: ${formData.telefono}`,
      `Tipo de evento: ${formData.tipoEvento}`,
      `Fecha: ${formData.fechaEvento}`,
      `Cantidad de personas: ${formData.numPersonas || "A definir"}`,
      `Lugar / zona: ${formData.lugar || "A definir"}`,
    ];

    if (lineas.length > 0) {
      messageLines.push("", "Me interesa consultar por:");

      for (const linea of lineas) {
        const servicio = SERVICIOS.find((item) => item.id === linea.servicioId);
        if (!servicio) {
          continue;
        }

        messageLines.push(
          servicio.permiteMultiples
            ? `- ${servicio.nombre} x${linea.cantidad}`
            : `- ${servicio.nombre}`
        );
      }
    }

    if (formData.mensaje.trim()) {
      messageLines.push("", `Notas: ${formData.mensaje.trim()}`);
    }

    const fullMessage = messageLines.join("\n");
    const targetUrl = buildPrimaryContactUrl({
      message: fullMessage,
      subject: `Consulta desde la web - ${EMPRESA.nombre}`,
      emailBody: fullMessage,
    });

    if (!targetUrl) {
      return;
    }

    openContactUrl(targetUrl);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <section className="section-shell bg-mesh-light py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="soft-panel rounded-[2rem] p-8 sm:p-10">
            <span className="inline-flex h-18 w-18 items-center justify-center rounded-full bg-primary/15 text-4xl">
              ✓
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-secondary sm:text-5xl">
              Tu propuesta esta lista para enviar.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
              Se abrio WhatsApp con el resumen armado. Apenas lo recibamos te
              respondemos por ahi con disponibilidad y siguientes pasos.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted">
              {phoneHref ? (
                <a href={phoneHref} className="block text-primary hover:underline">
                  {EMPRESA.telefono}
                </a>
              ) : (
                <p>{EMPRESA.telefono}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setEnviado(false);
                setLineas([]);
              }}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
            >
              Enviar otra consulta
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Consulta guiada
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Armá una consulta clara y te respondemos con disponibilidad real.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Este formulario esta pensado para ir directo a lo importante:
              fecha, tipo de evento, zona y la opcion que quieres consultar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                Respuesta por WhatsApp
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                Zona Norte
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                Valores base publicados
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {SERVICIOS.map((service) => {
              const category = CATEGORIAS.find(
                (item) => item.id === service.categoriaId
              );
              const agregado = lineas.some((linea) => linea.servicioId === service.id);

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => !agregado && agregarProducto(service.id)}
                  className={`overflow-hidden rounded-[2rem] text-left transition-all hover:-translate-y-1 ${
                    agregado ? "ring-2 ring-primary/55" : ""
                  }`}
                >
                  <ProductImage
                    src={service.imagen}
                    hasImage={availableImageSet.has(service.imagen)}
                    alt={service.nombre}
                    imagePosition={service.imagePosition}
                    fallbackIcon={category?.icono || "📦"}
                    fallbackTitle={service.nombre}
                    fallbackSubtitle={agregado ? "Seleccionado" : "Disponible hoy"}
                    sizes="(max-width: 1024px) 100vw, 24vw"
                    className="h-48"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
                  <span className="eyebrow text-primary">
                    <span className="accent-dot" />
                    1. Datos del evento
                  </span>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Tu nombre *
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
                        WhatsApp / Telefono *
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

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Tipo de evento *
                      </span>
                      <select
                        required
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

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Fecha del evento *
                      </span>
                      <input
                        type="date"
                        required
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
                        Recomendado: reservar con {CONFIG.diasAntelacionMinima}+ dias de anticipacion.
                      </span>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Cantidad de personas
                      </span>
                      <input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        value={formData.numPersonas}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            numPersonas: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Ej: 80"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Lugar / Zona
                      </span>
                      <input
                        type="text"
                        value={formData.lugar}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            lugar: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Ej: salon en Tigre, casa en Don Torcuato..."
                      />
                    </label>
                  </div>
                </div>

                <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="eyebrow text-primary">
                        <span className="accent-dot" />
                        2. Elige lo que te interesa
                      </span>
                      <p className="mt-4 text-sm leading-7 text-muted">
                        Elige una o varias opciones para armar una consulta mas precisa.
                      </p>
                    </div>
                    <label className="block sm:max-w-xs">
                      <span className="mb-2 block text-sm font-medium text-secondary">
                        Buscar servicio
                      </span>
                      <input
                        type="text"
                        value={busquedaProductos}
                        onChange={(event) => setBusquedaProductos(event.target.value)}
                        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Fuente, robot, pack de vasijas..."
                      />
                    </label>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCategoriaFiltro("todos")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        categoriaFiltro === "todos"
                          ? "bg-secondary text-white"
                          : "bg-white text-muted hover:bg-accent"
                      }`}
                    >
                      Todos
                    </button>
                    {CATEGORIAS.map((categoria) => (
                      <button
                        key={categoria.id}
                        type="button"
                        onClick={() => setCategoriaFiltro(categoria.id)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          categoriaFiltro === categoria.id
                            ? "bg-primary text-secondary"
                            : "bg-white text-muted hover:bg-accent"
                        }`}
                      >
                        {categoria.icono} {categoria.nombre}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {productosFiltrados.map((servicio) => {
                      const agregado = lineas.some(
                        (linea) => linea.servicioId === servicio.id
                      );
                      const categoria = CATEGORIAS.find(
                        (item) => item.id === servicio.categoriaId
                      );

                      return (
                        <button
                          key={servicio.id}
                          type="button"
                          onClick={() => !agregado && agregarProducto(servicio.id)}
                          disabled={agregado}
                          className={`rounded-[1.5rem] border px-4 py-4 text-left transition-colors ${
                            agregado
                              ? "border-primary/35 bg-primary/8 opacity-70"
                              : "border-line bg-white hover:border-primary/35"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-2xl">{categoria?.icono}</span>
                            {agregado && (
                              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-secondary">
                                Agregado
                              </span>
                            )}
                          </div>
                          <p className="mt-3 text-sm font-semibold text-secondary">
                            {servicio.nombre}
                          </p>
                          <p className="mt-2 text-sm text-primary">
                            {formatPrecioOConsulta(
                              servicio.precioUnitario,
                              servicio.precioDesde
                            )}
                          </p>
                          <p className="mt-2 text-xs leading-6 text-muted">
                            {servicio.descripcion}
                          </p>
                          <ServiceBadges
                            items={servicio.idealPara.slice(0, 2)}
                            className="mt-3"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {lineas.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-secondary">
                          Tu seleccion
                        </h2>
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">
                          {lineas.length} {lineas.length === 1 ? "opcion" : "opciones"}
                        </span>
                      </div>

                      <div className="mt-4 space-y-4">
                        {lineas.map((linea) => {
                          const servicio = SERVICIOS.find(
                            (item) => item.id === linea.servicioId
                          );
                          if (!servicio) {
                            return null;
                          }

                          const categoria = CATEGORIAS.find(
                            (item) => item.id === servicio.categoriaId
                          );

                          return (
                            <div
                              key={linea.servicioId}
                              className="rounded-[1.75rem] border border-line bg-white px-5 py-5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">{categoria?.icono}</span>
                                  <div>
                                    <p className="font-semibold text-secondary">
                                      {servicio.nombre}
                                    </p>
                                    <p className="mt-1 text-sm text-muted">
                                      {formatPrecioOConsulta(
                                        servicio.precioUnitario,
                                        servicio.precioDesde
                                      )}
                                      {tienePrecio(servicio.precioUnitario) &&
                                        ` · ${formatDetallePrecio(
                                          servicio.precioUnitario,
                                          servicio.unidad,
                                          servicio.precioDesde
                                        )}`}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => eliminarLinea(linea.servicioId)}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-sm text-red-500 transition-colors hover:border-red-200 hover:bg-red-50"
                                  aria-label="Eliminar opcion"
                                >
                                  ✕
                                </button>
                              </div>

                              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                {servicio.permiteMultiples ? (
                                  <ContadorCantidad
                                    cantidad={linea.cantidad}
                                    minimo={servicio.minimoUnidades}
                                    onChange={(value) =>
                                      actualizarCantidad(linea.servicioId, value)
                                    }
                                  />
                                ) : (
                                  <span className="inline-flex items-center rounded-full border border-line bg-accent px-4 py-2 text-sm font-medium text-secondary">
                                    1 servicio
                                  </span>
                                )}
                                <p className="text-right text-base font-semibold text-primary">
                                  {tienePrecio(servicio.precioUnitario)
                                    ? formatPrecioOConsulta(
                                        servicio.precioUnitario * linea.cantidad,
                                        servicio.precioDesde
                                      )
                                    : "Se cotiza a medida"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
                  <span className="eyebrow text-primary">
                    <span className="accent-dot" />
                    3. Contanos un poco mas
                  </span>
                  <textarea
                    rows={5}
                    value={formData.mensaje}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        mensaje: event.target.value,
                      }))
                    }
                    className="mt-6 w-full resize-none rounded-[1.75rem] border border-line bg-white px-4 py-3 text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Ej: es un cumpleanos de noche, quiero algo elegante y necesito saber si llegan hasta mi zona."
                  />
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div className="soft-panel rounded-[2rem] p-6">
                    <ResumenConsulta lineas={lineas} estimacion={estimacion} />
                    <button
                      type="submit"
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-secondary transition-colors hover:bg-primary-dark"
                    >
                      Enviar propuesta por WhatsApp
                    </button>
                    <p className="mt-3 text-center text-xs text-muted">
                      Te responderemos por WhatsApp con disponibilidad, valor final y forma de reserva.
                    </p>
                  </div>

                  <div className="dark-panel rounded-[2rem] p-6">
                    <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
                      Como cotizamos
                    </p>
                    <div className="mt-5 space-y-4 text-sm text-gray-300">
                      {PROCESO_RESERVA.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                      <p>• La reserva se confirma con seña del {CONFIG.porcentajeSena}%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/98 px-4 py-3 shadow-[0_-12px_30px_rgba(23,24,39,0.08)] backdrop-blur lg:hidden">
              {resumenAbierto && (
                <div className="mb-3 max-h-[55vh] overflow-y-auto rounded-[1.75rem] border border-line bg-accent p-4">
                  <ResumenConsulta lineas={lineas} estimacion={estimacion} />
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setResumenAbierto((current) => !current)}
                  className="flex-1 text-left"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {resumenAbierto ? "Ocultar resumen" : "Ver resumen"}
                  </p>
                  <p className="mt-1 text-base font-bold text-primary">
                    {estimacion.tienePrecios
                      ? formatPrecioOConsulta(
                          estimacion.total,
                          estimacion.tienePreciosDesde
                        )
                      : "Cotizacion personalizada"}
                  </p>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-dark"
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <div className="h-24 lg:hidden" />
          </form>
        </div>
      </section>
    </>
  );
}

function ResumenConsulta({
  lineas,
  estimacion,
}: {
  lineas: LineaPresupuesto[];
  estimacion: {
    total: number;
    sena: number;
    tienePrecios: boolean;
    tienePreciosDesde: boolean;
  };
}) {
  return (
    <div>
      <h2 className="font-display text-4xl font-semibold leading-none text-secondary">
        Resumen estimado
      </h2>

      {lineas.length > 0 ? (
        <div className="mt-5 space-y-3">
          {lineas.map((linea) => {
            const servicio = SERVICIOS.find((item) => item.id === linea.servicioId);
            if (!servicio) {
              return null;
            }

            return (
              <div
                key={linea.servicioId}
                className="flex items-start justify-between gap-3 rounded-[1.5rem] border border-line bg-white px-5 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-secondary">{servicio.nombre}</p>
                  <p className="mt-1 text-muted">
                    {servicio.permiteMultiples ? `x${linea.cantidad}` : "1 servicio"}
                  </p>
                </div>
                <p className="font-semibold text-secondary">
                  {tienePrecio(servicio.precioUnitario)
                    ? formatPrecioOConsulta(
                        servicio.precioUnitario * linea.cantidad,
                        servicio.precioDesde
                      )
                    : "Consultar"}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-7 text-muted">
          Aun no agregaste ninguna opcion. Puedes seleccionar una o varias antes
          de enviar la consulta.
        </p>
      )}

      {lineas.length > 0 && (
        <div className="mt-6 rounded-[1.75rem] bg-secondary px-5 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm uppercase tracking-[0.18em] text-gray-400">
              {estimacion.tienePrecios
                ? estimacion.tienePreciosDesde
                  ? "Estimado desde"
                  : "Referencia"
                : "Cotizacion"}
            </span>
            <span className="text-2xl font-bold text-primary">
              {estimacion.tienePrecios
                ? formatPrecioOConsulta(
                    estimacion.total,
                    estimacion.tienePreciosDesde
                  )
                : "Personalizada"}
            </span>
          </div>

          {estimacion.tienePrecios && estimacion.total > 0 && (
            <div className="mt-3 flex items-center justify-between gap-4 text-sm text-gray-300">
              <span>Seña estimada ({CONFIG.porcentajeSena}%)</span>
              <span>
                {CONFIG.moneda}
                {formatPrecio(estimacion.sena)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
