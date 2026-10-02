import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { GalleryPhoto } from '../types/hotel';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter((p) => p.category === filter);

  const openLightbox = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === 0 ? filteredPhotos.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-2">
              <span>Recorrido Visual</span>
              <span aria-hidden="true">·</span>
              <span>Oruro, Bolivia & Tradición</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Galería de Hotel Claymor & Carnaval de Oruro
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Descubre la magia del Carnaval de Oruro (Obra Maestra de la Humanidad - UNESCO), nuestras vistas privilegiadas al Parque de la Unión Nacional y el confort de nuestras suites.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({photos.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('carnaval')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'carnaval'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Carnaval de Oruro
            </button>
            <button
              type="button"
              onClick={() => setFilter('vistas')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'vistas'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parque de la Unión
            </button>
            <button
              type="button"
              onClick={() => setFilter('suites')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'suites'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Suites
            </button>
            <button
              type="button"
              onClick={() => setFilter('dobles')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'dobles'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Habitaciones Dobles
            </button>
            <button
              type="button"
              onClick={() => setFilter('gastronomia')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'gastronomia'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Desayuno Buffet
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-200/80 shadow-2xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg leading-tight">
                    {photo.title}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top bar */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                {selectedPhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-sm font-serif font-medium text-emerald-300">
                {filteredPhotos[selectedPhotoIndex].location}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar visor"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main image container */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-5xl mx-auto w-full">
            <img
              src={filteredPhotos[selectedPhotoIndex].image}
              alt={filteredPhotos[selectedPhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Navigation buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom caption */}
          <div className="max-w-3xl mx-auto w-full text-center text-white pb-2">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              {filteredPhotos[selectedPhotoIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
              {filteredPhotos[selectedPhotoIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
