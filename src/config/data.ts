// ============================================================
// ARCHIVO DE CONFIGURACION CENTRAL
// Modifica aqui textos, precios, servicios e info del negocio
// ============================================================

// --- INFORMACION DE LA EMPRESA ---
export const EMPRESA = {
  nombre: "Elegance Catering",
  slogan:
    "Vajilla, cristaleria, barra con personal, mozos y manteleria para eventos en Zona Norte",
  descripcion:
    "Alquiler para eventos en Zona Norte con vajilla, cristaleria, manteleria, servicio de barra movil con personal y servicio de mozo para recepciones y celebraciones. Tambien ofrecemos cascada de chocolate de 8 pisos y robot LED para momentos especiales del evento.",
  telefono: "+54 9 11 6144-9502",
  telefonoWhatsapp: "5491161449502",
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
    id: "vajilla-cristaleria",
    nombre: "Vajilla y Cristaleria",
    descripcion:
      "Copas, platos, cubiertos y piezas de servicio para mesas, recepciones, buffet y estaciones de cafe.",
    icono: "🍽️",
    imagen: "/images/productos/pack-vajillas.png",
    imagePosition: "center 60%",
  },
  {
    id: "barra-bebidas",
    nombre: "Barra y Bebidas",
    descripcion:
      "Servicio completo de barra movil luminosa con personal, cristaleria para tragos y opcion con o sin bebidas. Consultar promociones.",
    icono: "🍸",
    imagen: "/images/productos/barra-movil.png",
    imagePosition: "center 56%",
  },
  {
    id: "manteleria",
    nombre: "Manteleria",
    descripcion:
      "Manteles redondos, caminos, cubre sillas tipo poncho, lazos y servilletas para vestir mesas y sillas.",
    icono: "🪄",
    imagen: "/images/productos/mantel-redondo.png",
    imagePosition: "center 52%",
  },
  {
    id: "personal-servicio",
    nombre: "Servicio de Mozo",
    descripcion:
      "Personal de mozo para recepcion, servicio de mesa y apoyo durante el evento.",
    icono: "🤵",
    imagen: "/images/productos/servicio-mozo.png",
    imagePosition: "center 42%",
  },
  {
    id: "fuentes",
    nombre: "Cascada de Chocolate",
    descripcion:
      "Servicio de cascada de chocolate de 8 pisos con frutas de estacion para sumar impacto visual y una experiencia dulce en el evento.",
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
  icono: string;
  destacado: boolean;
  disponible: boolean;
  idealPara: string[];
  incluye: string[];
  instagramCaption: string;
  detalles: string[];
};

type CatalogoProductoInput = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  idealPara: string[];
  detalles: string[];
  incluye?: string[];
  instagramCaption: string;
  destacado?: boolean;
  unidad?: string;
  minimoUnidades?: number;
};

function createCatalogProduct(
  categoriaId: string,
  defaultIncluye: string[],
  {
    id,
    nombre,
    descripcion,
    icono,
    idealPara,
    detalles,
    incluye,
    instagramCaption,
    destacado = false,
    unidad = "por unidad",
    minimoUnidades = 10,
  }: CatalogoProductoInput
): Servicio {
  return {
    id,
    categoriaId,
    nombre,
    descripcion,
    precioUnitario: 0,
    unidad,
    minimoUnidades,
    permiteMultiples: true,
    imagen: `/images/productos/${id}.png`,
    icono,
    destacado,
    disponible: true,
    idealPara,
    incluye: incluye ?? defaultIncluye,
    instagramCaption,
    detalles,
  };
}

function createVajillaProducto(input: CatalogoProductoInput): Servicio {
  return createCatalogProduct("vajilla-cristaleria", [
    "Alquiler segun cantidad, fecha y disponibilidad de stock",
    "Se puede combinar con otros productos de vajilla y servicio",
    "Cotizacion final segun cantidad, traslado y tipo de evento",
  ], input);
}

function createManteleriaProducto(input: CatalogoProductoInput): Servicio {
  return createCatalogProduct("manteleria", [
    "Alquiler segun medida, cantidad y disponibilidad de stock",
    "Se puede combinar con vajilla, sillas y armado de mesa",
    "Cotizacion final segun cantidad, traslado y tipo de evento",
  ], input);
}

const PRODUCTOS_CATALOGO: Servicio[] = [
  createVajillaProducto({
    id: "copa-agua",
    nombre: "Copa de Agua",
    descripcion:
      "Copa de agua para servicio de mesa en eventos, ideal para armado de vajilla y cristaleria.",
    icono: "💧",
    destacado: true,
    idealPara: ["Servicio de mesa", "Recepcion", "Eventos formales"],
    detalles: [
      "Disponible para armado de mesas y recepciones",
      "Se alquila segun cantidad necesaria para el evento",
      "Combina con copas de vino y champagne",
    ],
    instagramCaption:
      "Cristaleria para mesas bien presentadas, armados completos y eventos con imagen cuidada.",
  }),
  createVajillaProducto({
    id: "copa-vino",
    nombre: "Copa de Vino",
    descripcion:
      "Copa de vino para servicio de mesa y brindis en almuerzos, cenas y celebraciones.",
    icono: "🍷",
    destacado: true,
    idealPara: ["Cena", "Brindis", "Mesa principal"],
    detalles: [
      "Pensada para acompanar servicio de vino en eventos",
      "Se alquila por cantidad y segun disponibilidad",
      "Ideal para mesas principales y celebraciones",
    ],
    instagramCaption:
      "Copas de vino para mesas elegantes, cenas y celebraciones en Zona Norte.",
  }),
  createVajillaProducto({
    id: "copa-champagne",
    nombre: "Copa de Champagne",
    descripcion:
      "Copa de champagne para brindis, recepciones y momentos especiales del evento.",
    icono: "🥂",
    idealPara: ["Brindis", "Recepcion", "Casamientos"],
    detalles: [
      "Ideal para brindis y recepciones",
      "Aporta una presentacion mas completa de la mesa",
      "Se cotiza segun cantidad y fecha del evento",
    ],
    instagramCaption:
      "Una opcion clasica para brindis, recepciones y momentos especiales.",
  }),
  createVajillaProducto({
    id: "copa-helado",
    nombre: "Copa de Helado",
    descripcion:
      "Copa de helado para postres, mesas dulces y estaciones de servicio.",
    icono: "🍨",
    idealPara: ["Postre", "Mesa dulce", "Celebraciones"],
    detalles: [
      "Ideal para servir helado, ensalada de frutas o postres",
      "Se puede sumar a mesas dulces y estaciones especiales",
      "Cantidad sujeta a stock y armado del evento",
    ],
    instagramCaption:
      "Copas para postres y mesas dulces con una presentacion prolija y lista para evento.",
  }),
  createVajillaProducto({
    id: "plato-llano-24cm",
    nombre: "Plato Llano de Porcelana Blanco 24 cm",
    descripcion:
      "Plato llano de porcelana blanca de 24 cm para servicio principal en eventos.",
    icono: "🍽️",
    destacado: true,
    idealPara: ["Almuerzo", "Cena", "Servicio de mesa"],
    detalles: [
      "Plato principal para armado de vajilla blanca clasica",
      "Apto para mesas formales y eventos sociales",
      "Se alquila por cantidad segun el armado necesario",
    ],
    instagramCaption:
      "Plato llano blanco para mesas limpias, elegantes y faciles de combinar.",
  }),
  createVajillaProducto({
    id: "plato-postre-18cm",
    nombre: "Plato de Porcelana Blanco Postre 18 cm",
    descripcion:
      "Plato de porcelana blanca de 18 cm para postres, entradas o servicio complementario.",
    icono: "🍽️",
    destacado: true,
    idealPara: ["Postre", "Entrada", "Mesa completa"],
    detalles: [
      "Ideal para completar un armado de mesa prolijo",
      "Puede usarse para postre, pan o entrada",
      "Se cotiza segun cantidad y fecha",
    ],
    instagramCaption:
      "Platos de postre blancos para armar una mesa completa y combinable.",
  }),
  createVajillaProducto({
    id: "tenedor",
    nombre: "Tenedor",
    descripcion:
      "Tenedor para servicio de mesa en eventos, disponible por cantidad.",
    icono: "🍴",
    idealPara: ["Servicio de mesa", "Cena", "Lunch"],
    detalles: [
      "Complementa el armado de cubiertos del evento",
      "Se alquila por cantidad segun necesidad",
      "Ideal para mesas completas y recepciones",
    ],
    instagramCaption:
      "Cubiertos para completar el servicio de mesa y el armado del evento.",
  }),
  createVajillaProducto({
    id: "cuchillo",
    nombre: "Cuchillo",
    descripcion:
      "Cuchillo para servicio de mesa en eventos, disponible por cantidad.",
    icono: "🍴",
    idealPara: ["Servicio de mesa", "Cena", "Lunch"],
    detalles: [
      "Se suma al armado completo de cubiertos",
      "Disponible por cantidad para eventos sociales y corporativos",
      "Cotizacion segun stock y fecha",
    ],
    instagramCaption:
      "Cuchillos para servicio de mesa con armado claro y coordinado.",
  }),
  createVajillaProducto({
    id: "cuchara-postre",
    nombre: "Cuchara de Postre",
    descripcion:
      "Cuchara de postre para mesas dulces, servicio de postre o cafe.",
    icono: "🥄",
    idealPara: ["Postre", "Cafe", "Mesa dulce"],
    detalles: [
      "Ideal para postres, cafe y servicio complementario",
      "Disponible para armado de mesa completa",
      "Se alquila segun cantidad y disponibilidad",
    ],
    instagramCaption:
      "Cucharas de postre para completar el servicio y los detalles de mesa.",
  }),
  createVajillaProducto({
    id: "panera-mimbre",
    nombre: "Panera de Mimbre",
    descripcion:
      "Panera de mimbre para servicio de mesa, panificados o estaciones de buffet.",
    icono: "🍞",
    idealPara: ["Mesa principal", "Buffet", "Recepcion"],
    detalles: [
      "Ideal para panes, grisines o acompanamientos",
      "Suma calidez a la mesa y al servicio",
      "Se alquila por unidad o por cantidad",
    ],
    instagramCaption:
      "Paneras para completar la mesa y sumar orden en el servicio.",
    minimoUnidades: 1,
  }),
  createVajillaProducto({
    id: "ensaladera-acero",
    nombre: "Ensaladera de Acero",
    descripcion:
      "Ensaladera de acero para presentacion y servicio en buffet o mesas compartidas.",
    icono: "🥗",
    idealPara: ["Buffet", "Mesa compartida", "Servicio"],
    detalles: [
      "Ideal para ensaladas, acompanamientos y servicio frio",
      "Disponible para buffet y armado de mesa",
      "Se coordina cantidad segun formato del evento",
    ],
    instagramCaption:
      "Piezas de servicio para buffet y mesas con una presentacion limpia y funcional.",
    minimoUnidades: 1,
  }),
  createVajillaProducto({
    id: "plato-sitio",
    nombre: "Plato de Sitio",
    descripcion:
      "Plato de sitio decorativo para vestir la mesa y sumar una presentacion mas cuidada.",
    icono: "✨",
    idealPara: ["Mesa principal", "Casamientos", "Eventos formales"],
    detalles: [
      "Aporta presencia visual al armado de mesa",
      "Se usa como base decorativa para plato principal",
      "Cotizacion segun cantidad y estilo del evento",
    ],
    instagramCaption:
      "Platos de sitio para mesas mas vestidas y una puesta en escena mas fuerte.",
  }),
  createManteleriaProducto({
    id: "mantel-redondo",
    nombre: "Mantel Redondo 3 m",
    descripcion:
      "Mantel redondo de 3 metros disponible en blanco o negro para vestir mesas de evento.",
    icono: "🪄",
    destacado: true,
    idealPara: ["Mesa principal", "Mesas redondas", "Casamientos"],
    detalles: [
      "Disponible en color blanco y negro",
      "Medida de 3 metros para mesas redondas de evento",
      "Se cotiza segun cantidad, fecha y formato del armado",
    ],
    instagramCaption:
      "Manteles redondos blancos y negros para mesas mejor vestidas y eventos bien presentados.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "camino-mesa",
    nombre: "Camino de Colores",
    descripcion:
      "Camino de colores para sumar detalle, contraste y terminacion a la mesa.",
    icono: "✨",
    idealPara: ["Mesa principal", "Decoracion", "Recepcion"],
    detalles: [
      "Disponible en distintos colores para combinar con la ambientacion",
      "Acompana bien platos de sitio, centros y vajilla",
      "Se cotiza segun cantidad, color y estilo del evento",
    ],
    instagramCaption:
      "Caminos de colores para dar terminacion y personalidad al armado del evento.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "servilleta-tela",
    nombre: "Servilletas Blancas y Negras",
    descripcion:
      "Servilletas de tela blancas y negras para completar el armado de mesa.",
    icono: "🧺",
    idealPara: ["Servicio de mesa", "Cena", "Eventos formales"],
    detalles: [
      "Completa el armado de mesa con una terminacion mas cuidada",
      "Disponible en blanco y negro segun el estilo del evento",
      "Se puede combinar con manteles, caminos y vajilla",
    ],
    instagramCaption:
      "Servilletas blancas y negras para una mesa mas completa y mejor presentada.",
  }),
  createManteleriaProducto({
    id: "cubre-sillas-poncho",
    nombre: "Cubre Sillas Tipo Poncho",
    descripcion:
      "Cubre sillas tipo poncho en blanco o negro para vestir mejor el salon y las mesas.",
    icono: "🪑",
    idealPara: ["Salon", "Casamientos", "Eventos formales"],
    detalles: [
      "Disponible en color blanco y negro",
      "Ayuda a unificar la imagen del salon y las mesas",
      "Se cotiza segun cantidad, tipo de silla y fecha",
    ],
    instagramCaption:
      "Cubre sillas tipo poncho para una imagen mas prolija y un salon mejor vestido.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "lazo-colores",
    nombre: "Lazos de Colores",
    descripcion:
      "Lazos de colores para complementar sillas, manteleria y detalles del armado.",
    icono: "🎀",
    idealPara: ["Sillas", "Mesas principales", "Decoracion"],
    detalles: [
      "Disponibles en distintos colores para combinar con el evento",
      "Se usan para acompañar cubre sillas y detalles textiles",
      "Se cotiza segun cantidad, color y formato del armado",
    ],
    instagramCaption:
      "Lazos de colores para sumar detalle y coordinacion visual al montaje.",
    minimoUnidades: 1,
  }),
];

export const SERVICIOS: Servicio[] = [
  ...PRODUCTOS_CATALOGO,
  {
    id: "barra-movil",
    categoriaId: "barra-bebidas",
    nombre: "Servicio Completo de Barra Movil Luminosa",
    descripcion:
      "Servicio completo de barra movil luminosa con personal, copas y vasos para tragos, shots y frascos personalizados. Puede contratarse con o sin bebidas segun el formato del evento.",
    precioUnitario: 0,
    unidad: "por servicio",
    minimoUnidades: 1,
    permiteMultiples: false,
    imagen: "/images/productos/barra-movil.png",
    imagePosition: "center 56%",
    icono: "🍸",
    destacado: true,
    disponible: true,
    idealPara: ["Recepcion", "Cumpleanos", "Barra completa"],
    incluye: [
      "Barra movil luminosa con presencia visual para la recepcion o la fiesta",
      "Personal de barra para atencion y servicio durante el formato acordado",
      "Cristaleria y presentacion: copas para tragos, vasos largos y cortos, shots, vasos de whisky y frascos personalizados",
    ],
    instagramCaption:
      "Servicio completo de barra movil con personal, cristaleria y opcion con o sin bebidas para eventos sociales.",
    detalles: [
      "No se alquila solo el mueble: trabajamos la barra como servicio completo",
      "Puede contratarse con bebidas o sin bebidas segun el formato del evento",
      "Consultar promociones, disponibilidad y armado segun fecha, zona e invitados",
    ],
  },
  {
    id: "servicio-mozo",
    categoriaId: "personal-servicio",
    nombre: "Servicio de Mozo",
    descripcion:
      "Servicio de mozo para recepcion, servicio de mesa, apoyo en salon y acompanamiento general durante el evento.",
    precioUnitario: 0,
    unidad: "por mozo",
    minimoUnidades: 1,
    permiteMultiples: true,
    imagen: "/images/productos/servicio-mozo.png",
    imagePosition: "center 42%",
    icono: "🤵",
    destacado: true,
    disponible: true,
    idealPara: ["Recepcion", "Mesa", "Apoyo de salon"],
    incluye: [
      "Atencion de recepcion, servicio de mesa o apoyo general segun el formato del evento",
      "Se puede combinar con vajilla, manteleria, barra y armado general",
      "Coordinacion segun horario, cantidad de invitados y dinamica del servicio",
    ],
    instagramCaption:
      "Servicio de mozo para recepciones, mesa y apoyo general con una atencion mas prolija durante el evento.",
    detalles: [
      "Pensado para eventos sociales, recepciones y celebraciones con servicio cuidado",
      "Se cotiza segun cantidad de mozos, horas, tareas y tipo de evento",
      "Consultar disponibilidad, formato de trabajo y combinaciones con otros servicios",
    ],
  },
  {
    id: "fuente-chocolate",
    categoriaId: "fuentes",
    nombre: "Cascada de Chocolate de 8 Pisos",
    descripcion:
      "Cascada de chocolate de 8 pisos con 5 kg de chocolate, 10 kg de frutas de estacion y servicio pensado para unas 100 personas aprox.",
    precioUnitario: 149000,
    precioDesde: true,
    unidad: "por evento",
    minimoUnidades: 1,
    permiteMultiples: false,
    imagen: "/images/productos/torre-chocolate.png",
    imagePosition: "center 20%",
    icono: "🍫",
    destacado: true,
    disponible: true,
    idealPara: ["Recepcion", "Cumpleanos", "100 personas aprox."],
    incluye: [
      "Cascada de chocolate de 8 pisos con presencia visual protagonista",
      "Incluye 5 kg de chocolate y 10 kg de frutas de estacion",
      "Pensada para rendir aproximadamente para 100 personas",
    ],
    instagramCaption:
      "Una cascada de 8 pisos para recepciones y celebraciones con presencia fuerte, chocolate y frutas listas para compartir.",
    detalles: [
      "Servicio protagonista para recepciones, cumpleanos, bodas y eventos especiales",
      "Incluye cascada de 8 pisos, 5 kg de chocolate y 10 kg de frutas de estacion",
      "Rinde aproximadamente para 100 personas segun formato de servicio",
      "Se coordina segun horario, traslado y dinamica del evento",
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
    icono: "🤖",
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
      "Hoy trabajamos con vajilla y cristaleria para eventos, servicio completo de barra movil con personal, servicio de mozo, manteleria, cascada de chocolate y robot LED. Preferimos mostrar solo lo que realmente tenemos disponible.",
  },
  {
    pregunta: "¿Con cuanta anticipacion tengo que reservar?",
    respuesta: `Recomendamos reservar con al menos ${CONFIG.diasAntelacionMinima} dias de anticipacion para organizar disponibilidad, cantidades, traslado y armado.`,
  },
  {
    pregunta: "¿Trabajan en toda Zona Norte?",
    respuesta: `Si. Cubrimos Don Torcuato y gran parte de Zona Norte: ${EMPRESA.zonasCobertura.join(", ")} y alrededores.`,
  },
  {
    pregunta: "¿La barra se alquila por partes o es un servicio completo?",
    respuesta:
      "La barra la trabajamos como servicio completo. Incluye barra movil luminosa, personal y el equipamiento de cristaleria y presentacion segun el formato acordado. No se alquila solo el mueble por separado.",
  },
  {
    pregunta: "¿La vajilla y la manteleria se alquilan por cantidad?",
    respuesta:
      "Si. La vajilla, la cristaleria y la manteleria se cotizan segun cantidad, medida, fecha y disponibilidad para tu evento.",
  },
  {
    pregunta: "¿Como se cotiza el servicio de mozo?",
    respuesta:
      "El servicio de mozo se cotiza segun cantidad de mozos, horas de trabajo, tipo de evento, tareas requeridas y zona. Lo ideal es escribirnos con fecha, invitados y formato para orientarte mejor.",
  },
  {
    pregunta: "¿Los precios estan publicados?",
    respuesta:
      "Mostramos valores base cuando el servicio lo permite. En vajilla y manteleria preferimos cotizar segun cantidad y medida. La barra y el servicio de mozo se cotizan segun invitados, formato, personal, horarios y promociones vigentes.",
  },
  {
    pregunta: "¿La barra puede ser con o sin bebidas?",
    respuesta:
      "Si. La barra puede contratarse con bebidas o sin bebidas, segun el formato del evento. Siempre recomendamos escribirnos para pasarte la opcion mas conveniente y contarte las promociones disponibles.",
  },
  {
    pregunta: "¿Puedo contratar solo una parte del catalogo?",
    respuesta:
      "Si. Puedes contratar solo vajilla, solo barra, solo servicio de mozo, solo manteleria, solo la cascada de chocolate, solo el robot LED o una combinacion segun lo que necesites.",
  },
  {
    pregunta: "¿Que incluye la cascada de chocolate?",
    respuesta:
      "La cascada de chocolate incluye una estructura de 8 pisos, 5 kg de chocolate y 10 kg de frutas de estacion. Como referencia general, esta pensada para aproximadamente 100 personas.",
  },
  {
    pregunta: "¿Como funciona la reserva?",
    respuesta:
      "Nos escribes, te confirmamos disponibilidad, definimos cantidades y detalles del evento, y luego reservas con seña para dejar la fecha tomada.",
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
  "Nos escribes por WhatsApp con fecha, zona, cantidad y productos.",
  "Te confirmamos disponibilidad y te pasamos la cotizacion segun tu evento.",
  "Reservas con sena y coordinamos entrega, retiro o armado.",
];
