import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, ExternalLink, Sparkles, Send } from 'lucide-react';
import { SocialPost, SocialAccount } from '../types/hotel';

interface SocialFeedSectionProps {
  posts: SocialPost[];
  accounts: SocialAccount[];
  onOpenSocialAdmin: () => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const SocialFeedSection: React.FC<SocialFeedSectionProps> = ({
  posts,
  accounts,
  onOpenSocialAdmin,
  onLikePost,
  onAddComment,
}) => {
  const [platformFilter, setPlatformFilter] = useState<'all' | 'instagram' | 'tiktok' | 'facebook'>('all');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const filteredPosts = platformFilter === 'all'
    ? posts
    : posts.filter((p) => p.platforms.includes(platformFilter));

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <section id="social-hub" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-2">
              <span>Comunidad Conectada</span>
              <span aria-hidden="true">·</span>
              <span>#HotelClaymor #Oruro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Vive la Experiencia en Redes Sociales
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Sigue nuestros canales oficiales en Instagram, TikTok y Facebook. Descubre reels de huéspedes, eventos exclusivos y etiqueta tus fotos para aparecer en nuestro muro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenSocialAdmin}
              className="py-2.5 px-4 text-xs font-bold text-slate-800 bg-white hover:bg-emerald-50 border border-slate-200/90 rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Administrar Redes del Hotel</span>
            </button>
          </div>
        </div>

        {/* Social Accounts Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                  acc.platform === 'instagram'
                    ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                    : acc.platform === 'tiktok'
                    ? 'bg-black text-cyan-400'
                    : 'bg-blue-600 text-white'
                }`}>
                  {acc.platform === 'instagram' && 'IG'}
                  {acc.platform === 'tiktok' && 'TK'}
                  {acc.platform === 'facebook' && 'FB'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{acc.handle}</h4>
                  <p className="text-[11px] text-slate-500">{acc.followers.toLocaleString()} seguidores</p>
                </div>
              </div>

              <a
                href={acc.platform === 'instagram' ? 'https://instagram.com' : acc.platform === 'tiktok' ? 'https://tiktok.com' : 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Seguir</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setPlatformFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              platformFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            Todas las Publicaciones
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('instagram')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              platformFilter === 'instagram'
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <span>Instagram Feed</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('tiktok')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              platformFilter === 'tiktok'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <span>TikTok Reels</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('facebook')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              platformFilter === 'facebook'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            <span>Facebook Comunidad</span>
          </button>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Platform Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {post.platforms.map((p) => (
                    <span
                      key={p}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white shadow-xs ${
                        p === 'instagram'
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : p === 'tiktok'
                          ? 'bg-black/90'
                          : 'bg-blue-600'
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Video Play indicator if video */}
                {post.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <span className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-md">
                      <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2 right-2 text-[10px] font-medium text-white/90 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {post.publishedAt || 'Programado'}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Hashtags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-emerald-800 hover:text-emerald-950 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement counts */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <button
                      type="button"
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer group"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-slate-700">{post.likes.toLocaleString()}</span>
                    </button>
                    <div className="flex items-center gap-1 text-slate-600">
                      <MessageCircle className="w-4 h-4 text-sky-600" />
                      <span>{post.comments?.length || post.commentsCount} comentarios</span>
                    </div>
                  </div>

                  {/* Top comment showcase */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-2.5 mb-3 text-xs border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          @{post.comments[0].author}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {post.comments[0].timeAgo}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        "{post.comments[0].text}"
                      </p>
                      {post.comments[0].replied && (
                        <p className="text-[10px] text-emerald-800 font-medium pl-2 border-l-2 border-emerald-400 mt-1">
                          Hotel Claymor: {post.comments[0].replyText}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Add quick comment input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      type="text"
                      placeholder="Escribe un comentario..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[post.id]?.trim()}
                      className="p-1.5 rounded-lg bg-emerald-700 text-white disabled:opacity-40 hover:bg-emerald-800 transition-colors cursor-pointer"
                      title="Publicar comentario"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
