export interface Room {
  id: string;
  name: string;
  subtitle: string;
  category: 'suite' | 'doble' | 'simple';
  pricePerNight: number;
  capacity: number;
  size: string;
  bed: string;
  view: string;
  image: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface HotelService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  hours: string;
  highlight: string;
  image?: string;
  included: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'carnaval' | 'vistas' | 'suites' | 'dobles' | 'gastronomia' | 'videos';
  image: string;
  caption: string;
  location: string;
  isVideo?: boolean;
  videoUrl?: string;
  duration?: string;
}

export interface Reservation {
  id: string;
  code: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestDoc: string;
  specialRequests?: string;
  addons: {
    spaPackage: boolean;
    airportTransfer: boolean;
    premiumBreakfast: boolean;
  };
  totalAmount: number;
  currency: string;
  paymentMethod: 'qr_banco' | 'qr_wallet' | 'card' | 'reception';
  paymentStatus: 'paid' | 'pending_verification' | 'reception_due';
  qrReferenceCode?: string;
  createdAt: string;
}

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'tiktok' | 'facebook';
  handle: string;
  displayName: string;
  followers: number;
  engagementRate: string;
  status: 'connected' | 'needs_reauth';
  avatar: string;
}

export interface SocialPost {
  id: string;
  platforms: ('instagram' | 'tiktok' | 'facebook')[];
  caption: string;
  hashtags: string[];
  imageUrl: string;
  mediaType: 'image' | 'video';
  status: 'published' | 'scheduled' | 'draft';
  scheduledDate?: string;
  publishedAt?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  videoDuration?: string;
  videoUrl?: string;
  comments?: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timeAgo: string;
    platform: 'instagram' | 'tiktok' | 'facebook';
    replied?: boolean;
    replyText?: string;
  }[];
}

export interface SocialAnalytics {
  totalFollowers: number;
  weeklyGrowth: number;
  avgEngagement: number;
  monthlyImpressions: number;
}
