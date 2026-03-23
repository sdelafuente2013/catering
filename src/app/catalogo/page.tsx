import type { Metadata } from "next";
import { CATEGORIAS } from "@/config/data";
import CatalogoClient from "./CatalogoClient";
import { getAvailablePublicImages } from "@/lib/publicImages";

export const metadata: Metadata = {
  title: "Catálogo completo",
  description:
    "Explora las opciones reales disponibles hoy: vajilla, barra, servicio de mozo, manteleria, cascada de chocolate y robot LED para eventos en Zona Norte.",
  alternates: {
    canonical: "/catalogo",
  },
};

type CatalogoPageProps = {
  searchParams: Promise<{
    categoria?: string | string[];
    q?: string | string[];
  }>;
};

export default async function CatalogoPage({
  searchParams,
}: CatalogoPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoriaParam = resolvedSearchParams.categoria;
  const busquedaParam = resolvedSearchParams.q;

  const categoriaInicial =
    typeof categoriaParam === "string" &&
    CATEGORIAS.some((categoria) => categoria.id === categoriaParam)
      ? categoriaParam
      : "todos";

  const busquedaInicial =
    typeof busquedaParam === "string" ? busquedaParam.trim().slice(0, 80) : "";

  return (
    <CatalogoClient
      categoriaInicial={categoriaInicial}
      busquedaInicial={busquedaInicial}
      availableImages={getAvailablePublicImages()}
    />
  );
}
