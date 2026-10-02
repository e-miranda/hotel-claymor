import React from 'react';
import { X, BedDouble, Maximize, Eye, Users, Check, ArrowRight, ShieldCheck, CalendarCheck, Phone } from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  onClose,
  onBookRoom,
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar with close */}
        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-white mb-2 inline-block">
              {room.category === 'suite' ? 'Suite Ejecutiva' : room.category === 'doble' ? 'Habitación Doble' : 'Habitación Simple'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {room.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">{room.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Capacidad</span>
                <span className="font-semibold text-slate-800">{room.capacity} {room.capacity === 1 ? 'Persona' : 'Personas'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-teal-600" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Superficie</span>
                <span className="font-semibold text-slate-800">{room.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Cama</span>
                <span className="font-semibold text-slate-800 truncate block max-w-[110px]">{room.bed}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Vista</span>
                <span className="font-semibold text-slate-800">{room.view}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-serif font-bold text-slate-900 mb-2">Descripción</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-serif font-bold text-slate-900 mb-3">Amenidades & Equipamiento</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              Incluye desayuno buffet andino con salteñas, calefacción centralizada, WiFi 6 ilimitado y parqueo techado vigilado las 24 horas.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-white border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Precio por noche</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-slate-500 font-medium">USD</span>
              <span className="text-xs font-semibold text-emerald-800 ml-1.5">
                (≈ Bs {Math.round(room.pricePerNight * 6.96)})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cerrar
            </button>

            <a
              href={`https://wa.me/59171234567?text=Hola%20Hotel%20Claymor,%20deseo%20solicitar%20reserva%20para%20la%20habitaci%C3%B3n:%20${encodeURIComponent(room.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Solicitar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Solicitar Reserva con QR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
