"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ServiceBadges from "@/components/ServiceBadges";
import ServiceCardActions from "@/components/ServiceCardActions";
import {
  CATEGORIAS,
  SERVICIOS,
  formatDetallePrecio,
  formatPrecioOConsulta,
} from "@/config/data";

type CatalogoClientProps = {
  availableImages: string[];
  categoriaInicial: string;
  busquedaInicial: string;
};

type OrdenCatalogo = "recomendados" | "precio-asc" | "precio-desc";

const ORDENES: Array<{ id: OrdenCatalogo; label: string }> = [
  { id: "recomendados", label: "Recomendados" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
];

function compareByPrecio(
  left: (typeof SERVICIOS)[number],
  right: (typeof SERVICIOS)[number],
  order: OrdenCatalogo
): number {
  const leftHasPrice = left.precioUnitario > 0;
  const rightHasPrice = right.precioUnitario > 0;

  if (leftHasPrice !== rightHasPrice) {
    return leftHasPrice ? -1 : 1;
  }

  if (!leftHasPrice && !rightHasPrice) {
    return left.nombre.localeCompare(right.nombre, "es");
  }

  if (order === "precio-asc") {
    return left.precioUnitario - right.precioUnitario;
  }

  return right.precioUnitario - left.precioUnitario;
}

export default function CatalogoClient({
  availableImages,
  categoriaInicial,
  busquedaInicial,
}: CatalogoClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [categoriaActiva, setCategoriaActiva] = useState(categoriaInicial);
  const [busqueda, setBusqueda] = useState(busquedaInicial);
  const [orden, setOrden] = useState<OrdenCatalogo>("recomendados");
  const busquedaDiferida = useDeferredValue(busqueda);

  useEffect(() => {
    setCategoriaActiva(categoriaInicial);
  }, [categoriaInicial]);

  useEffect(() => {
    setBusqueda(busquedaInicial);
  }, [busquedaInicial]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (categoriaActiva !== "todos") {
      params.set("categoria", categoriaActiva);
    }

    if (busquedaDiferida.trim()) {
      params.set("q", busquedaDiferida.trim());
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }, [busquedaDiferida, categoriaActiva, pathname, router]);

  const availableImageSet = useMemo(
    () => new Set(availableImages),
    [availableImages]
  );

  const serviciosDisponibles = useMemo(
    () => SERVICIOS.filter((servicio) => servicio.disponible),
    []
  );

  const categoriasConConteo = useMemo(
    () =>
      CATEGORIAS.map((categoria) => ({
        ...categoria,
        cantidad: serviciosDisponibles.filter(
          (servicio) => servicio.categoriaId === categoria.id
        ).length,
      })),
    [serviciosDisponibles]
  );

  const serviciosFiltrados = useMemo(() => {
    let resultado = [...serviciosDisponibles];
    const termino = busquedaDiferida.trim().toLowerCase();

    if (categoriaActiva !== "todos") {
      resultado = resultado.filter(
        (servicio) => servicio.categoriaId === categoriaActiva
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

    resultado.sort((left, right) => {
      if (orden === "precio-asc" || orden === "precio-desc") {
        return compareByPrecio(left, right, orden);
      }

      if (left.destacado !== right.destacado) {
        return Number(right.destacado) - Number(left.destacado);
      }

      return left.nombre.localeCompare(right.nombre, "es");
    });

    return resultado;
  }, [busquedaDiferida, categoriaActiva, orden, serviciosDisponibles]);

  const categoriaActivaData =
    categoriaActiva === "todos"
      ? null
      : categoriasConConteo.find((categoria) => categoria.id === categoriaActiva) ?? null;

  const filtrosActivos = categoriaActiva !== "todos" || busqueda.trim().length > 0;

  return (
    <>
      <section className="bg-mesh-dark overflow-hidden py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <span className="eyebrow text-primary">
              <span className="accent-dot" />
              Catalogo actual
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              Elegi la opcion que mejor encaja con tu evento.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Acá ves todo lo que hoy está disponible. Algunos servicios muestran
              precio base y otros se cotizan segun cantidad, fecha, invitados,
              personal o formato del evento.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                {serviciosDisponibles.length} opciones reales
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                {CATEGORIAS.length} categorias
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200">
                Precios base cuando aplica
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/presupuesto"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
              >
                Pedir propuesta
              </Link>
              <Link
                href="/galeria"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors hover:border-primary/35 hover:bg-white/5"
              >
                Ver galería
              </Link>
            </div>
          </div>

          <div className="hide-scrollbar scroll-fade-right -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
            {categoriasConConteo.map((categoria, index) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`min-w-[84vw] max-w-[18rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] text-left transition-all hover:-translate-y-1 ${
                  categoriaActiva === categoria.id
                    ? "ring-2 ring-primary/55"
                    : ""
                }`}
              >
                <ProductImage
                  src={categoria.imagen}
                  hasImage={availableImageSet.has(categoria.imagen)}
                  alt={categoria.nombre}
                  imagePosition={categoria.imagePosition}
                  fallbackIcon={categoria.icono}
                  fallbackTitle={categoria.nombre}
                  fallbackSubtitle={index === 0 ? "Disponible hoy" : "Catalogo actual"}
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="h-52"
                />
                <div className="soft-panel rounded-b-[1.75rem] px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-secondary">
                      {categoria.nombre}
                    </h2>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                      {categoria.cantidad}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {categoria.descripcion}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {categoriasConConteo.map((categoria, index) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`overflow-hidden rounded-[1.75rem] text-left transition-all hover:-translate-y-1 ${
                  categoriaActiva === categoria.id
                    ? "ring-2 ring-primary/55"
                    : ""
                }`}
              >
                <ProductImage
                  src={categoria.imagen}
                  hasImage={availableImageSet.has(categoria.imagen)}
                  alt={categoria.nombre}
                  imagePosition={categoria.imagePosition}
                  fallbackIcon={categoria.icono}
                  fallbackTitle={categoria.nombre}
                  fallbackSubtitle={index === 0 ? "Disponible hoy" : "Catalogo actual"}
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="h-52"
                />
                <div className="soft-panel rounded-b-[1.75rem] px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-secondary">
                      {categoria.nombre}
                    </h2>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                      {categoria.cantidad}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {categoria.descripcion}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-mesh-light py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="soft-panel rounded-[2rem] p-5 sm:p-6 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-secondary">
                    Buscar servicio
                  </span>
                  <input
                    type="text"
                    placeholder="Ej: copa, plato, cascada, robot..."
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-secondary">
                    Ordenar catálogo
                  </span>
                  <select
                    value={orden}
                    onChange={(event) =>
                      setOrden(event.target.value as OrdenCatalogo)
                    }
                    className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {ORDENES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-[1.5rem] border border-secondary/8 bg-white px-5 py-4">
                <p className="text-sm text-muted">
                  {categoriaActivaData
                    ? `${categoriaActivaData.nombre}: ${categoriaActivaData.descripcion}`
                    : "Mostrando todo el catalogo actual con precios base cuando aplica."}
                </p>
                <p className="mt-3 text-2xl font-semibold text-secondary">
                  {serviciosFiltrados.length} resultado
                  {serviciosFiltrados.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategoriaActiva("todos")}
                className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  categoriaActiva === "todos"
                    ? "bg-secondary text-white"
                    : "bg-white text-muted hover:bg-accent"
                }`}
              >
                Todos
              </button>

              {categoriasConConteo.map((categoria) => (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() => setCategoriaActiva(categoria.id)}
                  className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    categoriaActiva === categoria.id
                      ? "bg-primary text-secondary"
                      : "bg-white text-muted hover:bg-accent"
                  }`}
                >
                  {categoria.icono} {categoria.nombre} ({categoria.cantidad})
                </button>
              ))}

              {filtrosActivos && (
                <button
                  type="button"
                  onClick={() => {
                    setCategoriaActiva("todos");
                    setBusqueda("");
                  }}
                  className="min-h-11 rounded-full border border-secondary/12 px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {serviciosFiltrados.length === 0 ? (
            <div className="soft-panel mt-10 rounded-[2rem] px-6 py-14 text-center">
              <h2 className="font-display text-4xl font-semibold text-secondary">
                No encontramos coincidencias
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
                Probá con otro término o volvé a mostrar todas las categorías.
                Si quieres, te ayudamos por WhatsApp a ver si alguna de estas
                opciones encaja con tu evento.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setCategoriaActiva("todos");
                    setBusqueda("");
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90"
                >
                  Ver todo el catálogo
                </button>
                <Link
                  href="/presupuesto"
                  className="inline-flex items-center justify-center rounded-full border border-secondary/10 px-6 py-3 font-semibold text-secondary transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Pedir ayuda con el presupuesto
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {serviciosFiltrados.map((servicio, index) => {
                const categoria = CATEGORIAS.find(
                  (item) => item.id === servicio.categoriaId
                );

                return (
                  <article
                    key={servicio.id}
                    className="group overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_45px_rgba(23,24,39,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(23,24,39,0.12)]"
                  >
                    <div className="relative">
                      <ProductImage
                        src={servicio.imagen}
                        hasImage={availableImageSet.has(servicio.imagen)}
                        alt={`${servicio.nombre} para alquiler para eventos`}
                        imagePosition={servicio.imagePosition}
                        fallbackIcon={servicio.icono || categoria?.icono || "📦"}
                        fallbackTitle={servicio.nombre}
                        fallbackSubtitle={categoria?.nombre || "Producto"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-56"
                      />
                      {servicio.badge && (
                        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">
                          {servicio.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-secondary">
                          {categoria?.nombre}
                        </span>
                        {servicio.minimoUnidades > 1 && (
                          <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                            Mín. {servicio.minimoUnidades} uds.
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold text-secondary">
                        {servicio.nombre}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {servicio.descripcion}
                      </p>
                      <ServiceBadges items={servicio.idealPara} className="mt-4" />
                      <div className="mt-4 rounded-[1.5rem] bg-accent px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                          Incluye
                        </p>
                        <p className="mt-2 text-sm leading-6 text-secondary">
                          {servicio.incluye[0]}
                        </p>
                      </div>

                      <ul className="mt-4 space-y-1.5 text-sm text-muted">
                        {servicio.detalles.slice(0, 3).map((detalle) => (
                          <li key={detalle}>• {detalle}</li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {formatPrecioOConsulta(
                              servicio.precioUnitario,
                              servicio.precioDesde
                            )}
                          </p>
                          <p className="text-sm text-muted">
                            {formatDetallePrecio(
                              servicio.precioUnitario,
                              servicio.unidad,
                              servicio.precioDesde
                            )}
                          </p>
                        </div>
                      </div>
                      <ServiceCardActions servicio={servicio} />
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
              <span className="eyebrow text-primary">
                <span className="accent-dot" />
                Siguiente paso
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-secondary">
                Si una opcion te cierra, consultanos la fecha y te respondemos rapido.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                La mejor forma de avanzar es pasar del catalogo a una consulta
                concreta con fecha, zona y servicio elegido.
              </p>
            </div>

            <div className="dark-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
                Próximo paso recomendado
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-none text-white">
                Pasar del catalogo a una consulta concreta por WhatsApp.
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-300">
                Si viste algo que te interesa, te respondemos con disponibilidad,
                cotizacion segun tu evento y forma de reserva.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/presupuesto"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-primary-dark"
                >
                  Pedir propuesta
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors hover:border-primary/35 hover:bg-white/5"
                >
                  Hacer una consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
