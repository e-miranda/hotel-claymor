import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  MapPin,
  Navigation,
  Phone,
  Globe,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Sparkles,
  Compass,
  Building2,
  CalendarCheck,
  QrCode,
  Maximize2,
  X,
} from 'lucide-react';

export const LocationAndQRCodesSection: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  // Official address requested by user
  const HOTEL_ADDRESS = 'Calle Aroma entre Av. 6 de Octubre y Av. La Paz, Oruro, Bolivia';
  const WHATSAPP_PHONE = '+591 71234567';
  const WHATSAPP_LINK =
    'https://wa.me/59171234567?text=Hola%20Hotel%20Claymor,%20deseo%20solicitar%20una%20reserva%20de%20habitaci%C3%B3n%20en%20Oruro.';
  const GOOGLE_MAPS_LINK =
    'https://www.google.com/maps/search/?api=1&query=Calle+Aroma+entre+Av.+6+de+Octubre+y+Av.+La+Paz,+Oruro,+Bolivia';
  const GOOGLE_MAPS_EMBED =
    'https://maps.google.com/maps?q=Calle%20Aroma%20entre%20Av.%206%20de%20Octubre%20y%20Av.%20La%20Paz,%20Oruro,%20Bolivia&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const [webUrl, setWebUrl] = useState('https://hotelclaymor.bo');
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href) {
      setWebUrl(window.location.href);
    }
  }, []);

  // QR state
  const [whatsappQr, setWhatsappQr] = useState<string>('');
  const [webQr, setWebQr] = useState<string>('');
  const [mapsQr, setMapsQr] = useState<string>('');

  // Copy feedback state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Modal zoom QR
  const [zoomedQr, setZoomedQr] = useState<{
    title: string;
    subtitle: string;
    dataUrl: string;
    payload: string;
    actionLabel: string;
    actionUrl: string;
  } | null>(null);

  useEffect(() => {
    // Generate WhatsApp QR
    QRCode.toDataURL(WHATSAPP_LINK, {
      width: 360,
      margin: 1.5,
      color: {
        dark: '#065F46', // Deep emerald
        light: '#FFFFFF',
      },
    })
      .then(setWhatsappQr)
      .catch(console.error);

    // Generate Web QR
    const targetWebUrl = typeof window !== 'undefined' ? window.location.href : 'https://hotelclaymor.bo';
    QRCode.toDataURL(targetWebUrl, {
      width: 360,
      margin: 1.5,
      color: {
        dark: '#0F766E', // Teal
        light: '#FFFFFF',
      },
    })
      .then(setWebQr)
      .catch(console.error);

    // Generate Google Maps QR
    QRCode.toDataURL(GOOGLE_MAPS_LINK, {
      width: 360,
      margin: 1.5,
      color: {
        dark: '#D97706', // Warm amber / orange
        light: '#FFFFFF',
      },
    })
      .then(setMapsQr)
      .catch(console.error);
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadQr = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="ubicacion-qr" className="py-16 sm:py-24 bg-[#F8F5F0] border-t border-emerald-900/10 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-teal-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-gradient-to-l from-amber-200/20 to-orange-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Ubicación Estratégica & Códigos QR Oficiales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Encuéntranos en Oruro y Conecta al Instante
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Visítanos frente al Parque de la Unión Nacional. Escanea nuestros códigos QR oficiales para comunicarte vía WhatsApp, navegar en Google Maps o acceder al portal web de reservas de <strong className="text-emerald-800 font-semibold">Hotel Claymor</strong>.
          </p>
        </div>

        {/* 1. Interactive Google Maps & Address Card Row */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Col: Address, landmarks, and Directions CTA */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dirección Oficial Google Maps</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-slate-900 leading-snug">
                  Hotel Claymor
                </h3>

                {/* Exact Address Highlight */}
                <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-amber-50/40 border border-emerald-200/80">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Ubicación Exacta:
                      </span>
                      <p className="font-semibold text-slate-900 text-sm sm:text-base mt-0.5">
                        {HOTEL_ADDRESS}
                      </p>
                      <span className="text-xs text-slate-500 block mt-1">
                        Frente al Parque de la Unión Nacional · Zona Central, Oruro - Bolivia
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Copiar dirección completa</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(HOTEL_ADDRESS, 'address')}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {copiedType === 'address' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>¡Copiada!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Proximity landmarks */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Puntos de Referencia Cercanos
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div>
                        <strong className="block text-slate-800">Parque de la Unión</strong>
                        <span className="text-slate-500 text-[11px]">Justo al frente (30 m)</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <div>
                        <strong className="block text-slate-800">Ruta del Carnaval</strong>
                        <span className="text-slate-500 text-[11px]">3 cuadras (4 min a pie)</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      <div>
                        <strong className="block text-slate-800">Santuario del Socavón</strong>
                        <span className="text-slate-500 text-[11px]">6 min en taxi</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <div>
                        <strong className="block text-slate-800">Terminal de Buses</strong>
                        <span className="text-slate-500 text-[11px]">8 min en vehículo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md shadow-emerald-700/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-700" />
                  <span>Solicitar Reserva</span>
                </button>
              </div>
            </div>

            {/* Right Col: Interactive Google Maps Embed */}
            <div className="lg:col-span-7 bg-slate-100 relative min-h-[360px] lg:min-h-[460px]">
              <iframe
                title="Ubicación de Hotel Claymor en Google Maps"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] lg:min-h-[480px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Overlay Badge */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                  C
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hotel Claymor</h4>
                  <p className="text-[11px] text-slate-500">Calle Aroma e/ Av. 6 de Octubre y Av. La Paz</p>
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  <span>Ver Mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Three Dedicated Quick Access QR Codes Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Códigos QR Interactivos</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Escanea con tu Teléfono Móvil
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Apunta la cámara de tu smartphone para comunicarte por WhatsApp, acceder a la web o activar el GPS hacia el hotel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: QR Teléfono WhatsApp */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200">
                    WhatsApp & Teléfono
                  </span>
                </div>

                <h4 className="font-serif font-bold text-lg text-slate-900">
                  QR Teléfono WhatsApp
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Escanea para enviar un mensaje directo a la recepción de Hotel Claymor para solicitar cotización y reservas inmediatas.
                </p>

                {/* QR Canvas Container */}
                <div className="my-5 p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-xl shadow-xs relative group">
                    {whatsappQr ? (
                      <img
                        src={whatsappQr}
                        alt="Código QR de WhatsApp Hotel Claymor"
                        className="w-44 h-44 object-contain"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        Generando QR...
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedQr({
                          title: 'QR WhatsApp & Teléfono',
                          subtitle: 'Hotel Claymor (+591 71234567)',
                          dataUrl: whatsappQr,
                          payload: WHATSAPP_PHONE,
                          actionLabel: 'Chatear en WhatsApp',
                          actionUrl: WHATSAPP_LINK,
                        })
                      }
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px] cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Ampliar QR</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-900 mt-2 font-mono">
                    {WHATSAPP_PHONE}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Abrir Chat WhatsApp</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(WHATSAPP_PHONE, 'phone')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'phone' ? 'Copiado' : 'Copiar'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadQr(whatsappQr, 'QR_WhatsApp_Hotel_Claymor.png')}
                    className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Descargar imagen QR"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: QR Dirección Web */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-teal-700" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-teal-50 text-teal-800 border border-teal-200">
                    Sitio Web Oficial
                  </span>
                </div>

                <h4 className="font-serif font-bold text-lg text-slate-900">
                  QR Dirección Web
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Escanea para explorar la página oficial de Hotel Claymor, ver las fotos del Carnaval de Oruro y solicitar habitaciones.
                </p>

                {/* QR Canvas Container */}
                <div className="my-5 p-3 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50/40 border border-teal-200/80 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-xl shadow-xs relative group">
                    {webQr ? (
                      <img
                        src={webQr}
                        alt="Código QR de la Página Web Hotel Claymor"
                        className="w-44 h-44 object-contain"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        Generando QR...
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedQr({
                          title: 'QR Dirección Web Oficial',
                          subtitle: 'Hotel Claymor (hotelclaymor.bo)',
                          dataUrl: webQr,
                          payload: webUrl,
                          actionLabel: 'Abrir Página Web',
                          actionUrl: webUrl,
                        })
                      }
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px] cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Ampliar QR</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-900 mt-2 font-mono truncate max-w-[210px]">
                    hotelclaymor.bo
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visitar Página Web</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(webUrl, 'web')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'web' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'web' ? 'Copiado' : 'Copiar URL'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadQr(webQr, 'QR_Web_Hotel_Claymor.png')}
                    className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Descargar imagen QR"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: QR Ubicación Google Maps */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200">
                    Navegación GPS Maps
                  </span>
                </div>

                <h4 className="font-serif font-bold text-lg text-slate-900">
                  QR Ubicación del Hotel
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Escanea para activar la navegación GPS en Google Maps hasta la puerta del hotel en la Calle Aroma (Oruro).
                </p>

                {/* QR Canvas Container */}
                <div className="my-5 p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/80 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-xl shadow-xs relative group">
                    {mapsQr ? (
                      <img
                        src={mapsQr}
                        alt="Código QR de Ubicación Google Maps Hotel Claymor"
                        className="w-44 h-44 object-contain"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        Generando QR...
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedQr({
                          title: 'QR Ubicación en Google Maps',
                          subtitle: 'Calle Aroma e/ Av. 6 de Octubre y Av. La Paz, Oruro',
                          dataUrl: mapsQr,
                          payload: HOTEL_ADDRESS,
                          actionLabel: 'Abrir en Google Maps',
                          actionUrl: GOOGLE_MAPS_LINK,
                        })
                      }
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px] cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Ampliar QR</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-900 mt-2 truncate max-w-[210px]">
                    Calle Aroma e/ 6 de Octubre y La Paz
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo Llegar (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(HOTEL_ADDRESS, 'maps')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'maps' ? <Check className="w-3.5 h-3.5 text-amber-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'maps' ? 'Copiada' : 'Copiar Dirección'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadQr(mapsQr, 'QR_Ubicacion_Maps_Hotel_Claymor.png')}
                    className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Descargar imagen QR"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoomed QR Modal */}
      {zoomedQr && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setZoomedQr(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Hotel Claymor · Oruro
            </span>
            <h3 className="font-serif font-bold text-xl text-slate-900">
              {zoomedQr.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{zoomedQr.subtitle}</p>

            <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
              <img
                src={zoomedQr.dataUrl}
                alt={zoomedQr.title}
                className="w-56 h-56 object-contain rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <a
                href={zoomedQr.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>{zoomedQr.actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setZoomedQr(null)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
