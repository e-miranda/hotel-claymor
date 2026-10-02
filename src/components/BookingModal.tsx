import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Check,
  CreditCard,
  Building,
  Sparkles,
  Car,
  Coffee,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  QrCode,
} from 'lucide-react';
import { Room, Reservation } from '../types/hotel';
import { QRCodeDisplay } from './QRCodeDisplay';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  initialRoom?: Room | null;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
  onSaveReservation: (reservation: Reservation) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  initialRoom,
  initialDates,
  onSaveReservation,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Default dates
  const today = new Date();
  const defaultIn = new Date(today);
  defaultIn.setDate(defaultIn.getDate() + 1);
  const defaultOut = new Date(defaultIn);
  defaultOut.setDate(defaultOut.getDate() + 3);

  const [checkIn, setCheckIn] = useState(
    initialDates?.checkIn || defaultIn.toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState(
    initialDates?.checkOut || defaultOut.toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState(initialDates?.guests || 2);
  const [selectedRoomId, setSelectedRoomId] = useState(
    initialRoom?.id || rooms[0]?.id || ''
  );

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestDoc, setGuestDoc] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Addons
  const [spaPackage, setSpaPackage] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [premiumBreakfast, setPremiumBreakfast] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'qr_banco' | 'qr_wallet' | 'card' | 'reception'>('qr_banco');
  const [generatedRefCode, setGeneratedRefCode] = useState('');
  const [completedReservation, setCompletedReservation] = useState<Reservation | null>(null);

  // Update when initialRoom changes
  useEffect(() => {
    if (initialRoom) {
      setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoom]);

  // Generate unique reference code when reaching step 3
  useEffect(() => {
    if (step === 3 && !generatedRefCode) {
      const code = 'QR-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedRefCode(code);
    }
  }, [step, generatedRefCode]);

  if (!isOpen) return null;

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1);

  // Price calculations in Bolivianos (Bs.)
  const roomTotal = (selectedRoom ? selectedRoom.pricePerNight : 450) * calculatedNights;
  const spaTotal = spaPackage ? 175 * guests : 0;
  const transferTotal = airportTransfer ? 140 : 0;
  const breakfastTotal = premiumBreakfast ? 150 * calculatedNights : 0;
  const subtotal = roomTotal + spaTotal + transferTotal + breakfastTotal;
  const taxes = Math.round(subtotal * 0.10); // 10% hotel tax
  const grandTotal = subtotal + taxes;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;
    setStep(3);
  };

  const handleFinishBooking = (isInstantPaid: boolean) => {
    const reservationCode = 'CLM-' + Math.floor(10000 + Math.random() * 90000);
    const newReservation: Reservation = {
      id: 'res-' + Date.now(),
      code: reservationCode,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights: calculatedNights,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      guestDoc,
      specialRequests,
      addons: {
        spaPackage,
        airportTransfer,
        premiumBreakfast,
      },
      totalAmount: grandTotal,
      currency: 'Bs.',
      paymentMethod,
      paymentStatus: isInstantPaid ? 'paid' : paymentMethod === 'reception' ? 'reception_due' : 'pending_verification',
      qrReferenceCode: generatedRefCode,
      createdAt: new Date().toISOString(),
    };

    onSaveReservation(newReservation);
    setCompletedReservation(newReservation);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Step Progress */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-lg text-slate-900">
              Solicitar Reserva - Hotel Claymor
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Mejor Tarifa Garantizada
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200/80">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            <div className={`py-1 rounded-lg ${step >= 1 ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-slate-400'}`}>
              1. Fechas & Suite
            </div>
            <div className={`py-1 rounded-lg ${step >= 2 ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-slate-400'}`}>
              2. Datos & Servicios
            </div>
            <div className={`py-1 rounded-lg ${step >= 3 ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-slate-400'}`}>
              3. Pago con QR
            </div>
            <div className={`py-1 rounded-lg ${step >= 4 ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-slate-400'}`}>
              4. Voucher Oficial
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Fechas & Suite */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-6">
              {/* Date selection */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Llegada (Check-in)
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Salida (Check-out)
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Huéspedes
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white"
                  >
                    <option value={1}>1 Huésped</option>
                    <option value={2}>2 Huéspedes</option>
                    <option value={3}>3 Huéspedes</option>
                    <option value={4}>4 Huéspedes</option>
                  </select>
                </div>
              </div>

              {/* Room Cards Choice */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-3">
                  Selecciona tu Alojamiento ({calculatedNights} {calculatedNights === 1 ? 'noche' : 'noches'})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rooms.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${
                          isSelected
                            ? 'bg-emerald-50/60 border-emerald-600 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif font-bold text-sm text-slate-900">
                                {room.name}
                              </h4>
                              {isSelected && (
                                <Check className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {room.size} · {room.view}
                            </p>
                          </div>

                          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-100">
                            <span className="text-[11px] text-slate-400">Por noche:</span>
                            <span className="font-bold font-serif text-slate-900 text-base">
                              Bs. {room.pricePerNight}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next CTA */}
              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Continuar con Datos de Huésped</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Datos del Huésped & Servicios Adicionales */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Datos del Titular de la Reserva
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Roberto Sánchez Gómez"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Correo Electrónico (para voucher) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="roberto@ejemplo.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+51 987 654 321"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Documento de Identidad / Pasaporte
                    </label>
                    <input
                      type="text"
                      placeholder="DNI o Pasaporte"
                      value={guestDoc}
                      onChange={(e) => setGuestDoc(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Peticiones Especiales (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Hora estimada de llegada, piso alto, alergias alimentarias..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Addons & Experiences */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-3">
                  Mejora tu Estadía con Servicios Exclusivos
                </h4>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={spaPackage}
                        onChange={(e) => setSpaPackage(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Asesoría & Asistencia Palcos Carnaval de Oruro
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Orientación turística para compra de graderías, mapas de recorrido y horarios de fraternidades
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
                      +Bs. 175
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={airportTransfer}
                        onChange={(e) => setAirportTransfer(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Transfer Privado Terminal / Aeropuerto Juan Mendoza - Hotel
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Recepción directa y traslado seguro y climatizado hasta la puerta de Hotel Claymor
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
                      +Bs. 140 Total
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Summary Bar */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-800 font-medium block">
                    {selectedRoom?.name} · {calculatedNights} noches · {guests} huéspedes
                  </span>
                  <span className="text-xs text-slate-500">
                    Incluye Desayuno Buffet con Salteñas, Parqueo Techado 24/7 y Calefacción
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total con Impuestos</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif font-extrabold text-slate-900">
                      Bs. {grandTotal}
                    </span>
                    <span className="text-xs text-emerald-800 font-bold ml-1">
                      BOB
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceder al Pago con QR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Pago con QR Integrado */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Payment selector tabs */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-slate-900">
                    Pago de la Reserva con Código QR
                  </h4>
                  <p className="text-xs text-slate-500">
                    Escanea el código QR desde la app de tu banco o billetera digital favorita para validar tu estadía al instante.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pago Seguro Instantáneo</span>
                </div>
              </div>

              {/* QR Component */}
              <QRCodeDisplay
                amount={grandTotal}
                currency="Bs."
                referenceCode={generatedRefCode}
                guestName={guestName || 'Huésped Estimado'}
                onPaymentSuccess={() => handleFinishBooking(true)}
              />

              {/* Alternative fallback */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">¿Prefieres pagar al llegar al hotel?</span>
                  <span className="text-slate-500">
                    Puedes garantizar tu reserva ahora y abonar en recepción mediante efectivo o tarjeta de crédito.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('reception');
                    handleFinishBooking(false);
                  }}
                  className="py-2 px-4 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Pagar en Recepción
                </button>
              </div>

              {/* Back button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modificar Datos o Servicios</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmación & Voucher Oficial */}
          {step === 4 && completedReservation && (
            <div className="space-y-6">
              <div className="text-center py-4 bg-emerald-50/80 rounded-3xl border border-emerald-200/60 p-6">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">
                  ¡Reserva Confirmada Exitosamente!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-lg mx-auto">
                  Hemos enviado una copia del comprobante a <span className="font-semibold">{completedReservation.guestEmail}</span>. Presenta tu código localizador o QR al hacer el Check-in.
                </p>
              </div>

              {/* Official Voucher Card */}
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-md relative overflow-hidden print:m-0 print:border-none">
                {/* Voucher Top Watermark Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-xl font-serif font-bold bg-gradient-to-r from-emerald-800 to-amber-600 bg-clip-text text-transparent">
                      Hotel Claymor
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Voucher Oficial · Calle Aroma entre Av. 6 de Octubre y Av. La Paz, Oruro (Frente al Parque de la Unión)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Localizador de Reserva
                    </span>
                    <span className="text-lg font-mono font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      {completedReservation.code}
                    </span>
                  </div>
                </div>

                {/* Voucher Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Titular</span>
                    <span className="font-semibold text-slate-800">{completedReservation.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Suite / Habitación</span>
                    <span className="font-semibold text-slate-800">{completedReservation.roomName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Llegada</span>
                    <span className="font-semibold text-slate-800">{completedReservation.checkIn} (15:00 hrs)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Salida</span>
                    <span className="font-semibold text-slate-800">{completedReservation.checkOut} (12:00 hrs)</span>
                  </div>
                </div>

                {/* Financial details & QR Check-in */}
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Estado del Pago:</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {completedReservation.paymentStatus === 'paid'
                            ? 'Pagado con QR Bancario (Verificado)'
                            : 'Garantizado (Pago en Recepción)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Monto Total:</span>
                        <span className="font-serif font-extrabold text-slate-900 text-base">
                          Bs. {completedReservation.totalAmount} BOB
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Servicios incluidos: Desayuno Buffet Diario con Salteñas, Parqueo Techado Vigilado 24/7, Calefacción Central y WiFi 6.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Voucher</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
