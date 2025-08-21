import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  villageId: string;
  villageName: string;
  logoUrl?: string;
  onNavigate: (page: string) => void;
  currentPage: string;
  onAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  villageId, 
  villageName, 
  logoUrl, 
  onNavigate, 
  currentPage,
  onAdminLogin 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'agricultural-info', label: 'Agricultural Info' },
    { id: 'programs', label: 'Programs' },
    { id: 'exhibition', label: 'Exhibition' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
  ];

  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logos */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {logoUrl ? (
                <img src={logoUrl} alt="Village Logo" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className={`h-10 w-10 rounded-full bg-${villageColor}-100 flex items-center justify-center`}>
                  <span className={`text-${villageColor}-600 font-bold text-sm`}>
                    {villageName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">{villageName}</h1>
                <p className="text-xs text-gray-500">Agricultural College</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? `text-${villageColor}-600 bg-${villageColor}-50`
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onAdminLogin}
              className={`px-4 py-2 rounded-md text-sm font-medium bg-${villageColor}-600 text-white hover:bg-${villageColor}-700 transition-colors`}
            >
              Admin
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.id
                      ? `text-${villageColor}-600 bg-${villageColor}-50`
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onAdminLogin();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-${villageColor}-600 text-white hover:bg-${villageColor}-700 transition-colors`}
              >
                Admin Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};