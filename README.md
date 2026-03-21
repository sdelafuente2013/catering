# Elegance Catering

Sitio comercial en Next.js 16 para mostrar un catalogo real y chico de alquiler para eventos en Zona Norte.

## Catalogo actual

- Pack Grande de Vasijas
- Fuente de Chocolate
- Robot LED / Personaje Animado

## Stack

- Next.js 16.2.1
- React 19
- Tailwind CSS 4
- TypeScript

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run image-prompts
```

## Imagenes

La web toma las imagenes desde `public/images`.

Pendientes principales:

- `public/images/productos/pack-vasijas.png`
- `public/images/productos/torre-chocolate.png`
- `public/images/productos/robot-led.png`

Los prompts listos para generar las imagenes estan en:

- [docs/prompts-imagenes-productos.md](./docs/prompts-imagenes-productos.md)

## Estructura util

- `src/config/data.ts`: datos del negocio, servicios, precios y FAQs
- `src/app/`: paginas de App Router
- `src/components/`: header, footer, cards e imagenes
- `src/lib/contact.ts`: enlaces de WhatsApp, telefono y contacto
- `scripts/generate-image-prompts.mjs`: genera el documento de prompts pendiente
- `scripts/generate-openai-images.mjs`: flujo opcional para generar imagenes por API

## Criterio del proyecto

- Mostrar solo lo que realmente esta disponible hoy
- Priorizar conversion mobile y cierre por WhatsApp
- Mantener textos honestos, simples y faciles de actualizar
