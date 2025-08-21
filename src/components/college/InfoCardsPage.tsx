import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface InfoCard {
  id: string;
  title: string;
  description: string;
  content: string;
  featured_image_url: string;
  images: string[];
  created_at: string;
}

interface InfoCardsPageProps {
  villageId: string;
  category: 'info' | 'program' | 'exhibition';
  title: string;
  onBack: () => void;
}

export const InfoCardsPage: React.FC<InfoCardsPageProps> = ({ 
  villageId, 
  category, 
  title, 
  onBack 
}) => {
  const [cards, setCards] = useState<InfoCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<InfoCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, [villageId, category]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      // Load data from localStorage
      const savedContent = localStorage.getItem(`village_${villageId}_content`);
      if (savedContent) {
        const allContent = JSON.parse(savedContent);
        const filteredContent = allContent.filter((item: any) => item.category === category);
        setCards(filteredContent);
      } else {
        setCards([]);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default cards if none exist
  const getDefaultCards = () => {
    const defaultData = {
      info: [
        {
          id: '1',
          title: 'Sustainable Farming Practices',
          description: 'Learn about eco-friendly farming methods that preserve soil health and increase crop yield.',
          content: 'Sustainable farming practices are essential for maintaining soil health, conserving water, and protecting the environment while ensuring profitable crop production. These methods include crop rotation, cover cropping, integrated pest management, and organic fertilization techniques. By implementing these practices, farmers can reduce their environmental impact while maintaining or even increasing their yields. The key principles include maintaining soil fertility through natural means, conserving water resources, promoting biodiversity, and minimizing the use of synthetic chemicals.',
          featured_image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
          images: [
            'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Crop Rotation Techniques',
          description: 'Discover how proper crop rotation can improve soil fertility and reduce pest problems.',
          content: 'Crop rotation is a fundamental agricultural practice that involves growing different types of crops in the same area across different seasons or years. This technique helps break pest and disease cycles, improves soil structure and fertility, and can increase overall farm productivity. Different crops have varying nutrient requirements and contribute different organic matter to the soil. Legumes, for example, fix nitrogen in the soil, while deep-rooted crops can bring nutrients from lower soil layers to the surface.',
          featured_image_url: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
          images: [
            'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          created_at: new Date().toISOString()
        }
      ],
      program: [
        {
          id: '1',
          title: 'Agricultural Technology Program',
          description: 'Comprehensive program covering modern farming technologies and precision agriculture.',
          content: 'Our Agricultural Technology Program is designed to prepare students for the rapidly evolving field of modern agriculture. The curriculum covers precision agriculture, GPS-guided farming equipment, drone technology for crop monitoring, soil sensors, and data analytics for farm management. Students learn to integrate technology with traditional farming knowledge to optimize crop production, reduce resource waste, and increase profitability. The program includes hands-on experience with the latest agricultural equipment and software.',
          featured_image_url: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
          images: [
            'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          created_at: new Date().toISOString()
        }
      ],
      exhibition: [
        {
          id: '1',
          title: 'Annual Agricultural Innovation Fair',
          description: 'Showcase of the latest agricultural innovations, research projects, and student achievements.',
          content: 'Our Annual Agricultural Innovation Fair is a premier event that brings together students, faculty, industry professionals, and the local community to celebrate agricultural innovation and education. The fair features student research projects, demonstrations of cutting-edge farming technologies, displays of crop varieties and livestock, and presentations by industry experts. Visitors can learn about sustainable farming practices, new agricultural technologies, and career opportunities in agriculture.',
          featured_image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
          images: [
            'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          created_at: new Date().toISOString()
        }
      ]
    };

    return defaultData[category] || [];
  };

  const displayCards = cards.length > 0 ? cards : getDefaultCards();
  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  if (selectedCard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedCard(null)}
            className={`flex items-center text-${villageColor}-600 hover:text-${villageColor}-700 mb-6 font-medium`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {title}
          </button>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={selectedCard.featured_image_url}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(selectedCard.created_at).toLocaleDateString()}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedCard.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {selectedCard.description}
              </p>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedCard.content}
                </p>
              </div>

              {selectedCard.images && selectedCard.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCard.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`${selectedCard.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className={`flex items-center text-${villageColor}-600 hover:text-${villageColor}-700 mb-8 font-medium`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of agricultural knowledge, programs, and innovations
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.featured_image_url}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {card.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(card.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};