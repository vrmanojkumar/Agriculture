import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  villageId: string;
  villageName: string;
}

export const Footer: React.FC<FooterProps> = ({ villageId, villageName }) => {
  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{villageName}</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Dedicated to advancing agricultural education and sustainable farming practices. 
              Join us in shaping the future of agriculture through innovation and tradition.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3" />
                <span>123 Agricultural College Road, Farm City, FC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3" />
                <span>info@{villageId.replace('-', '')}.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Programs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Agricultural Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crop Science</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Soil Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sustainable Agriculture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Agricultural Technology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Research Programs</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className={`text-gray-400 hover:text-${villageColor}-400 transition-colors`}>
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className={`text-gray-400 hover:text-${villageColor}-400 transition-colors`}>
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className={`text-gray-400 hover:text-${villageColor}-400 transition-colors`}>
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className={`text-gray-400 hover:text-${villageColor}-400 transition-colors`}>
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">
            © 2024 {villageName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};