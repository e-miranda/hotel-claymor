import React, { useState } from 'react';
import { X, ShieldCheck, Check, Clock, QrCode, Search, UserCheck, CreditCard } from 'lucide-react';
import { Reservation } from '../types/hotel';

interface HotelReceptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onValidatePayment: (reservationId: string) => void;
}

export const HotelReceptionModal: React.FC<HotelReceptionModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onValidatePayment,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = reservations.filter((r) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'pending'
        ? r.paymentStatus !== 'paid'
        : r.paymentStatus === 'paid';

    const matchesSearch =
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.guestName.toLowerCase().includes(search.toLowerCase()) ||
      r.roomName.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalRevenue = reservations.reduce((acc, r) => acc + r.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                Panel de Recepción & Validación de Pagos QR
              </h3>
              <p className="text-xs text-slate-500">
                Control de reservas en vivo y validación de transferencias QR del hotel
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="bg-slate-50 p-6 border-b border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Total Reservas Activas
            </span>
            <span className="text-2xl font-serif font-bold text-slate-900 mt-0.5 block">
              {reservations.length} Huéspedes
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Pagos Validados con QR
            </span>
            <span className="text-2xl font-serif font-bold text-emerald-700 mt-0.5 block">
              {reservations.filter((r) => r.paymentStatus === 'paid').length} Confirmados
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Ingresos Registrados
            </span>
            <span className="text-2xl font-serif font-bold text-slate-900 mt-0.5 block">
              ${totalRevenue.toLocaleString()} USD
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                filter === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas ({reservations.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Por Validar ({reservations.filter((r) => r.paymentStatus !== 'paid').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('paid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                filter === 'paid'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Pagadas ({reservations.filter((r) => r.paymentStatus === 'paid').length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar por código, huésped o suite..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Reservations Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-3.5">Localizador</th>
                  <th className="p-3.5">Huésped</th>
                  <th className="p-3.5">Alojamiento</th>
                  <th className="p-3.5">Fechas</th>
                  <th className="p-3.5">Monto Total</th>
                  <th className="p-3.5">Estado Pago</th>
                  <th className="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-800">
                      {res.code}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800 block">{res.guestName}</span>
                      <span className="text-[11px] text-slate-400">{res.guestPhone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-700">{res.roomName}</span>
                      <span className="text-[11px] text-slate-400 block">{res.guests} personas</span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <div>{res.checkIn}</div>
                      <div className="text-[11px] text-slate-400">al {res.checkOut}</div>
                    </td>
                    <td className="p-3.5 font-serif font-bold text-slate-900">
                      ${res.totalAmount} USD
                    </td>
                    <td className="p-3.5">
                      {res.paymentStatus === 'paid' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>QR Aprobado</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pendiente Verificación</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      {res.paymentStatus !== 'paid' ? (
                        <button
                          type="button"
                          onClick={() => onValidatePayment(res.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Validar Pago QR
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Verificado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
