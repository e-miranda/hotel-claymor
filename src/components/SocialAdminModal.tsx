import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Calendar,
  Send,
  Sparkles,
  BarChart3,
  MessageSquare,
  Smartphone,
  Trash2,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Heart,
  Share2,
  Repeat,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { SocialPost, SocialAccount } from '../types/hotel';
import { HOTEL_IMAGES } from '../data/hotelData';

interface SocialAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: SocialPost[];
  accounts: SocialAccount[];
  onCreatePost: (newPost: Omit<SocialPost, 'id' | 'likes' | 'commentsCount' | 'shares'>) => void;
  onDeletePost: (postId: string) => void;
  onPublishNow: (postId: string) => void;
  onReplyComment: (postId: string, commentId: string, replyText: string) => void;
}

export const SocialAdminModal: React.FC<SocialAdminModalProps> = ({
  isOpen,
  onClose,
  posts,
  accounts,
  onCreatePost,
  onDeletePost,
  onPublishNow,
  onReplyComment,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'feed' | 'inbox' | 'analytics'>('create');

  // Creator state
  const [selectedPlatforms, setSelectedPlatforms] = useState<('instagram' | 'tiktok' | 'facebook')[]>([
    'instagram',
    'facebook',
  ]);
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(HOTEL_IMAGES.carnavalOruro);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'tiktok' | 'facebook'>('instagram');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick reply input per comment
  const [replyInputs, setReplyInputs] = useState<{ [commentId: string]: string }>({});

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePlatform = (platform: 'instagram' | 'tiktok' | 'facebook') => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleAddHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    // extract hashtags
    const extractedTags = caption.match(/#[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]+/g) || [
      '#HotelClaymor',
      '#CarnavalDeOruro',
      '#OruroBolivia',
      '#ParqueDeLaUnion',
    ];

    onCreatePost({
      platforms: selectedPlatforms,
      caption,
      hashtags: extractedTags,
      imageUrl: selectedImage,
      mediaType: selectedPlatforms.includes('tiktok') ? 'video' : 'image',
      status: isScheduled ? 'scheduled' : 'published',
      scheduledDate: isScheduled ? scheduleDateTime : undefined,
      publishedAt: isScheduled ? undefined : 'Recién publicado',
      comments: [],
    });

    setCaption('');
    setIsScheduled(false);
    showToast(isScheduled ? '¡Publicación programada con éxito!' : '¡Publicado con éxito en redes!');
    setActiveTab('feed');
  };

  const handleSendReply = (postId: string, commentId: string) => {
    const text = replyInputs[commentId]?.trim();
    if (!text) return;
    onReplyComment(postId, commentId, text);
    setReplyInputs((prev) => ({ ...prev, [commentId]: '' }));
    showToast('Respuesta enviada como @HotelClaymorOruro');
  };

  const hotelPhotosPreset = [
    { name: 'Carnaval de Oruro - Diablada', url: HOTEL_IMAGES.carnavalOruro },
    { name: 'Fachada Hotel Claymor & Parque', url: HOTEL_IMAGES.heroFacade },
    { name: 'Vista Parque de la Unión Nacional', url: HOTEL_IMAGES.parqueUnionView },
    { name: 'Master Suite Claymor', url: HOTEL_IMAGES.suiteClaymor },
    { name: 'Habitación Doble Superior', url: HOTEL_IMAGES.habitacionDoble },
    { name: 'Desayuno Buffet con Salteñas', url: HOTEL_IMAGES.desayunoBuffet },
  ];

  const suggestedHashtags = [
    '#HotelClaymor',
    '#CarnavalDeOruro',
    '#OruroBolivia',
    '#ParqueDeLaUnion',
    '#DiabladaOruro',
    '#SalteñasOruro',
    '#TurismoBolivia',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-2xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 leading-tight">
                Administrador de Redes Sociales
              </h3>
              <p className="text-xs text-slate-500">
                Gestión unificada para Instagram, TikTok y Facebook de Hotel Claymor (Oruro, Bolivia)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear & Publicar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Feed & Programadas ({posts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Bandeja de Interacción</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas & Crecimiento</span>
          </button>
        </div>

        {/* Toast notification */}
        {toastMessage && (
          <div className="bg-emerald-700 text-white text-xs font-medium py-2 px-6 flex items-center justify-between">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Create & Live Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'create' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 space-y-5">
                <form onSubmit={handlePublishSubmit} className="space-y-5">
                  {/* Select target platforms */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                      1. Selecciona Redes Sociales de Destino
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleTogglePlatform('instagram')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          selectedPlatforms.includes('instagram')
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>Instagram</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePlatform('tiktok')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          selectedPlatforms.includes('tiktok')
                            ? 'bg-black text-white border-transparent shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>TikTok</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePlatform('facebook')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          selectedPlatforms.includes('facebook')
                            ? 'bg-blue-600 text-white border-transparent shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>Facebook</span>
                      </button>
                    </div>
                  </div>

                  {/* Caption & Text Editor */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase text-slate-500">
                        2. Redactar Contenido / Copy
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {caption.length} / 2200 car.
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Escribe el mensaje para tus seguidores. Ejemplo: Descubre la calidez de nuestras mañanas en Hotel Claymor con desayuno buffet andino con salteñas frente al Parque de la Unión Nacional... 🌄🏨"
                      className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                      required
                    />

                    {/* Suggested Hashtags */}
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                        Hashtags Recomendados:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedHashtags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleAddHashtag(tag)}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60 font-medium transition-colors cursor-pointer"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Choose visual media */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                      3. Seleccionar Fotografía / Activo Visual
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {hotelPhotosPreset.map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedImage(photo.url)}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                            selectedImage === photo.url
                              ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                              : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={photo.url}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                            <span className="text-[10px] text-white font-medium line-clamp-1">
                              {photo.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule option */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="scheduleCheck"
                        checked={isScheduled}
                        onChange={(e) => setIsScheduled(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <label htmlFor="scheduleCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                        Programar para publicar más tarde
                      </label>
                    </div>

                    {isScheduled && (
                      <input
                        type="datetime-local"
                        value={scheduleDateTime}
                        onChange={(e) => setScheduleDateTime(e.target.value)}
                        className="text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
                        required
                      />
                    )}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {isScheduled ? (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>Programar Publicación Multi-Plataforma</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Publicar Inmediatamente en Redes Sociales</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Smartphone Mockup Preview */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Vista Previa en Tiempo Real
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewPlatform('instagram')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        previewPlatform === 'instagram' ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      Instagram
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPlatform('tiktok')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        previewPlatform === 'tiktok' ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      TikTok
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPlatform('facebook')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        previewPlatform === 'facebook' ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      Facebook
                    </button>
                  </div>
                </div>

                {/* Smartphone Device Frame */}
                <div className="w-full max-w-[320px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800">
                  {/* Phone Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-900" />
                  </div>

                  {/* Phone Screen */}
                  <div className="bg-white rounded-[28px] overflow-hidden min-h-[460px] max-h-[500px] flex flex-col justify-between text-slate-800 text-xs">
                    {/* Instagram Preview */}
                    {previewPlatform === 'instagram' && (
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* IG Header */}
                          <div className="p-3 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <img
                                src={HOTEL_IMAGES.heroFacade}
                                alt="avatar"
                                className="w-7 h-7 rounded-full object-cover border border-amber-500"
                              />
                              <div>
                                <span className="font-bold text-[11px] block">hotelclaymororuro</span>
                                <span className="text-[9px] text-slate-400">Oruro · Parque de la Unión Nacional</span>
                              </div>
                            </div>
                            <span className="text-slate-400 font-bold">···</span>
                          </div>

                          {/* Image */}
                          <div className="aspect-square bg-slate-100 relative">
                            <img
                              src={selectedImage}
                              alt="preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* IG Actions */}
                          <div className="p-3">
                            <div className="flex items-center justify-between mb-2 text-slate-800">
                              <div className="flex items-center gap-3">
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                                <MessageCircle className="w-4 h-4" />
                                <Send className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">1,420 likes</span>
                            </div>

                            {/* Caption */}
                            <p className="text-[11px] leading-snug line-clamp-3">
                              <span className="font-bold mr-1">hotelclaymororuro</span>
                              {caption || 'Tu mejor estancia en Oruro frente al Parque de la Unión Nacional. ¡Reserva con QR!'}
                            </p>
                          </div>
                        </div>

                        <div className="p-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                          Instagram Feed Mockup
                        </div>
                      </div>
                    )}

                    {/* TikTok Preview */}
                    {previewPlatform === 'tiktok' && (
                      <div className="relative h-[480px] bg-black text-white flex flex-col justify-between overflow-hidden">
                        <img
                          src={selectedImage}
                          alt="preview"
                          className="absolute inset-0 w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

                        {/* Top bar */}
                        <div className="relative z-10 p-3 text-center text-xs font-semibold text-white/90">
                          Siguiendo | <span className="font-bold border-b-2 border-white pb-0.5">Para ti</span>
                        </div>

                        {/* TikTok Right action buttons */}
                        <div className="absolute right-2 bottom-16 z-10 flex flex-col items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                            <img src={HOTEL_IMAGES.heroFacade} alt="avatar" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col items-center">
                            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                            <span className="text-[9px]">12.4k</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <MessageCircle className="w-5 h-5 fill-white text-white" />
                            <span className="text-[9px]">340</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Share2 className="w-5 h-5" />
                            <span className="text-[9px]">89</span>
                          </div>
                        </div>

                        {/* Bottom info */}
                        <div className="relative z-10 p-3 pr-14">
                          <p className="font-bold text-[11px]">@claymor.hotel.oruro</p>
                          <p className="text-[10px] line-clamp-2 mt-0.5 text-white/90">
                            {caption || 'POV: Abres tu ventana y ves el Parque de la Unión Nacional en Oruro #HotelClaymor'}
                          </p>
                          <div className="flex items-center gap-1.5 text-[9px] text-white/70 mt-1">
                            <span>🎵 Banda Poopó - Carnaval de Oruro</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Facebook Preview */}
                    {previewPlatform === 'facebook' && (
                      <div className="p-3 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src={HOTEL_IMAGES.heroFacade}
                              alt="avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-[11px] block">
                                Hotel Claymor - Oruro, Bolivia
                              </span>
                              <span className="text-[9px] text-slate-400">Hace 5 min · 🌐 Público</span>
                            </div>
                          </div>

                          <p className="text-[11px] mb-2 text-slate-700 leading-snug">
                            {caption || 'Disfruta de tarifas exclusivas reservando directo en nuestro sitio web.'}
                          </p>

                          <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden mb-2">
                            <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3 text-blue-600 fill-blue-600" />
                              <span>245 me gusta</span>
                            </span>
                            <span>42 comentarios · 18 veces compartido</span>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-2 grid grid-cols-3 text-center text-[10px] font-semibold text-slate-600">
                          <span className="py-1 hover:bg-slate-50 rounded">Me gusta</span>
                          <span className="py-1 hover:bg-slate-50 rounded">Comentar</span>
                          <span className="py-1 hover:bg-slate-50 rounded">Compartir</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Feed & Scheduled Posts List */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Publicaciones Activas y Programadas
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Nueva Publicación</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex gap-4"
                  >
                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={post.imageUrl}
                        alt="post thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1">
                            {post.platforms.map((p) => (
                              <span
                                key={p}
                                className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-700"
                              >
                                {p}
                              </span>
                            ))}
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              post.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {post.status === 'published' ? 'Publicado' : 'Programado'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-800 line-clamp-2 mt-1">
                          {post.caption}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments?.length || post.commentsCount}</span>
                          <span>🔄 {post.shares}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2 text-xs">
                        <span className="text-[10px] text-slate-400">
                          {post.publishedAt || post.scheduledDate}
                        </span>

                        <div className="flex items-center gap-2">
                          {post.status === 'scheduled' && (
                            <button
                              type="button"
                              onClick={() => {
                                onPublishNow(post.id);
                                showToast('Post publicado inmediatamente.');
                              }}
                              className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px]"
                            >
                              Publicar Ahora
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onDeletePost(post.id)}
                            className="text-rose-600 hover:text-rose-800 p-1"
                            title="Eliminar publicación"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Community Inbox & Moderation */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Bandeja de Interacción & Comentarios
                  </h4>
                  <p className="text-xs text-slate-500">
                    Responde como cuenta oficial del hotel a tus seguidores de Instagram, TikTok y Facebook
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {posts
                  .flatMap((p) => (p.comments || []).map((c) => ({ ...c, postId: p.id })))
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">
                                @{comment.author}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase font-semibold">
                                {comment.platform}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">{comment.timeAgo}</span>
                          </div>
                        </div>

                        {comment.replied && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Respondido</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        "{comment.text}"
                      </p>

                      {comment.replied && comment.replyText ? (
                        <div className="text-xs bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-emerald-900">
                          <span className="font-bold block text-[11px] text-emerald-800">
                            Respuesta de Hotel Claymor:
                          </span>
                          <span>{comment.replyText}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Escribe tu respuesta oficial como hotel..."
                            value={replyInputs[comment.id] || ''}
                            onChange={(e) =>
                              setReplyInputs((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => handleSendReply(comment.postId, comment.id)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Responder</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tab 4: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold uppercase block">Audiencia Total</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-serif">175,420</span>
                    <span className="text-xs text-emerald-600 font-bold">+8.4%</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">En Instagram, TikTok y Facebook</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold uppercase block">Tasa de Engagement</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-serif">6.2%</span>
                    <span className="text-xs text-emerald-600 font-bold">+1.2%</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Promedio interacciones/vistas</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold uppercase block">Impresiones Semanales</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-serif">540,890</span>
                    <span className="text-xs text-emerald-600 font-bold">+24.5%</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Alcance orgánico de reels y fotos</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold uppercase block">Conversión a Reservas</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-emerald-700 font-serif">31%</span>
                    <span className="text-xs text-emerald-600 font-bold">QR / Web</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Tráfico que reserva directamente</span>
                </div>
              </div>

              {/* Performance by channel */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900 mb-4">
                  Rendimiento por Canal Oficial
                </h4>
                <div className="space-y-4">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                          acc.platform === 'instagram' ? 'bg-rose-500' : acc.platform === 'tiktok' ? 'bg-black text-cyan-400' : 'bg-blue-600'
                        }`}>
                          {acc.platform.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-slate-800">{acc.displayName}</span>
                          <span className="text-[11px] text-slate-500 block">{acc.handle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Seguidores</span>
                          <span className="font-bold text-slate-800">{acc.followers.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Engagement</span>
                          <span className="font-bold text-emerald-700">{acc.engagementRate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Estado</span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Conectado
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
