import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  title?: string;
  description?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  villageId: string;
  isFullPage?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, villageId, isFullPage = false }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Default gallery images if none provided
  const defaultImages: GalleryImage[] = [
    {
      id: '1',
      image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Modern Farming Equipment',
      description: 'State-of-the-art agricultural machinery'
    },
    {
      id: '2',
      image_url: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Crop Research',
      description: 'Students conducting field research'
    },
    {
      id: '3',
      image_url: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Greenhouse Studies',
      description: 'Controlled environment agriculture'
    },
    {
      id: '4',
      image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Harvest Season',
      description: 'Students participating in harvest activities'
    },
    {
      id: '5',
      image_url: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Laboratory Work',
      description: 'Soil and plant analysis'
    },
    {
      id: '6',
      image_url: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Field Trip',
      description: 'Educational farm visits'
    }
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;
  const displayImages = isFullPage ? galleryImages : galleryImages.slice(0, 6);

  return (
    <>
      <div className={`${isFullPage ? 'py-8' : 'py-16'} bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4">
          {!isFullPage && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our agricultural facilities, student activities, and campus life through our photo gallery
              </p>
            </div>
          )}

          {/* Pinterest-style Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {displayImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                style={{ marginBottom: '16px' }}
              >
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.title || `Gallery image ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ height: `${200 + (index % 3) * 100}px`, objectFit: 'cover' }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Title overlay */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-medium text-sm">{image.title}</h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title || 'Gallery image'}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                {selectedImage.title && (
                  <h3 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-200">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};