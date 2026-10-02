import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenSocialAdmin: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenSocialAdmin,
  onOpenLookup,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Hotel Claymor
            </span>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Tu hotel boutique en Oruro, Bolivia, frente al Parque de la Unión Nacional. Exclusivas suites y habitaciones simples y dobles, desayuno buffet andino con salteñas, parqueo privado 24/7 y sistema de reservas con pago QR.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-slate-400">Síguenos en:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-white transition-colors"
                  title="Instagram"
                >
                  IG
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-white transition-colors"
                  title="TikTok"
                >
                  TK
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-white transition-colors"
                  title="Facebook"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#habitaciones" className="hover:text-emerald-400 transition-colors">
                  Suites & Habitaciones
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-400 transition-colors">
                  Desayuno, Parqueo & WiFi
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-emerald-400 transition-colors">
                  Galería Fotográfica & Carnaval
                </a>
              </li>
              <li>
                <a href="#ubicacion-qr" className="hover:text-emerald-400 transition-colors">
                  Ubicación Maps & Códigos QR
                </a>
              </li>
              <li>
                <a href="#social-hub" className="hover:text-emerald-400 transition-colors">
                  Muro Social Oficial
                </a>
              </li>
            </ul>
          </div>

          {/* Management / Gestiones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Gestión & Reservas</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Solicitar Reserva de Habitación
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLookup}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Consultar Mi Reserva (Código)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSocialAdmin}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Administrar Redes Sociales
                </button>
              </li>
              <li>
                <span className="text-slate-500">Pago con QR Verificado (Bolivia)</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contacto & Ubicación</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Calle Aroma entre Av. 6 de Octubre y Av. La Paz, Oruro, Bolivia (Frente al Parque de la Unión Nacional)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+591 2 525-4890 / WhatsApp: +591 71234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>reservas@hotelclaymor.bo</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Recepción 24 Horas / Atención Carnaval</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hotel Claymor S.R.L. - Oruro, Bolivia. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidad & Términos</span>
            <span>·</span>
            <span>Libro de Reclamaciones</span>
            <span>·</span>
            <span className="text-emerald-400">Pago QR Protegido</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
