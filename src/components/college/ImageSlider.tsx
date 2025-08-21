import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderImage {
  id: string;
  image_url: string;
  caption?: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  villageId: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, villageId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default images if none provided
  const defaultImages = villageId === 'village-1' ? [
    {
      id: '1',
      image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Modern Agricultural Techniques'
    },
    {
      id: '2',
      image_url: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Sustainable Farming Practices'
    },
    {
      id: '3',
      image_url: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Agricultural Research'
    }
  ] : [
    {
      id: '1',
      image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Traditional Farming Methods'
    },
    {
      id: '2',
      image_url: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Organic Agriculture'
    },
    {
      id: '3',
      image_url: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Community Farming'
    }
  ];

  const sliderImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1);
  };

  if (sliderImages.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Agricultural Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our agricultural activities, research, and community initiatives through these images
          </p>
        </div>

        <div className="relative">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={sliderImages[currentIndex].image_url}
              alt={sliderImages[currentIndex].caption || 'Agricultural image'}
              className="w-full h-full object-cover"
            />
            
            {sliderImages[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  {sliderImages[currentIndex].caption}
                </p>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? villageId === 'village-1' ? 'bg-green-600' : 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};