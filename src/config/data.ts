// ============================================================
// ARCHIVO DE CONFIGURACION CENTRAL
// Modifica aqui textos, precios, servicios e info del negocio
// ============================================================

// --- INFORMACION DE LA EMPRESA ---
export const EMPRESA = {
  nombre: "Elegance Catering",
  slogan:
    "Vajilla premium de restaurante, cristaleria, barra con personal, mozos y manteleria para eventos en Zona Norte",
  descripcion:
    "Alquiler de vajilla linea premium restaurante, cristaleria profesional, manteleria, servicio de barra movil con personal y mozos para eventos en Zona Norte. Tambien ofrecemos cascada de chocolate de 8 pisos y robot LED para momentos especiales.",
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

// --- PRUEBA SOCIAL ---
export const SOCIAL_PROOF = {
  eventosRealizados: "+200",
  clientesSatisfechos: "98%",
  anosExperiencia: "+5",
  testimonios: [
    {
      texto: "La vajilla es impecable, parecia un restaurante de primer nivel. Todos preguntaron de donde era.",
      autor: "Camila R.",
      evento: "Casamiento en Nordelta",
    },
    {
      texto: "La barra fue el centro de la fiesta. El personal super profesional y la presentacion increible.",
      autor: "Martin L.",
      evento: "Cumpleanos 40 en San Isidro",
    },
    {
      texto: "Contratamos vajilla, manteleria y mozos. Todo coordinado, puntual y con una calidad que no esperabamos para alquiler.",
      autor: "Florencia S.",
      evento: "Evento corporativo en Olivos",
    },
  ],
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
    return "Cotizar gratis";
  }

  return `${desde ? "Desde " : ""}${CONFIG.moneda}${formatPrecio(valor)}`;
}

export function formatDetallePrecio(
  valor: number,
  unidad: string,
  desde = false
): string {
  if (!tienePrecio(valor)) {
    return "Respuesta en minutos por WhatsApp";
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
      "Linea premium restaurante: copas, platos de porcelana, cubiertos profesionales y piezas de servicio que elevan cualquier mesa.",
    icono: "🍽️",
    imagen: "/images/productos/pack-vajillas.png",
    imagePosition: "center 60%",
  },
  {
    id: "barra-bebidas",
    nombre: "Barra y Bebidas",
    descripcion:
      "Barra movil luminosa con bartender profesional, cristaleria completa y opcion con o sin bebidas. El centro de atencion de tu fiesta.",
    icono: "🍸",
    imagen: "/images/productos/barra-movil.png",
    imagePosition: "center 56%",
  },
  {
    id: "manteleria",
    nombre: "Manteleria",
    descripcion:
      "Manteles, caminos, cubre sillas, lazos y servilletas de tela para transformar el salon en algo que tus invitados van a recordar.",
    icono: "🪄",
    imagen: "/images/productos/mantel-redondo.png",
    imagePosition: "center 52%",
  },
  {
    id: "personal-servicio",
    nombre: "Servicio de Mozo",
    descripcion:
      "Personal de servicio profesional para que vos disfrutes del evento mientras tus invitados son atendidos como en un restaurante.",
    icono: "🤵",
    imagen: "/images/productos/servicio-mozo.png",
    imagePosition: "center 42%",
  },
  {
    id: "fuentes",
    nombre: "Cascada de Chocolate",
    descripcion:
      "8 pisos de chocolate con frutas frescas. El momento que todos esperan y donde se juntan las mejores fotos del evento.",
    icono: "🍫",
    imagen: "/images/productos/torre-chocolate.png",
    imagePosition: "center 20%",
  },
  {
    id: "animacion",
    nombre: "Robot LED",
    descripcion:
      "El momento WOW de la noche. Entrada con impacto, fotos virales y una energia que cambia el clima de la fiesta.",
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
  badge?: string;
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
  badge?: string;
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
    badge,
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
    badge,
  };
}

function createVajillaProducto(input: CatalogoProductoInput): Servicio {
  return createCatalogProduct("vajilla-cristaleria", [
    "Linea premium restaurante — la misma que usan salones de primer nivel",
    "Se puede combinar con otros productos de vajilla y servicio",
    "Cotizacion rapida segun cantidad y fecha por WhatsApp",
  ], input);
}

function createManteleriaProducto(input: CatalogoProductoInput): Servicio {
  return createCatalogProduct("manteleria", [
    "Tela de calidad profesional, lavada y planchada lista para evento",
    "Se puede combinar con vajilla, sillas y armado de mesa completo",
    "Cotizacion rapida segun cantidad y fecha por WhatsApp",
  ], input);
}

const PRODUCTOS_CATALOGO: Servicio[] = [
  createVajillaProducto({
    id: "copa-agua",
    nombre: "Copa de Agua Premium",
    descripcion:
      "Copa de agua linea restaurante con cristal transparente y terminacion profesional. La base de una mesa bien armada.",
    icono: "💧",
    destacado: true,
    badge: "Mas elegida",
    idealPara: ["Casamientos", "Cenas formales", "Eventos corporativos"],
    detalles: [
      "Cristal profesional con terminacion de restaurante",
      "Combina perfecto con copas de vino y champagne",
      "La pieza mas pedida de nuestro catalogo",
    ],
    instagramCaption:
      "Cristaleria premium para mesas que se notan. Armados completos para eventos en Zona Norte.",
  }),
  createVajillaProducto({
    id: "copa-vino",
    nombre: "Copa de Vino Premium",
    descripcion:
      "Copa de vino de cristal profesional. Realza el servicio de mesa y le da a tu evento el nivel de un restaurante de primer nivel.",
    icono: "🍷",
    destacado: true,
    badge: "Popular",
    idealPara: ["Cena con vino", "Brindis", "Mesa principal"],
    detalles: [
      "Linea premium restaurante, cristal transparente",
      "Ideal para servicio de vino en mesas principales",
      "Eleva la presentacion de cualquier cena o celebracion",
    ],
    instagramCaption:
      "Copas de vino premium para cenas y celebraciones con la calidad que tu evento merece.",
  }),
  createVajillaProducto({
    id: "copa-champagne",
    nombre: "Copa de Champagne",
    descripcion:
      "Copa de champagne para brindis memorables. Cristal profesional que hace que el momento se vea y se sienta especial.",
    icono: "🥂",
    idealPara: ["Brindis", "Recepcion", "Casamientos"],
    detalles: [
      "Cristal transparente linea restaurante",
      "Imprescindible para el brindis del evento",
      "Combina con toda la linea de cristaleria premium",
    ],
    instagramCaption:
      "Copa de champagne para brindis que se recuerdan. Cristaleria profesional para eventos.",
  }),
  createVajillaProducto({
    id: "copa-helado",
    nombre: "Copa de Helado",
    descripcion:
      "Copa de helado en cristal para postres, mesas dulces y estaciones de servicio que sorprenden.",
    icono: "🍨",
    idealPara: ["Mesa dulce", "Postre", "Celebraciones"],
    detalles: [
      "Perfecta para helado, mousse, frutas o postres individuales",
      "Suma elegancia a cualquier mesa dulce o estacion",
      "Cristal profesional linea restaurante",
    ],
    instagramCaption:
      "Copas para postres con presentacion de restaurante. Mesas dulces que impresionan.",
  }),
  createVajillaProducto({
    id: "plato-llano-24cm",
    nombre: "Plato Llano Porcelana Premium 24 cm",
    descripcion:
      "Plato principal de porcelana blanca profesional. El plato que usan los mejores restaurantes, ahora en tu evento.",
    icono: "🍽️",
    destacado: true,
    badge: "Imprescindible",
    idealPara: ["Almuerzo", "Cena", "Servicio completo"],
    detalles: [
      "Porcelana blanca profesional de 24 cm",
      "La misma linea que usan restaurantes de primer nivel",
      "Base del armado de vajilla para cualquier evento formal",
    ],
    instagramCaption:
      "Porcelana blanca premium para mesas que hablan solas. Vajilla de restaurante para tu evento.",
  }),
  createVajillaProducto({
    id: "plato-postre-18cm",
    nombre: "Plato Postre Porcelana Premium 18 cm",
    descripcion:
      "Plato de postre en porcelana blanca profesional. El detalle que completa una mesa de primer nivel.",
    icono: "🍽️",
    destacado: true,
    idealPara: ["Postre", "Entrada", "Mesa completa"],
    detalles: [
      "Porcelana blanca profesional de 18 cm",
      "Para postre, pan o entrada con presentacion impecable",
      "Completa el armado de vajilla premium",
    ],
    instagramCaption:
      "Platos de postre en porcelana profesional para completar mesas de primer nivel.",
  }),
  createVajillaProducto({
    id: "tenedor",
    nombre: "Tenedor Premium Restaurante",
    descripcion:
      "Tenedor de linea premium restaurante. Peso, brillo y terminacion que tus invitados van a notar.",
    icono: "🍴",
    idealPara: ["Servicio de mesa", "Cena", "Eventos formales"],
    detalles: [
      "Acero inoxidable linea premium restaurante",
      "Peso y terminacion profesional que se siente en la mano",
      "Combina con toda la linea de cubiertos",
    ],
    instagramCaption:
      "Cubiertos premium para mesas que se notan. Linea restaurante para eventos.",
  }),
  createVajillaProducto({
    id: "cuchillo",
    nombre: "Cuchillo Premium Restaurante",
    descripcion:
      "Cuchillo de linea premium restaurante. El filo y la presentacion que un evento formal necesita.",
    icono: "🍴",
    idealPara: ["Servicio de mesa", "Cena", "Eventos formales"],
    detalles: [
      "Acero inoxidable linea premium restaurante",
      "Filo profesional y terminacion impecable",
      "Completa el juego de cubiertos premium",
    ],
    instagramCaption:
      "Cuchillos de linea restaurante para un servicio de mesa profesional.",
  }),
  createVajillaProducto({
    id: "cuchara-postre",
    nombre: "Cuchara de Postre Premium",
    descripcion:
      "Cuchara de postre linea restaurante. El toque final para un servicio de mesa impecable.",
    icono: "🥄",
    idealPara: ["Postre", "Cafe", "Mesa completa"],
    detalles: [
      "Acero inoxidable linea premium restaurante",
      "Ideal para postre, cafe y servicio complementario",
      "El detalle que cierra un armado de mesa profesional",
    ],
    instagramCaption:
      "Cucharas de postre premium para cerrar el servicio con el mismo nivel que empezo.",
  }),
  createVajillaProducto({
    id: "panera-mimbre",
    nombre: "Panera de Mimbre",
    descripcion:
      "Panera de mimbre artesanal para sumar calidez y estilo a la mesa. Un detalle simple que marca diferencia.",
    icono: "🍞",
    idealPara: ["Mesa principal", "Buffet", "Recepcion"],
    detalles: [
      "Mimbre natural con terminacion artesanal",
      "Ideal para panes, grisines o acompanamientos",
      "Suma calidez y personalidad a cualquier mesa",
    ],
    instagramCaption:
      "Paneras de mimbre para mesas con personalidad. Detalles que hacen la diferencia.",
    minimoUnidades: 1,
  }),
  createVajillaProducto({
    id: "ensaladera-acero",
    nombre: "Ensaladera de Acero Profesional",
    descripcion:
      "Ensaladera de acero inoxidable profesional para buffet y servicio. Presentacion limpia y funcional.",
    icono: "🥗",
    idealPara: ["Buffet", "Mesa compartida", "Servicio"],
    detalles: [
      "Acero inoxidable profesional de alto brillo",
      "Perfecta para ensaladas, acompanamientos y servicio frio",
      "Presentacion de nivel para buffet y mesas compartidas",
    ],
    instagramCaption:
      "Piezas de servicio profesional para buffet con presentacion impecable.",
    minimoUnidades: 1,
  }),
  createVajillaProducto({
    id: "plato-sitio",
    nombre: "Plato de Sitio Decorativo",
    descripcion:
      "Plato de sitio que transforma la mesa. El elemento que diferencia una mesa comun de una mesa de evento premium.",
    icono: "✨",
    idealPara: ["Casamientos", "Gala", "Eventos de lujo"],
    detalles: [
      "Base decorativa que eleva toda la presentacion de la mesa",
      "Impacto visual inmediato para tus invitados",
      "El upgrade que mas se nota en fotos del evento",
    ],
    instagramCaption:
      "Platos de sitio para mesas que impactan. El detalle premium que se ve en cada foto.",
  }),
  createManteleriaProducto({
    id: "mantel-redondo",
    nombre: "Mantel Redondo 3 m",
    descripcion:
      "Mantel redondo de 3 metros en blanco o negro. Tela profesional que viste la mesa y transforma el salon.",
    icono: "🪄",
    destacado: true,
    badge: "Mas pedido",
    idealPara: ["Casamientos", "Mesas redondas", "Eventos formales"],
    detalles: [
      "Disponible en blanco y negro",
      "Tela profesional con caida impecable",
      "Transforma cualquier mesa en una mesa de evento premium",
    ],
    instagramCaption:
      "Manteles que transforman el salon. Tela profesional en blanco y negro para eventos.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "camino-mesa",
    nombre: "Camino de Colores",
    descripcion:
      "Camino de mesa en distintos colores para sumar personalidad, contraste y ese toque que hace unica tu ambientacion.",
    icono: "✨",
    idealPara: ["Decoracion", "Mesa principal", "Recepcion"],
    detalles: [
      "Variedad de colores para combinar con tu ambientacion",
      "Acompana platos de sitio, centros y vajilla premium",
      "El toque de color que personaliza tu evento",
    ],
    instagramCaption:
      "Caminos de colores para darle personalidad y estilo propio a tu evento.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "servilleta-tela",
    nombre: "Servilletas de Tela",
    descripcion:
      "Servilletas de tela en blanco y negro. El detalle que separa una mesa improvisada de una mesa profesional.",
    icono: "🧺",
    idealPara: ["Cena formal", "Servicio de mesa", "Eventos premium"],
    detalles: [
      "Tela profesional, lavadas y planchadas listas para tu evento",
      "En blanco y negro para combinar con cualquier ambientacion",
      "El detalle que tus invitados notan sin que se lo digas",
    ],
    instagramCaption:
      "Servilletas de tela que completan la mesa. El detalle que marca la diferencia.",
  }),
  createManteleriaProducto({
    id: "cubre-sillas-poncho",
    nombre: "Cubre Sillas Tipo Poncho",
    descripcion:
      "Cubre sillas en blanco o negro que unifican el salon y le dan una imagen profesional a todo el espacio.",
    icono: "🪑",
    idealPara: ["Salon completo", "Casamientos", "Eventos formales"],
    detalles: [
      "En blanco y negro para unificar el look del salon",
      "Transforma sillas comunes en sillas de evento",
      "El cambio mas visible con menor esfuerzo",
    ],
    instagramCaption:
      "Cubre sillas que transforman el salon. Imagen profesional con un solo detalle.",
    minimoUnidades: 1,
  }),
  createManteleriaProducto({
    id: "lazo-colores",
    nombre: "Lazos de Colores",
    descripcion:
      "Lazos decorativos en distintos colores para sillas y detalles textiles. El toque final del armado.",
    icono: "🎀",
    idealPara: ["Sillas", "Decoracion", "Ambientacion"],
    detalles: [
      "Variedad de colores para combinar con tu paleta",
      "Complemento ideal para cubre sillas y manteleria",
      "Un detalle economico con alto impacto visual",
    ],
    instagramCaption:
      "Lazos de colores para un armado coordinado y profesional.",
    minimoUnidades: 1,
  }),
];

export const SERVICIOS: Servicio[] = [
  ...PRODUCTOS_CATALOGO,
  {
    id: "barra-movil",
    categoriaId: "barra-bebidas",
    nombre: "Barra Movil Luminosa con Bartender",
    descripcion:
      "El centro de atencion de tu fiesta. Barra movil luminosa con bartender profesional, cristaleria completa para tragos, shots y frascos personalizados. Con o sin bebidas.",
    precioUnitario: 0,
    unidad: "por servicio",
    minimoUnidades: 1,
    permiteMultiples: false,
    imagen: "/images/productos/barra-movil.png",
    imagePosition: "center 56%",
    icono: "🍸",
    destacado: true,
    disponible: true,
    badge: "Estrella de la fiesta",
    idealPara: ["Cumpleanos", "Recepcion", "Fiesta privada"],
    incluye: [
      "Barra movil luminosa que se convierte en el centro de atencion",
      "Bartender profesional para atencion y show durante todo el evento",
      "Cristaleria completa: copas, vasos largos y cortos, shots, vasos de whisky y frascos personalizados",
    ],
    instagramCaption:
      "La barra que convierte tu fiesta en un evento. Bartender profesional, luces y cristaleria completa.",
    detalles: [
      "Servicio completo: no se alquila solo el mueble",
      "Opcion con bebidas o sin bebidas segun tu formato",
      "Consultar promociones vigentes y packs con otros servicios",
    ],
  },
  {
    id: "servicio-mozo",
    categoriaId: "personal-servicio",
    nombre: "Servicio de Mozo Profesional",
    descripcion:
      "Vos disfrutas, tus invitados son atendidos. Mozos profesionales para recepcion, servicio de mesa y apoyo durante todo el evento.",
    precioUnitario: 0,
    unidad: "por mozo",
    minimoUnidades: 1,
    permiteMultiples: true,
    imagen: "/images/productos/servicio-mozo.png",
    imagePosition: "center 42%",
    icono: "🤵",
    destacado: true,
    disponible: true,
    badge: "Recomendado",
    idealPara: ["Recepcion", "Servicio de mesa", "Eventos formales"],
    incluye: [
      "Mozo profesional con experiencia en eventos sociales y corporativos",
      "Servicio de recepcion, mesa o apoyo general segun tu formato",
      "Se combina con vajilla, manteleria y barra para un servicio integral",
    ],
    instagramCaption:
      "Servicio de mozo profesional para que vos disfrutes mientras tus invitados son bien atendidos.",
    detalles: [
      "Personal con experiencia en casamientos, corporativos y celebraciones",
      "Se adapta al formato: recepcion, mesa servida o apoyo de salon",
      "Consultar packs con vajilla y manteleria para servicio integral",
    ],
  },
  {
    id: "fuente-chocolate",
    categoriaId: "fuentes",
    nombre: "Cascada de Chocolate de 8 Pisos",
    descripcion:
      "El momento que todos esperan. 8 pisos de chocolate fundido con frutas frescas de estacion. Rinde para unas 100 personas y genera las mejores fotos del evento.",
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
    badge: "Impacto garantizado",
    idealPara: ["Cumpleanos", "Casamientos", "~100 personas"],
    incluye: [
      "Cascada de 8 pisos que se convierte en protagonista del evento",
      "5 kg de chocolate premium + 10 kg de frutas frescas de estacion",
      "Rinde para aprox. 100 personas — el momento donde se juntan todos",
    ],
    instagramCaption:
      "8 pisos de chocolate y frutas frescas. El momento mas fotografiado de cualquier evento.",
    detalles: [
      "Servicio protagonista para recepciones, cumpleanos y casamientos",
      "5 kg de chocolate + 10 kg de frutas frescas listas para compartir",
      "El servicio que genera las mejores fotos y videos del evento",
      "Coordinacion de horario y armado incluida",
    ],
  },
  {
    id: "robot-led",
    categoriaId: "animacion",
    nombre: "Robot LED / Personaje Animado",
    descripcion:
      "El momento WOW. Entrada con impacto, fotos que se viralizan y una energia que transforma el clima de la fiesta. Lo que tus invitados no esperan y no olvidan.",
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
    badge: "Momento WOW",
    idealPara: ["Entrada", "Fiesta nocturna", "Fotos virales"],
    incluye: [
      "Aparicion de alto impacto que cambia la energia de la fiesta",
      "Ideal para entrada del homenajeado o momento sorpresa",
      "Animacion y presencia visual perfecta para fotos y video",
    ],
    instagramCaption:
      "El momento que nadie espera y todos recuerdan. Robot LED para fiestas que dejan marca.",
    detalles: [
      "Ideal para cumpleanos, fiestas privadas y eventos nocturnos",
      "Genera las fotos y videos mas compartidos del evento",
      "Formato adaptable segun horario, espacio y tipo de fiesta",
    ],
  },
];

// --- PACKS SUGERIDOS ---
export const PACKS_SUGERIDOS = [
  {
    id: "pack-mesa-completa",
    nombre: "Pack Mesa Completa",
    descripcion: "Todo lo que necesitas para que cada mesa se vea de restaurante premium.",
    incluye: ["Platos llanos + postre", "Copas de agua y vino", "Cubiertos premium", "Servilletas de tela"],
    idealPara: "Casamientos y cenas formales",
    icono: "🍽️",
  },
  {
    id: "pack-recepcion",
    nombre: "Pack Recepcion VIP",
    descripcion: "Recepcion con servicio profesional de principio a fin.",
    incluye: ["Vajilla premium completa", "Manteleria", "Servicio de mozo", "Cristaleria"],
    idealPara: "Eventos corporativos y celebraciones",
    icono: "🤵",
  },
  {
    id: "pack-fiesta-total",
    nombre: "Pack Fiesta Total",
    descripcion: "La fiesta completa con los momentos que todos recuerdan.",
    incluye: ["Barra movil con bartender", "Cascada de chocolate", "Robot LED", "Cristaleria completa"],
    idealPara: "Cumpleanos y fiestas privadas",
    icono: "🎉",
  },
];

// --- PREGUNTAS FRECUENTES ---
export type FAQ = {
  pregunta: string;
  respuesta: string;
};

export const FAQS: FAQ[] = [
  {
    pregunta: "¿Que calidad tiene la vajilla y los cubiertos?",
    respuesta:
      "Toda nuestra vajilla, cristaleria y cubiertos son linea premium restaurante. Es la misma calidad que usan los mejores salones y restaurantes de Zona Norte. Tu evento se ve y se siente profesional.",
  },
  {
    pregunta: "¿Que tienen disponible hoy?",
    respuesta:
      "Vajilla premium de porcelana, cristaleria profesional, cubiertos de restaurante, barra movil luminosa con bartender, servicio de mozo, manteleria completa, cascada de chocolate de 8 pisos y robot LED. Solo mostramos lo que realmente tenemos disponible.",
  },
  {
    pregunta: "¿Con cuanta anticipacion tengo que reservar?",
    respuesta: `Recomendamos al menos ${CONFIG.diasAntelacionMinima} dias de anticipacion. Pero cuanto antes escribas, mejor — las fechas mas populares se reservan rapido.`,
  },
  {
    pregunta: "¿Trabajan en toda Zona Norte?",
    respuesta: `Si. Cubrimos ${EMPRESA.zonasCobertura.join(", ")} y alrededores. El traslado esta incluido en la cotizacion.`,
  },
  {
    pregunta: "¿La barra se alquila por partes o es un servicio completo?",
    respuesta:
      "La barra es un servicio completo: barra movil luminosa + bartender profesional + cristaleria para tragos, shots y frascos. Se puede contratar con o sin bebidas. No se alquila solo el mueble.",
  },
  {
    pregunta: "¿Puedo armar un pack combinando servicios?",
    respuesta:
      "Si, y es lo que mas recomendamos. Los eventos que combinan vajilla + manteleria + servicio quedan mucho mejor. Escribinos con lo que tenes en mente y te armamos una propuesta con precio cerrado.",
  },
  {
    pregunta: "¿Como se cotiza? ¿Tiene costo pedir presupuesto?",
    respuesta:
      "Cotizar es gratis y rapido. Nos escribis por WhatsApp con fecha, tipo de evento y lo que te interesa, y te respondemos con disponibilidad y precio en minutos. Sin compromiso.",
  },
  {
    pregunta: "¿Los precios estan publicados?",
    respuesta:
      "Mostramos valores base en cascada de chocolate y robot LED. Para vajilla, manteleria, barra y mozos preferimos cotizar segun tu evento porque el precio depende de cantidad, formato y fecha. Pero cotizar es gratis y respondemos rapido.",
  },
  {
    pregunta: "¿Puedo contratar solo una parte del catalogo?",
    respuesta:
      "Si. Podes contratar solo vajilla, solo barra, solo mozo, solo manteleria, solo la cascada o solo el robot. O combinar lo que necesites. Vos armas tu evento como quieras.",
  },
  {
    pregunta: "¿Que incluye la cascada de chocolate?",
    respuesta:
      "Cascada de 8 pisos + 5 kg de chocolate premium + 10 kg de frutas frescas de estacion. Rinde para unas 100 personas. Es el servicio que mas fotos genera en cualquier evento.",
  },
  {
    pregunta: "¿Como funciona la reserva?",
    respuesta:
      "Nos escribis, te confirmamos disponibilidad y precio, y si te cierra reservas con una sena del 30% para dejar la fecha tomada. Todo por WhatsApp, sin vueltas.",
  },
  {
    pregunta: "¿Que medios de pago aceptan?",
    respuesta: `Aceptamos ${CONFIG.mediosPago.join(", ")}. La sena es del ${CONFIG.porcentajeSena}% para confirmar la fecha y el resto se coordina antes del evento.`,
  },
];

// --- TIPOS DE EVENTO ---
export const FEATURED_IDS = [
  "copa-agua",
  "plato-llano-24cm",
  "barra-movil",
  "copa-vino",
  "mantel-redondo",
  "servicio-mozo",
  "plato-postre-18cm",
  "fuente-chocolate",
  "robot-led",
];

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
