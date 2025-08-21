export interface Village {
  id: string;
  name: string;
  logo_url?: string;
  hero_image_url?: string;
  hero_title?: string;
  hero_subtitle?: string;
  about_description?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  village_id: string;
  name: string;
  position: string;
  bio: string;
  profile_image_url: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface SliderImage {
  id: string;
  village_id: string;
  image_url: string;
  caption?: string;
  order_index: number;
  created_at: string;
}

export interface AgriculturalInfo {
  id: string;
  village_id: string;
  title: string;
  description: string;
  content: string;
  featured_image_url: string;
  images: string[];
  category: 'info' | 'program' | 'exhibition';
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  village_id: string;
  image_url: string;
  title?: string;
  description?: string;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  village_id: string;
  name: string;
  role: 'admin';
  created_at: string;
}