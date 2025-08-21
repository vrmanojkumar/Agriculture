import React from 'react';
import { MapPin, Users, Wheat } from 'lucide-react';

interface VillageSelectorProps {
  onVillageSelect: (villageId: string) => void;
}

export const VillageSelector: React.FC<VillageSelectorProps> = ({ onVillageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Wheat className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agricultural College Program
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to our agricultural education program. Choose your village to explore 
            our comprehensive agricultural courses, programs, and community initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Village 1 */}
          <div 
            onClick={() => onVillageSelect('village-1')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent group-hover:border-green-400 group-hover:shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h2 className="text-2xl font-bold">Village 1</h2>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Agricultural Innovation Hub
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore modern farming techniques, sustainable agriculture practices, 
                  and cutting-edge research in agricultural sciences.
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Join Village 1 Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Village 2 */}
          <div 
            onClick={() => onVillageSelect('village-2')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h2 className="text-2xl font-bold">Village 2</h2>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Traditional Farming Excellence
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover time-tested agricultural methods, organic farming, 
                  and community-based agricultural development programs.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Join Village 2 Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Each village represents a unique approach to agricultural education and community development
          </p>
        </div>
      </div>
    </div>
  );
};