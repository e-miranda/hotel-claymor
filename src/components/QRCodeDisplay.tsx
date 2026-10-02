import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Clock, ShieldCheck, RefreshCw, Smartphone, Building2, Coins } from 'lucide-react';

interface QRCodeDisplayProps {
  amount: number;
  currency: string;
  referenceCode: string;
  guestName: string;
  onPaymentSuccess: () => void;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  amount,
  currency,
  referenceCode,
  guestName,
  onPaymentSuccess,
}) => {
  const [qrMode, setQrMode] = useState<'bancario' | 'billetera' | 'cripto'>('bancario');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 minutes
  const [isVerifying, setIsVerifying] = useState(false);

  // Generate real QR Code data
  useEffect(() => {
    let payload = '';
    if (qrMode === 'bancario') {
      payload = `QRSIMPLE_BOLIVIA:HOTEL_CLAYMOR;REF:${referenceCode};AMOUNT_USD:${amount};AMOUNT_BOB:${(amount * 6.96).toFixed(2)};ACCOUNT:201-5092819-3-01_BCP_BOLIVIA;NIT:3829102014;BENEFICIARY:HOTEL_CLAYMOR_SRL;CITY:ORURO;GUEST:${encodeURIComponent(guestName)}`;
    } else if (qrMode === 'billetera') {
      payload = `WALLET_BOLIVIA_YAPE_TIGO:HOTEL_CLAYMOR;REF:${referenceCode};BOB:${(amount * 6.96).toFixed(2)};PHONE:+59171234567;MSG:Reserva_Claymor_Oruro_${referenceCode}`;
    } else {
      payload = `ethereum:0x71C8A1842eD4e27bA10bCfe39c6328A2520E9E8C?value=${(amount * 0.00035).toFixed(4)}&data=${referenceCode}`;
    }

    QRCode.toDataURL(payload, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#0F766E', // Emerald teal
        light: '#FFFFFF',
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error(err));
  }, [qrMode, amount, currency, referenceCode, guestName]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      {/* Mode tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-5">
        <button
          type="button"
          onClick={() => setQrMode('bancario')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            qrMode === 'bancario'
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>QR Simple Bolivia</span>
        </button>
        <button
          type="button"
          onClick={() => setQrMode('billetera')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            qrMode === 'billetera'
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-orange-500" />
          <span>Yape Bolivia / Tigo Money</span>
        </button>
        <button
          type="button"
          onClick={() => setQrMode('cripto')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            qrMode === 'cripto'
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span>USDT / Cripto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* QR Display frame */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative p-3 bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 rounded-2xl shadow-md p-[3px]">
            <div className="bg-white p-3 rounded-2xl flex flex-col items-center">
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt={`QR de pago para reserva ${referenceCode}`}
                  className="w-48 h-48 object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-slate-50 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                </div>
              )}

              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500 block">
                  Escanea con tu App bancaria
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  Reserva: {referenceCode}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic timer */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Código válido por:</span>
            <span className="font-mono font-bold text-amber-800">{formatTime(secondsLeft)}</span>
          </div>
        </div>

        {/* Payment details & actions */}
        <div className="md:col-span-7 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total a transferir</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 font-serif">
                ${amount} {currency}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                (≈ Bs {(amount * 6.96).toFixed(2)} BOB)
              </span>
            </div>
          </div>

          {/* Reference & Account copy box */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Código de Referencia</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{referenceCode}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(referenceCode)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-600">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Beneficiario Oficial</span>
              <p className="font-medium text-slate-800">Hotel Claymor S.R.L. (Oruro, Bolivia)</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {qrMode === 'bancario' && 'Cuenta Corriente BCP Bolivia: 201-5092819-3-01 · NIT: 3829102014'}
                {qrMode === 'billetera' && 'Yape Bolivia / Tigo Money Número Autorizado: +591 71234567'}
                {qrMode === 'cripto' && 'Red USDT (TRC20 / BEP20) disponible'}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              El código QR genera una orden única y segura con tus datos. Una vez realizada la transferencia desde tu app, haz clic en confirmar para recibir tu voucher oficial de check-in.
            </p>
          </div>

          {/* Action button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSimulatePayment}
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 shadow-md shadow-emerald-700/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Validando transferencia en línea...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>He realizado el pago con QR (Confirmar)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
