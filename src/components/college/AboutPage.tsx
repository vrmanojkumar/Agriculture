import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Award, Users, BookOpen, Target } from 'lucide-react';

interface AboutPageProps {
  villageId: string;
  villageName: string;
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ villageId, villageName, onBack }) => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, [villageId]);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      // Load data from localStorage
      const savedVillageData = localStorage.getItem(`village_${villageId}_data`);
      if (savedVillageData) {
        const villageData = JSON.parse(savedVillageData);
        setAboutData({ about_description: villageData.about_description });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  const defaultContent = villageId === 'village-1' ? {
    mission: "To pioneer innovative agricultural education and research that addresses global food security challenges while promoting sustainable farming practices.",
    vision: "To be a leading institution in agricultural innovation, producing graduates who will transform the agricultural industry through technology and sustainable practices.",
    description: "Our Agricultural Innovation Hub represents the cutting edge of modern agricultural education. We combine traditional farming wisdom with the latest technological advances to prepare students for the challenges of 21st-century agriculture. Our state-of-the-art facilities include precision agriculture labs, greenhouse complexes, and research fields where students gain hands-on experience with the tools and techniques that are shaping the future of farming.",
    values: [
      "Innovation in agricultural practices and technology",
      "Sustainability and environmental stewardship",
      "Scientific research and evidence-based farming",
      "Community engagement and knowledge sharing"
    ]
  } : {
    mission: "To preserve and enhance traditional agricultural knowledge while integrating sustainable modern practices for community-centered agricultural development.",
    vision: "To be a center of excellence for traditional and sustainable agriculture, fostering community-based farming practices that honor our heritage while meeting contemporary needs.",
    description: "Our Traditional Farming Excellence program celebrates the rich heritage of agricultural practices passed down through generations while embracing sustainable innovations. We focus on organic farming methods, community-supported agriculture, and the preservation of heirloom varieties. Our approach emphasizes the importance of working with nature rather than against it, creating farming systems that are both productive and environmentally harmonious.",
    values: [
      "Respect for traditional agricultural wisdom",
      "Organic and sustainable farming methods",
      "Community-centered agricultural development",
      "Preservation of agricultural heritage and biodiversity"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className={`flex items-center text-${villageColor}-600 hover:text-${villageColor}-700 mb-8 font-medium`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r from-${villageColor}-500 to-${villageColor}-600 text-white p-8`}>
            <h1 className="text-4xl font-bold mb-4">About {villageName}</h1>
            <p className="text-xl opacity-90">
              Discover our mission, vision, and commitment to agricultural excellence
            </p>
          </div>

          <div className="p-8">
            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${villageColor}-100 rounded-lg mb-4`}>
                  <Target className={`w-6 h-6 text-${villageColor}-600`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  {defaultContent.mission}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${villageColor}-100 rounded-lg mb-4`}>
                  <Award className={`w-6 h-6 text-${villageColor}-600`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  {defaultContent.vision}
                </p>
              </div>
            </div>

            {/* About Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Program</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {aboutData?.about_description || defaultContent.description}
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {defaultContent.values.map((value, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 bg-${villageColor}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                    <p className="text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${villageColor}-100 rounded-full mb-4`}>
                  <Users className={`w-8 h-8 text-${villageColor}-600`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Students Enrolled</p>
              </div>

              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${villageColor}-100 rounded-full mb-4`}>
                  <BookOpen className={`w-8 h-8 text-${villageColor}-600`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
                <p className="text-gray-600">Specialized Courses</p>
              </div>

              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${villageColor}-100 rounded-full mb-4`}>
                  <Award className={`w-8 h-8 text-${villageColor}-600`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};