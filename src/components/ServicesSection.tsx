import React from 'react';
import { Coffee, ShieldCheck, Wifi, Waves, Sparkles, BellRing, Check, Clock } from 'lucide-react';
import { HOTEL_SERVICES } from '../data/hotelData';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-sky-600" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-orange-500" />;
      default:
        return <BellRing className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-2">
            <span>Experiencia Integral & Confort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight text-balance">
            Servicios Diseñados para una Estadía Extraordinaria
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cada detalle ha sido cuidadosamente seleccionado: desde nuestro célebre desayuno buffet gourmet hasta conectividad WiFi 6 de alta fidelidad y parqueo privado vigilado las 24 horas.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOTEL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className={`rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                srv.image ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Visual card header */}
                {srv.image && (
                  <div className="relative aspect-[16/9] -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/50 text-white backdrop-blur-md border border-white/20">
                      {srv.highlight}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    {getIcon(srv.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/60">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{srv.hours}</span>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-emerald-800 font-medium mt-1">
                  {srv.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {srv.included ? 'Servicio de Cortesía' : 'Disponible a la Carta'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">24/7 Concierge</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
