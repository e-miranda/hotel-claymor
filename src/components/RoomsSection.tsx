import React, { useState } from 'react';
import { BedDouble, Maximize, Eye, Users, Check, ArrowRight, Star, CalendarCheck, Phone } from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomsSectionProps {
  rooms: Room[];
  onSelectRoomForBooking: (room: Room) => void;
  onOpenRoomDetails: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  rooms,
  onSelectRoomForBooking,
  onOpenRoomDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredRooms = activeCategory === 'all'
    ? rooms
    : rooms.filter((r) => r.category === activeCategory);

  return (
    <section id="habitaciones" className="py-16 sm:py-24 bg-white/70 border-y border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-2">
              <span>Hotel Claymor · Oruro</span>
              <span aria-hidden="true">·</span>
              <span>Solicitar Reserva Online & WhatsApp</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Solicitar Reserva de Suites & Habitaciones
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Selecciona tu suite o habitación preferida frente al Parque de la Unión Nacional. Solicita tu reserva en línea con confirmación por código QR Simple o vía WhatsApp directo.
            </p>
          </div>

          {/* Category Filter buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({rooms.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('suite')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'suite'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Suites
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('doble')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'doble'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Habitaciones Dobles
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('simple')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'simple'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Habitaciones Simples
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-[#FAF8F5] rounded-3xl overflow-hidden border border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Quick badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  {room.popular ? (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                      Más Solicitada
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-950/70 text-emerald-200 backdrop-blur-md border border-emerald-400/20">
                      Exclusiva
                    </span>
                  )}

                  <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {room.size}
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow-sm">
                    {room.name}
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">{room.subtitle}</p>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta specs row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-200/80 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Hasta {room.capacity} pers.</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate">{room.bed.split(' ')[0]} {room.bed.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-teal-600" />
                      <span className="truncate">{room.view.includes('Parque') ? 'Vista al Parque' : 'Vista Ciudad'}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-6">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Tarifa por noche</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
                        Bs. {room.pricePerNight}
                      </span>
                      <span className="text-xs text-emerald-800 font-semibold ml-1">
                        BOB
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenRoomDetails(room)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Detalles
                    </button>
                    
                    <a
                      href={`https://wa.me/59171234567?text=Hola%20Hotel%20Claymor,%20deseo%20solicitar%20la%20reserva%20de%20la%20habitaci%C3%B3n:%20${encodeURIComponent(room.name)}%20(Tarifa:%20Bs.%20${room.pricePerNight}/noche).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                      title={`Solicitar ${room.name} por WhatsApp`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectRoomForBooking(room)}
                      className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Solicitar Reserva</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
