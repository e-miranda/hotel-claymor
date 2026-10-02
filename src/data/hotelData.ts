import { Room, HotelService, GalleryPhoto, SocialAccount, SocialPost, Reservation } from '../types/hotel';

export const HOTEL_IMAGES = {
  heroFacade: '/src/assets/images/hotel_claymor_facade_1790478222130.jpg',
  parqueUnionView: '/src/assets/images/vista_parque_union_1790478234988.jpg',
  carnavalOruro: '/src/assets/images/carnaval_de_oruro_1790478210073.jpg',
  suiteClaymor: '/src/assets/images/suite_claymor_interior_1790478245414.jpg',
  habitacionDoble: '/src/assets/images/habitacion_doble_claymor_1790478255945.jpg',
  habitacionSimple: '/src/assets/images/habitacion_simple_claymor_1790478266774.jpg',
  desayunoBuffet: '/src/assets/images/desayuno_buffet_claymor_1790478277615.jpg',
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'master-suite-claymor',
    name: 'Master Suite Claymor',
    subtitle: 'Vista panorámica frontal directa al Parque de la Unión Nacional',
    category: 'suite',
    pricePerNight: 110,
    capacity: 2,
    size: '56 m²',
    bed: 'King Size de Lujo con Plumón Térmico',
    view: 'Parque de la Unión Nacional & Horizonte de Oruro',
    image: HOTEL_IMAGES.suiteClaymor,
    description: 'Nuestra suite principal ofrece los mejores ventanales hacia las arboledas del Parque de la Unión Nacional. Cuenta con sala de estar independiente, cama King Size, calefacción central regulable, aislamiento acústico y baño de mármol con tina de hidromasaje.',
    features: [
      'Vistas directas al histórico Parque de la Unión Nacional',
      'Desayuno buffet gourmet andino & continental incluido',
      'Calefacción centralizada para el clima andino de Oruro',
      'Tina de hidromasaje y juego de batas térmicas',
      'Smart TV 65" 4K y cafetera de cortesía en suite',
      'Parqueo privado vigilado las 24 horas sin costo adicional'
    ],
    popular: true,
  },
  {
    id: 'suite-junior-ejecutiva',
    name: 'Suite Junior Ejecutiva',
    subtitle: 'Confort premium con sala de descanso y balcón hacia el Parque',
    category: 'suite',
    pricePerNight: 85,
    capacity: 2,
    size: '42 m²',
    bed: 'Queen Size Ortopédica con Aislamiento Térmico',
    view: 'Parque de la Unión Nacional',
    image: HOTEL_IMAGES.suiteClaymor,
    description: 'Espacio cálido y luminoso con diseño contemporáneo en tonos esmeralda, marfil y madera natural. Diseñada para ejecutivos y parejas que buscan descanso absoluto durante su visita a Oruro o en fechas festivas del Carnaval.',
    features: [
      'Balcón privado con vista al Parque de la Unión Nacional',
      'Escritorio ejecutivo con tomas eléctricas internacionales',
      'Calefacción digital regulable por termostato',
      'Baño privado con ducha de hidromasaje y agua caliente 24/7',
      'Frigo bar y caja de seguridad digital'
    ],
    popular: false,
  },
  {
    id: 'habitacion-doble-superior',
    name: 'Habitación Doble Superior',
    subtitle: 'Configuración de 2 camas Twin o 1 Matrimonial con máxima calidez',
    category: 'doble',
    pricePerNight: 65,
    capacity: 2,
    size: '34 m²',
    bed: '2 Camas Twin o 1 Cama Matrimonial Confort',
    view: 'Parque de la Unión Nacional y Ciudad',
    image: HOTEL_IMAGES.habitacionDoble,
    description: 'La opción predilecta para parejas, familiares o amigos que viajan juntos para el Carnaval de Oruro o por turismo. Cuenta con ropa de cama térmica hipoalergénica, ventanas con doble cristal acústico y baño privado.',
    features: [
      'Disponible con 2 camas confortables o cama matrimonial',
      'Sistema de calefacción eficiente y frazadas térmicas',
      'Desayuno buffet incluido con salteñas y café caliente',
      'Conexión WiFi 6 de alta fidelidad para videollamadas',
      'Parqueo privado techado y seguro'
    ],
    popular: true,
  },
  {
    id: 'habitacion-simple-ejecutiva',
    name: 'Habitación Simple Ejecutiva',
    subtitle: 'Tranquilidad, calidez y óptima conectividad para el viajero individual',
    category: 'simple',
    pricePerNight: 45,
    capacity: 1,
    size: '26 m²',
    bed: 'Cama Plaza y Media (Full Size)',
    view: 'Patio Interior y Vista al Parque',
    image: HOTEL_IMAGES.habitacionSimple,
    description: 'Pensada especialmente para profesionales, comerciantes y viajeros individuales que buscan un descanso reparador en Oruro. Ambiente silencioso con excelente escritorio de trabajo, agua caliente continua y calefacción.',
    features: [
      'Cama de plaza y media con colchón ergonómico de alta densidad',
      'Escritorio de trabajo con lámpara LED y silla ergonómica',
      'Calefacción central y ducha de agua caliente permanente',
      'Desayuno buffet andino completo incluido',
      'Check-in prioritario y custodia de equipaje'
    ],
    popular: false,
  }
];

export const HOTEL_SERVICES: HotelService[] = [
  {
    id: 'srv-breakfast',
    title: 'Desayuno Buffet Andino & Continental',
    subtitle: 'Tradicionales salteñas orureñas, api con pastel, café de los Yungas y frutas',
    description: 'Cada mañana preparamos un buffet completo: salteñas recién horneadas, variedad de panes artesanales, quesos andinos, huevos al gusto, frutas frescas, jugos naturales y aromático café boliviano de altura.',
    iconName: 'Coffee',
    hours: '06:30 AM - 10:30 AM',
    highlight: 'Incluido en todas las habitaciones',
    image: HOTEL_IMAGES.desayunoBuffet,
    included: true,
  },
  {
    id: 'srv-parking',
    title: 'Parqueo Privado Techado Vigilado 24/7',
    subtitle: 'Máxima seguridad para su vehículo con cámaras de vigilancia y portón eléctrico',
    description: 'Estacionamiento cubierto dentro del mismo edificio del hotel en Oruro. Personal de seguridad permanente las 24 horas y acceso directo por ascensor a los pisos de habitaciones.',
    iconName: 'ShieldCheck',
    hours: '24 Horas / Día',
    highlight: 'Gratuito para huéspedes',
    included: true,
  },
  {
    id: 'srv-wifi',
    title: 'WiFi 6 Fibra Óptica Dedicada (1 Gbps)',
    subtitle: 'Internet de ultra alta velocidad sin cortes en suites y áreas comunes',
    description: 'Red mallada de fibra óptica de última generación, ideal para transmitir en vivo el Carnaval de Oruro, realizar videollamadas de trabajo o disfrutar de streaming en alta definición.',
    iconName: 'Wifi',
    hours: 'Cobertura 100% en todo el hotel',
    highlight: 'Fibra Óptica Dedicada',
    included: true,
  },
  {
    id: 'srv-parque-view',
    title: 'Ubicación Frente al Parque de la Unión Nacional',
    subtitle: 'A pocos pasos del centro histórico y del circuito del Carnaval de Oruro',
    description: 'Ubicación privilegiada en una de las zonas más bellas y seguras de Oruro. Hermosas áreas verdes arboladas al cruzar la calle, cerca de los principales puntos comerciales y turísticos.',
    iconName: 'Sparkles',
    hours: 'Acceso Peatonal & Turístico Inmediato',
    highlight: 'Entorno verde y seguro',
    image: HOTEL_IMAGES.parqueUnionView,
    included: true,
  },
  {
    id: 'srv-calefaccion',
    title: 'Calefacción Centralizada & Doble Vidrio',
    subtitle: 'Calidez asegurada ante el clima altiplánico de Oruro (3,735 msnm)',
    description: 'Disfrute de un ambiente cálido y confortable en cualquier época del año. Todas nuestras suites, habitaciones y pasillos cuentan con calefacción y ventanales herméticos que aíslan el frío y el ruido exterior.',
    iconName: 'Waves',
    hours: 'Funcionamiento Continuo',
    highlight: 'Confort térmico total',
    included: true,
  },
  {
    id: 'srv-carnaval-concierge',
    title: 'Concierge Turístico & Asistencia Carnaval de Oruro',
    subtitle: 'Asesoría en graderías, visitas al Santuario del Socavón y traslados',
    description: 'Nuestro equipo le brinda asesoramiento para adquirir boletos en las mejores graderías del Carnaval de Oruro, recomendaciones gastronómicas, tours a las aguas termales de Obrajes y traslados privados.',
    iconName: 'BellRing',
    hours: 'Atención 24/7',
    highlight: 'Guía oficial del Carnaval',
    image: HOTEL_IMAGES.carnavalOruro,
    included: true,
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Carnaval de Oruro - Majestuosa Diablada',
    category: 'carnaval',
    image: HOTEL_IMAGES.carnavalOruro,
    caption: 'La danza de la Diablada con sus brillantes trajes, bordados de plata y máscaras tradicionales en Oruro (UNESCO).',
    location: 'Ruta Folklórica del Carnaval de Oruro'
  },
  {
    id: 'gal-2',
    title: 'Fachada Hotel Claymor & Parque de la Unión',
    category: 'vistas',
    image: HOTEL_IMAGES.heroFacade,
    caption: 'Moderna arquitectura con detalles en marfil y esmeralda, justo frente al Parque de la Unión Nacional.',
    location: 'Calle Aroma entre Av. 6 de Octubre y Av. La Paz, Oruro'
  },
  {
    id: 'gal-3',
    title: 'Vista Panorámica del Parque de la Unión Nacional',
    category: 'vistas',
    image: HOTEL_IMAGES.parqueUnionView,
    caption: 'Áreas verdes, pinos y monumentos del Parque de la Unión vistos desde nuestra terraza mirador.',
    location: 'Mirador Terraza Claymor'
  },
  {
    id: 'gal-4',
    title: 'Master Suite Claymor con Vista al Parque',
    category: 'suites',
    image: HOTEL_IMAGES.suiteClaymor,
    caption: 'Luminosidad, cama King Size con plumón térmico y ventanales panorámicos orientados al parque.',
    location: 'Piso 4 - Suite Presidencial'
  },
  {
    id: 'gal-5',
    title: 'Habitación Doble Superior Confort',
    category: 'dobles',
    image: HOTEL_IMAGES.habitacionDoble,
    caption: 'Espacio cálido y moderno con dos camas confortables, calefacción y aislamiento acústico.',
    location: 'Piso 3 - Habitaciones Dobles'
  },
  {
    id: 'gal-6',
    title: 'Desayuno Buffet con Tradicionales Salteñas',
    category: 'gastronomia',
    image: HOTEL_IMAGES.desayunoBuffet,
    caption: 'Salteñas jugosas recién horneadas, café aromático de altura, jugos naturales y panadería artesanal.',
    location: 'Comedor Gourmet Claymor'
  }
];

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'ig-1',
    platform: 'instagram',
    handle: '@HotelClaymorOruro',
    displayName: 'Hotel Claymor - Oruro Bolivia',
    followers: 28450,
    engagementRate: '6.4%',
    status: 'connected',
    avatar: HOTEL_IMAGES.heroFacade,
  },
  {
    id: 'tk-1',
    platform: 'tiktok',
    handle: '@claymor.hotel.oruro',
    displayName: 'Hotel Claymor Oruro',
    followers: 54100,
    engagementRate: '11.2%',
    status: 'connected',
    avatar: HOTEL_IMAGES.carnavalOruro,
  },
  {
    id: 'fb-1',
    platform: 'facebook',
    handle: '/HotelClaymorOruroOficial',
    displayName: 'Hotel Claymor - Parque de la Unión Nacional',
    followers: 39800,
    engagementRate: '4.8%',
    status: 'connected',
    avatar: HOTEL_IMAGES.parqueUnionView,
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    platforms: ['instagram', 'facebook', 'tiktok'],
    caption: '¡Se acerca la fiesta más grande de Bolivia! 🇧🇴🎭 Disfruta del Carnaval de Oruro hospedándote en Hotel Claymor, frente al Parque de la Unión Nacional. Reserva con tiempo tu Suite o Habitación Doble pagando con QR Simple.',
    hashtags: ['#HotelClaymor', '#CarnavalDeOruro', '#OruroBolivia', '#DiabladaOruro', '#ParqueDeLaUnion', '#TurismoBolivia'],
    imageUrl: HOTEL_IMAGES.carnavalOruro,
    mediaType: 'image',
    status: 'published',
    publishedAt: 'Hace 2 horas',
    likes: 2140,
    commentsCount: 96,
    shares: 112,
    comments: [
      {
        id: 'c-1',
        author: 'carlos_travel_bolivia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: '¿Tienen habitaciones dobles con vista al Parque de la Unión para las fechas del Carnaval de Oruro?',
        timeAgo: 'Hace 1 hora',
        platform: 'instagram',
        replied: true,
        replyText: '¡Hola Carlos! Sí, aún contamos con habitaciones dobles disponibles. Puedes cotizar y pagar directo por QR Simple desde nuestra web.'
      },
      {
        id: 'c-2',
        author: 'mariela_oruro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Excelente ubicación frente al parque y el desayuno con salteñas es riquísimo.',
        timeAgo: 'Hace 30 min',
        platform: 'facebook',
        replied: true,
        replyText: '¡Muchas gracias Mariela! Será un placer darte la bienvenida nuevamente en Claymor.'
      }
    ]
  },
  {
    id: 'post-2',
    platforms: ['tiktok', 'instagram'],
    caption: 'POV: Abres tu ventana en la Master Suite de Hotel Claymor y esta es tu vista al Parque de la Unión Nacional en Oruro 🌳☀️ ¡Calidez andina, silencio y confort!',
    hashtags: ['#HotelClaymor', '#Oruro', '#ParqueDeLaUnion', '#HotelBolivia', '#TravelTikTok'],
    imageUrl: HOTEL_IMAGES.parqueUnionView,
    mediaType: 'video',
    status: 'published',
    publishedAt: 'Ayer',
    likes: 4890,
    commentsCount: 184,
    shares: 320,
    videoDuration: '0:22',
    comments: [
      {
        id: 'c-3',
        author: 'fernando.quiroga',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'La vista al parque está hermosa, ¿el parqueo está incluido para camionetas?',
        timeAgo: 'Ayer',
        platform: 'tiktok',
        replied: true,
        replyText: '¡Hola Fernando! Sí, nuestro parqueo techado tiene altura para camionetas y vigilancia privada las 24 horas sin costo extra.'
      }
    ]
  },
  {
    id: 'post-3',
    platforms: ['facebook', 'instagram'],
    caption: 'Despierta con la energía de Oruro: Salteñas doradas recién salidas del horno, frutas frescas y café caliente en nuestro desayuno buffet incluido. 🥐☕',
    hashtags: ['#DesayunoClaymor', '#SalteñasOruro', '#HotelClaymor', '#GastronomiaBoliviana'],
    imageUrl: HOTEL_IMAGES.desayunoBuffet,
    mediaType: 'image',
    status: 'published',
    publishedAt: 'Hace 2 días',
    likes: 1250,
    commentsCount: 42,
    shares: 28,
    comments: []
  },
  {
    id: 'post-4',
    platforms: ['facebook'],
    caption: 'Promoción especial para estadías corporativas y familias durante esta temporada. Reserva tu Habitación Simple o Doble con confirmación inmediata.',
    hashtags: ['#HotelClaymorOruro', '#PromocionOruro', '#ViajesBolivia'],
    imageUrl: HOTEL_IMAGES.heroFacade,
    mediaType: 'image',
    status: 'scheduled',
    scheduledDate: '29 Sep 2026, 09:00',
    likes: 0,
    commentsCount: 0,
    shares: 0,
    comments: []
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    code: 'CLM-74820',
    roomId: 'master-suite-claymor',
    roomName: 'Master Suite Claymor',
    checkIn: '2026-10-15',
    checkOut: '2026-10-18',
    nights: 3,
    guests: 2,
    guestName: 'Mauricio Siles Rocha',
    guestEmail: 'mauricio.siles@bolivia-travel.com',
    guestPhone: '+591 71234567',
    guestDoc: 'CI-5489201 Oruro',
    specialRequests: 'Piso 4 con vista despejada al Parque de la Unión Nacional.',
    addons: {
      spaPackage: false,
      airportTransfer: true,
      premiumBreakfast: true
    },
    totalAmount: 385,
    currency: 'USD',
    paymentMethod: 'qr_banco',
    paymentStatus: 'paid',
    qrReferenceCode: 'QR-BCP-BOL-882910',
    createdAt: '2026-09-25T14:32:00Z'
  },
  {
    id: 'res-102',
    code: 'CLM-51029',
    roomId: 'habitacion-doble-superior',
    roomName: 'Habitación Doble Superior',
    checkIn: '2026-10-22',
    checkOut: '2026-10-25',
    nights: 3,
    guests: 2,
    guestName: 'Gabriela Torrico & Acompañante',
    guestEmail: 'gabriela.torrico@gmail.com',
    guestPhone: '+591 79876543',
    guestDoc: 'CI-4819203 La Paz',
    specialRequests: 'Dos camas separadas y llegada en la noche (parqueo techado).',
    addons: {
      spaPackage: false,
      airportTransfer: false,
      premiumBreakfast: false
    },
    totalAmount: 215,
    currency: 'USD',
    paymentMethod: 'qr_wallet',
    paymentStatus: 'paid',
    qrReferenceCode: 'QR-YAPE-BOL-391024',
    createdAt: '2026-09-26T16:10:00Z'
  }
];
