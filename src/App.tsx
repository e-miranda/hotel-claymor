import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomsSection } from './components/RoomsSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { LocationAndQRCodesSection } from './components/LocationAndQRCodesSection';
import { SocialFeedSection } from './components/SocialFeedSection';
import { BookingModal } from './components/BookingModal';
import { RoomDetailsModal } from './components/RoomDetailsModal';
import { SocialAdminModal } from './components/SocialAdminModal';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { HotelReceptionModal } from './components/HotelReceptionModal';
import { Footer } from './components/Footer';
import {
  INITIAL_ROOMS,
  HOTEL_SERVICES,
  GALLERY_PHOTOS,
  INITIAL_SOCIAL_ACCOUNTS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_RESERVATIONS,
  HOTEL_IMAGES,
} from './data/hotelData';
import { Room, Reservation, SocialPost, SocialAccount } from './types/hotel';

export default function App() {
  // Load state from localStorage with fallback
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('claymor_reservations_v2');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('claymor_social_posts_v2');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
  });

  const [socialAccounts] = useState<SocialAccount[]>(INITIAL_SOCIAL_ACCOUNTS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('claymor_reservations_v2', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('claymor_social_posts_v2', JSON.stringify(socialPosts));
  }, [socialPosts]);

  // Modal controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [bookingSearchParams, setBookingSearchParams] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
  } | undefined>(undefined);

  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(null);

  const [isSocialAdminOpen, setIsSocialAdminOpen] = useState(false);
  const [isReceptionOpen, setIsReceptionOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Handlers
  const handleOpenBooking = (room?: Room) => {
    setSelectedRoomForBooking(room || null);
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomCategory: string;
  }) => {
    setBookingSearchParams({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests,
    });
    const foundRoom =
      params.roomCategory !== 'all'
        ? rooms.find((r) => r.category === params.roomCategory)
        : null;
    setSelectedRoomForBooking(foundRoom || null);
    setIsBookingOpen(true);
  };

  const handleOpenRoomDetails = (room: Room) => {
    setSelectedRoomDetails(room);
    setIsRoomDetailsOpen(true);
  };

  const handleSaveReservation = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
  };

  const handleValidatePayment = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, paymentStatus: 'paid' } : r))
    );
  };

  // Social actions
  const handleCreatePost = (
    postData: Omit<SocialPost, 'id' | 'likes' | 'commentsCount' | 'shares'>
  ) => {
    const newPost: SocialPost = {
      ...postData,
      id: 'post-' + Date.now(),
      likes: Math.floor(Math.random() * 20) + 5,
      commentsCount: 0,
      shares: 0,
      comments: [],
    };
    setSocialPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (postId: string) => {
    setSocialPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handlePublishNow = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              status: 'published',
              publishedAt: 'Recién publicado',
            }
          : p
      )
    );
  };

  const handleLikePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: 'c-' + Date.now(),
            author: 'guest_viajero',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
            text,
            timeAgo: 'Justo ahora',
            platform: p.platforms[0],
            replied: false,
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...(p.comments || [])],
          };
        }
        return p;
      })
    );
  };

  const handleReplyComment = (postId: string, commentId: string, replyText: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: (p.comments || []).map((c) =>
              c.id === commentId ? { ...c, replied: true, replyText } : c
            ),
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenSocialAdmin={() => setIsSocialAdminOpen(true)}
        onOpenReception={() => setIsReceptionOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with quick reservation finder */}
        <HeroSection onSearchReservation={handleHeroSearch} />

        {/* Exclusive Rooms & Suites */}
        <RoomsSection
          rooms={rooms}
          onSelectRoomForBooking={(room) => handleOpenBooking(room)}
          onOpenRoomDetails={handleOpenRoomDetails}
        />

        {/* Services & Amenities */}
        <ServicesSection />

        {/* Professional Photo Gallery */}
        <GallerySection photos={GALLERY_PHOTOS} />

        {/* Google Maps Location & Quick QR Codes Hub */}
        <LocationAndQRCodesSection onOpenBooking={() => handleOpenBooking()} />

        {/* Live Social Hub & Feeds */}
        <SocialFeedSection
          posts={socialPosts}
          accounts={socialAccounts}
          onOpenSocialAdmin={() => setIsSocialAdminOpen(true)}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenSocialAdmin={() => setIsSocialAdminOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        rooms={rooms}
        initialRoom={selectedRoomForBooking}
        initialDates={bookingSearchParams}
        onSaveReservation={handleSaveReservation}
      />

      <RoomDetailsModal
        room={selectedRoomDetails}
        onClose={() => setIsRoomDetailsOpen(false)}
        onBookRoom={(room) => handleOpenBooking(room)}
      />

      <SocialAdminModal
        isOpen={isSocialAdminOpen}
        onClose={() => setIsSocialAdminOpen(false)}
        posts={socialPosts}
        accounts={socialAccounts}
        onCreatePost={handleCreatePost}
        onDeletePost={handleDeletePost}
        onPublishNow={handlePublishNow}
        onReplyComment={handleReplyComment}
      />

      <ReservationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        reservations={reservations}
      />

      <HotelReceptionModal
        isOpen={isReceptionOpen}
        onClose={() => setIsReceptionOpen(false)}
        reservations={reservations}
        onValidatePayment={handleValidatePayment}
      />
    </div>
  );
}
