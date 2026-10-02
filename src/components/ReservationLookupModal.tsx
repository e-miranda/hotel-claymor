import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Printer, QrCode, AlertCircle } from 'lucide-react';
import { Reservation } from '../types/hotel';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({
  isOpen,
  onClose,
  reservations,
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<Reservation | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    const found = reservations.find(
      (r) =>
        r.code.toUpperCase() === query ||
        r.guestEmail.toLowerCase() === searchCode.trim().toLowerCase()
    );
    setSearchResult(found || null);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-emerald-700" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Consultar Mi Reserva
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Ingresa tu código (ej. CLM-84920) o correo..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="flex-1 text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              required
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 transition-all cursor-pointer whitespace-nowrap"
            >
              Consultar
            </button>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div>
              {searchResult ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Localizador
                      </span>
                      <span className="font-mono font-extrabold text-emerald-800 text-lg">
                        {searchResult.code}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Estado</span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          searchResult.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {searchResult.paymentStatus === 'paid' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Confirmada & Pagada (QR)</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Garantizada (Recepción)</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Huésped Titular</span>
                      <span className="font-semibold text-slate-800">{searchResult.guestName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Alojamiento</span>
                      <span className="font-semibold text-slate-800">{searchResult.roomName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Estadía</span>
                      <span className="text-slate-700">
                        {searchResult.checkIn} al {searchResult.checkOut} ({searchResult.nights} noches)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Abonado</span>
                      <span className="font-serif font-bold text-slate-900 text-sm">
                        ${searchResult.totalAmount} USD
                      </span>
                    </div>
                  </div>

                  {searchResult.qrReferenceCode && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs flex items-center justify-between border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Referencia de Pago QR
                        </span>
                        <span className="font-mono font-bold text-slate-700">
                          {searchResult.qrReferenceCode}
                        </span>
                      </div>
                      <QrCode className="w-5 h-5 text-emerald-700" />
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Reimprimir Comprobante</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-800">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>
                    No encontramos ninguna reserva con ese código o correo electrónico. Por favor verifica los caracteres o comunícate con recepción.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
