import React from 'react';

interface HeroSectionProps {
  villageId: string;
  heroImage?: string;
  title?: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  villageId, 
  heroImage, 
  title, 
  subtitle 
}) => {
  const defaultImage = villageId === 'village-1' 
    ? 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    : 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const defaultTitle = villageId === 'village-1' 
    ? 'Agricultural Innovation & Technology'
    : 'Traditional Farming Excellence';

  const defaultSubtitle = villageId === 'village-1'
    ? 'Pioneering the future of sustainable agriculture through research and innovation'
    : 'Preserving traditional wisdom while embracing modern agricultural practices';

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage || defaultImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {title || defaultTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};