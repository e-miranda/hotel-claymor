import React, { useState } from 'react';
import { Calendar, Users, QrCode, ArrowRight, ShieldCheck, Sparkles, MapPin, Star, Play } from 'lucide-react';
import { HOTEL_IMAGES } from '../data/hotelData';
import { VideoPlayerModal } from './VideoPlayerModal';

interface HeroSectionProps {
  onSearchReservation: (searchParams: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomCategory: string;
  }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchReservation }) => {
  // Pre-fill tomorrow and 3 days later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDate = new Date(tomorrow);
  checkoutDate.setDate(checkoutDate.getDate() + 3);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(checkoutDate.toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [roomCategory, setRoomCategory] = useState('all');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchReservation({
      checkIn,
      checkOut,
      guests,
      roomCategory,
    });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pb-24">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-gradient-to-br from-emerald-300/30 via-teal-200/20 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-gradient-to-tr from-amber-300/20 via-orange-300/20 to-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-950/10 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
          {/* Background Image with refined contrast scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src={HOTEL_IMAGES.heroFacade}
              alt="Fachada moderna de Hotel Claymor frente al Parque de la Unión Nacional en Oruro Bolivia"
              className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Multi-tone luxury gradient overlay: emerald teal to warm amber sunset */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-emerald-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-amber-950/30" />
          </div>

          {/* Top badge & location */}
          <div className="relative z-10 p-6 sm:p-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Hotel Boutique en Oruro · Calidez & Confort</span>
            </div>

            <a
              href="#ubicacion-qr"
              className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs sm:text-sm font-medium bg-black/35 hover:bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 transition-colors"
              title="Ver ubicación en Google Maps y Códigos QR"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Calle Aroma e/ Av. 6 de Octubre y Av. La Paz · Oruro</span>
            </a>
          </div>

          {/* Hero Copy */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 pb-8 lg:pb-12 max-w-3xl">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-white/80 text-xs ml-2 font-medium tracking-wider uppercase">
                Hotel Claymor Oruro
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-tight tracking-tight text-balance">
              El confort andino con vista al Parque de la Unión Nacional
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed">
              Descansa en el corazón de Oruro. Disfruta de nuestras elegantes suites y habitaciones simples y dobles con calefacción, desayuno buffet con salteñas calientes, parqueo techado y pago inmediato con código QR Simple.
            </p>

            {/* Quick Hero Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#habitaciones"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Ver Habitaciones & Tarifas</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm border border-white/25 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Ver Video del Hotel & Carnaval</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Reserva Directa Garantizada
              </span>
              <span className="text-slate-400">·</span>
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-amber-400" />
                Pago Inmediato con QR Simple
              </span>
              <span className="text-slate-400">·</span>
              <span>Desayuno Buffet & Parqueo 24/7 Incluidos</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Reservation Search Engine */}
        <div className="relative z-20 -mt-10 sm:-mt-12 mx-auto max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xl border border-emerald-900/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end"
          >
            {/* Check-in */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Llegada (Check-in)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  required
                />
                <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Check-out */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Salida (Check-out)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  required
                />
                <Calendar className="w-4 h-4 text-amber-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Guests */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Huéspedes
              </label>
              <div className="relative">
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none"
                >
                  <option value={1}>1 Huésped</option>
                  <option value={2}>2 Huéspedes</option>
                  <option value={3}>3 Huéspedes</option>
                  <option value={4}>4 Huéspedes</option>
                  <option value={5}>5+ Huéspedes</option>
                </select>
                <Users className="w-4 h-4 text-teal-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Room category */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tipo Habitación
              </label>
              <select
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              >
                <option value="all">Todas las Opciones</option>
                <option value="suite">Suites Ejecutivas</option>
                <option value="doble">Habitaciones Dobles</option>
                <option value="simple">Habitaciones Simples</option>
              </select>
            </div>

            {/* Submit button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Solicitar Reserva</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Video Player Modal */}
      {isVideoOpen && (
        <VideoPlayerModal
          isOpen={true}
          onClose={() => setIsVideoOpen(false)}
          videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          title="Hotel Claymor · Recorrido Virtual y Carnaval de Oruro"
          subtitle="Confort andino frente al Parque de la Unión Nacional, Oruro, Bolivia"
          posterImage={HOTEL_IMAGES.heroFacade}
        />
      )}
    </section>
  );
};
