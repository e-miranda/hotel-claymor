import React, { useState } from 'react';
import { CalendarCheck, Shield, Share2, Menu, X, Sparkles, Search } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenSocialAdmin: () => void;
  onOpenReception: () => void;
  onOpenLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSocialAdmin,
  onOpenReception,
  onOpenLookup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-emerald-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            Hotel Claymor
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#habitaciones" className="hover:text-emerald-700 transition-colors">
            Suites & Habitaciones
          </a>
          <a href="#servicios" className="hover:text-emerald-700 transition-colors">
            Servicios
          </a>
          <a href="#galeria" className="hover:text-emerald-700 transition-colors">
            Galería & Carnaval
          </a>
          <a href="#ubicacion-qr" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
            <span>Ubicación & QR</span>
          </a>
          <a href="#social-hub" className="hover:text-emerald-700 transition-colors">
            Redes
          </a>
          <button
            type="button"
            onClick={onOpenLookup}
            className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultar Reserva</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin panel dropdown or trigger buttons */}
          <div className="flex items-center gap-1.5 mr-1">
            <button
              type="button"
              onClick={onOpenSocialAdmin}
              title="Administrar redes sociales (Instagram, TikTok, Facebook)"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Admin Redes</span>
            </button>
            <button
              type="button"
              onClick={onOpenReception}
              title="Panel de recepción y validación de pagos QR"
              className="p-1.5 text-slate-600 hover:text-emerald-800 bg-white border border-slate-200/80 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="py-2.5 px-5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Solicitar Reserva</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenBooking}
            className="py-1.5 px-3 text-xs font-semibold text-white bg-emerald-700 rounded-lg"
          >
            Solicitar
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-700 focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-emerald-900/10 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#habitaciones"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Suites & Habitaciones
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Servicios (Desayuno, Parqueo, WiFi, Calefacción)
          </a>
          <a
            href="#galeria"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Galería & Carnaval de Oruro
          </a>
          <a
            href="#ubicacion-qr"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-emerald-800 hover:text-emerald-950 font-semibold"
          >
            📍 Ubicación Maps & Códigos QR
          </a>
          <a
            href="#social-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Comunidad Social (IG, TikTok, FB)
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLookup();
            }}
            className="w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Consultar mi Reserva</span>
          </button>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSocialAdmin();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-orange-500" />
              <span>Administrar Redes Sociales</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReception();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Panel de Recepción & Pagos QR</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
