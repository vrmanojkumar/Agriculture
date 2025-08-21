import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { HeroSection } from './HeroSection';
import { ImageSlider } from './ImageSlider';
import { TeamSection } from './TeamSection';
import { GalleryGrid } from './GalleryGrid';
import { Footer } from './Footer';

interface HomePageProps {
  villageId: string;
  villageName: string;
}

export const HomePage: React.FC<HomePageProps> = ({ villageId, villageName }) => {
  const [villageData, setVillageData] = useState<any>(null);
  const [sliderImages, setSliderImages] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomePageData();
  }, [villageId]);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      // Load data from localStorage
      const savedVillageData = localStorage.getItem(`village_${villageId}_data`);
      const savedSliderData = localStorage.getItem(`village_${villageId}_slider`);
      const savedTeamData = localStorage.getItem(`village_${villageId}_team`);
      const savedGalleryData = localStorage.getItem(`village_${villageId}_gallery`);
      
      if (savedVillageData) {
        setVillageData(JSON.parse(savedVillageData));
      }
      if (savedSliderData) {
        setSliderImages(JSON.parse(savedSliderData));
      }
      if (savedTeamData) {
        setTeamMembers(JSON.parse(savedTeamData));
      }
      if (savedGalleryData) {
        const galleryData = JSON.parse(savedGalleryData);
        setGalleryImages(galleryData.slice(0, 6)); // Limit to 6 for homepage
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        villageId={villageId}
        heroImage={villageData?.hero_image_url}
        title={villageData?.hero_title}
        subtitle={villageData?.hero_subtitle}
      />
      
      <ImageSlider
        images={sliderImages}
        villageId={villageId}
      />
      
      <TeamSection
        villageId={villageId}
        teamMembers={teamMembers}
      />
      
      <GalleryGrid
        images={galleryImages}
        villageId={villageId}
      />
      
      <Footer
        villageId={villageId}
        villageName={villageName}
      />
    </div>
  );
};