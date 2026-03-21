// ============================================================
// ARCHIVO DE CONFIGURACION CENTRAL
// Modifica aqui textos, precios, servicios e info del negocio
// ============================================================

// --- INFORMACION DE LA EMPRESA ---
export const EMPRESA = {
  nombre: "Elegance Catering",
  slogan: "Servicios seleccionados para eventos en Zona Norte",
  descripcion:
    "Alquiler para eventos en Zona Norte con una seleccion actual de servicios para resolver momentos clave del evento. Hoy ofrecemos pack grande de vasijas para servicio, fuente de chocolate y robot LED para animacion.",
  telefono: "+54 9 11 3954-3710",
  telefonoWhatsapp: "5491139543710",
  email: "",
  direccion: "Zona Norte, Buenos Aires, Argentina",
  localidad: "Zona Norte",
  horario: "Atencion 24 horas",
  googleMapsUrl: "https://maps.google.com/?q=Don+Torcuato,Buenos+Aires,Argentina",
  redesSociales: {
    instagram: "https://instagram.com/griselda_catering",
  },
  zonasCobertura: [
    "Don Torcuato",
    "San Isidro",
    "Tigre",
    "Nordelta",
    "Pilar",
    "Martinez",
    "Olivos",
    "Vicente Lopez",
    "Boulogne",
    "Florida",
  ],
};

// --- CONFIGURACION GENERAL ---
export const CONFIG = {
  moneda: "$",
  diasAntelacionMinima: 5,
  porcentajeSena: 30,
  mediosPago: ["Efectivo", "Transferencia bancaria", "Mercado Pago"],
};

// Helper para formatear precios en ARS
export function formatPrecio(valor: number): string {
  return valor.toLocaleString("es-AR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function tienePrecio(valor: number): boolean {
  return valor > 0;
}

export function formatPrecioOConsulta(
  valor: number,
  desde = false
): string {
  if (!tienePrecio(valor)) {
    return "Consultar";
  }

  return `${desde ? "Desde " : ""}${CONFIG.moneda}${formatPrecio(valor)}`;
}

export function formatDetallePrecio(
  valor: number,
  unidad: string,
  desde = false
): string {
  if (!tienePrecio(valor)) {
    return "Cotizacion personalizada";
  }

  return desde ? `Valor base ${unidad}` : unidad;
}

// --- CATEGORIAS DE SERVICIOS ---
export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  imagen: string;
  imagePosition?: string;
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "decoracion",
    nombre: "Vasijas para Servicio",
    descripcion:
      "Pack grande de vasijas, bowls y fuentes para presentar y servir alimentos en mesas, buffet y estaciones de evento.",
    icono: "🥣",
    imagen: "/images/productos/pack-vasijas.png",
    imagePosition: "center 60%",
  },
  {
    id: "fuentes",
    nombre: "Fuente de Chocolate",
    descripcion:
      "Servicio de fuente de chocolate para sumar impacto visual y una experiencia dulce en el evento.",
    icono: "🍫",
    imagen: "/images/productos/torre-chocolate.png",
    imagePosition: "center 20%",
  },
  {
    id: "animacion",
    nombre: "Robot LED",
    descripcion:
      "Animacion con personaje y robot LED para entradas, momentos especiales y celebraciones.",
    icono: "🤖",
    imagen: "/images/productos/robot-led.png",
    imagePosition: "center 34%",
  },
];

// --- SERVICIOS / PRODUCTOS ---
export type Servicio = {
  id: string;
  categoriaId: string;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  precioDesde?: boolean;
  unidad: string;
  minimoUnidades: number;
  permiteMultiples?: boolean;
  imagen: string;
  imagePosition?: string;
  destacado: boolean;
  disponible: boolean;
  idealPara: string[];
  incluye: string[];
  instagramCaption: string;
  detalles: string[];
};

export const SERVICIOS: Servicio[] = [
  {
    id: "pack-grande-vasijas",
    categoriaId: "decoracion",
    nombre: "Pack Grande de Vasijas",
    descripcion:
      "Pack grande de vasijas, bowls y fuentes para presentacion y servicio de alimentos en eventos.",
    precioUnitario: 59000,
    precioDesde: true,
    unidad: "por pack",
    minimoUnidades: 1,
    permiteMultiples: true,
    imagen: "/images/productos/pack-vasijas.png",
    imagePosition: "center 60%",
    destacado: true,
    disponible: true,
    idealPara: ["Buffet", "Mesa dulce", "Recepcion"],
    incluye: [
      "Set amplio de bowls, fuentes y piezas para servicio",
      "Armado segun estilo, mesa y cantidad de invitados",
      "Orientacion para elegir la composicion mas conveniente",
    ],
    instagramCaption:
      "Ideas de armado, combinaciones y presentacion para buffet, mesa dulce y recepcion.",
    detalles: [
      "Pack pensado para buffet, mesas dulces, recepciones y estaciones de servicio",
      "Incluye piezas para presentar y servir alimentos con una imagen cuidada",
      "Se arma segun estilo, cantidad y tipo de montaje del evento",
      "Valor base orientativo, ajustable segun composicion y traslado",
    ],
  },
  {
    id: "fuente-chocolate",
    categoriaId: "fuentes",
    nombre: "Fuente de Chocolate",
    descripcion:
      "Fuente de chocolate para eventos con presencia visual y servicio pensado para sorprender.",
    precioUnitario: 149000,
    precioDesde: true,
    unidad: "por evento",
    minimoUnidades: 1,
    permiteMultiples: false,
    imagen: "/images/productos/torre-chocolate.png",
    imagePosition: "center 20%",
    destacado: true,
    disponible: true,
    idealPara: ["Cumpleanos", "Recepcion", "Evento especial"],
    incluye: [
      "Montaje visual pensado para sorprender en el momento dulce",
      "Formato ajustable segun cantidad de invitados y duracion",
      "Presencia protagonista para fotos, mesa dulce o cierre del evento",
    ],
    instagramCaption:
      "Una opcion visual fuerte para el momento dulce, recepciones y celebraciones especiales.",
    detalles: [
      "Ideal para cumpleanos y eventos especiales",
      "Se arma segun duracion y cantidad de invitados",
      "Valor base orientativo, ajustable segun insumos, tiempo y traslado",
    ],
  },
  {
    id: "robot-led",
    categoriaId: "animacion",
    nombre: "Robot LED / Personaje Animado",
    descripcion:
      "Animacion con disfraz y robot LED para entradas, fotos y momentos de alto impacto.",
    precioUnitario: 139000,
    precioDesde: true,
    unidad: "por evento",
    minimoUnidades: 1,
    permiteMultiples: false,
    imagen: "/images/productos/robot-led.png",
    imagePosition: "center 8%",
    destacado: true,
    disponible: true,
    idealPara: ["Entrada", "Fotos", "Fiesta nocturna"],
    incluye: [
      "Aparicion de alto impacto para entrada o momento puntual",
      "Animacion y presencia visual para fotos y video",
      "Formato adaptable segun horario, espacio y tipo de evento",
    ],
    instagramCaption:
      "Entradas, fotos y momentos de impacto con robot LED para fiestas y eventos nocturnos.",
    detalles: [
      "Ideal para cumpleanos, fiestas privadas y eventos nocturnos",
      "Aporta impacto visual y animacion",
      "Valor base orientativo, ajustable segun duracion, zona y formato",
    ],
  },
];

// --- PREGUNTAS FRECUENTES ---
export type FAQ = {
  pregunta: string;
  respuesta: string;
};

export const FAQS: FAQ[] = [
  {
    pregunta: "¿Que tienen disponible hoy?",
    respuesta:
      "Hoy trabajamos con una seleccion actual y real: pack grande de vasijas para servicio, fuente de chocolate y robot LED para animacion. Preferimos mostrar solo lo que realmente podemos ofrecer bien.",
  },
  {
    pregunta: "¿Con cuanta anticipacion tengo que reservar?",
    respuesta: `Recomendamos reservar con al menos ${CONFIG.diasAntelacionMinima} dias de anticipacion para organizar disponibilidad, traslado y armado.`,
  },
  {
    pregunta: "¿Trabajan en toda Zona Norte?",
    respuesta: `Si. Cubrimos Don Torcuato y gran parte de Zona Norte: ${EMPRESA.zonasCobertura.join(", ")} y alrededores.`,
  },
  {
    pregunta: "¿Los precios estan publicados?",
    respuesta:
      "Si. Mostramos valores base desde para que tengas una referencia real. El valor final puede variar segun cantidad, duracion, traslado y tipo de evento.",
  },
  {
    pregunta: "¿Puedo contratar solo una de las opciones?",
    respuesta:
      "Si. Puedes contratar solo la fuente de chocolate, solo el pack grande de vasijas para servicio o solo el robot LED, segun lo que necesites.",
  },
  {
    pregunta: "¿Como funciona la reserva?",
    respuesta:
      "Nos escribes, te confirmamos disponibilidad, definimos detalles del evento y luego reservas con seña para dejar la fecha tomada.",
  },
  {
    pregunta: "¿Que medios de pago aceptan?",
    respuesta: `Aceptamos ${CONFIG.mediosPago.join(", ")}. La seña habitual es del ${CONFIG.porcentajeSena}% para confirmar la fecha.`,
  },
];

// --- TIPOS DE EVENTO ---
export const TIPOS_EVENTO = [
  "Casamiento",
  "Cumpleanos",
  "Cumpleanos infantil",
  "Bautismo / Comunion",
  "Evento corporativo",
  "Fiesta privada",
  "Recepcion",
  "Otro",
];

export const PROCESO_RESERVA = [
  "Nos escribes por WhatsApp con fecha, zona y servicio.",
  "Te confirmamos disponibilidad y valor final segun tu evento.",
  "Reservas con seña y coordinamos los detalles.",
];
