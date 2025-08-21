import React, { useState } from 'react';
import { VillageSelector } from './components/VillageSelector';
import { Navbar } from './components/college/Navbar';
import { HomePage } from './components/college/HomePage';
import { InfoCardsPage } from './components/college/InfoCardsPage';
import { GalleryGrid } from './components/college/GalleryGrid';
import { AboutPage } from './components/college/AboutPage';
import { AdminAuth } from './components/college/AdminAuth';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  const getVillageName = (villageId: string) => {
    return villageId === 'village-1' ? 'Village 1 Agricultural College' : 'Village 2 Agricultural College';
  };

  const handleVillageSelect = (villageId: string) => {
    setSelectedVillage(villageId);
    setCurrentPage('home');
    setShowAdminAuth(false);
    setCurrentAdmin(null);
  };

  const handleBackToVillageSelector = () => {
    setSelectedVillage(null);
    setCurrentPage('home');
    setShowAdminAuth(false);
    setCurrentAdmin(null);
  };

  const handleAdminLogin = () => {
    setShowAdminAuth(true);
  };

  const handleAdminAuthenticated = (admin: any) => {
    setCurrentAdmin(admin);
    setShowAdminAuth(false);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    setCurrentPage('home');
  };

  // Village selector screen
  if (!selectedVillage) {
    return <VillageSelector onVillageSelect={handleVillageSelect} />;
  }

  const villageName = getVillageName(selectedVillage);

  // Admin authentication screen
  if (showAdminAuth) {
    return (
      <AdminAuth
        villageId={selectedVillage}
        villageName={villageName}
        onBack={() => setShowAdminAuth(false)}
        onAdminLogin={handleAdminAuthenticated}
      />
    );
  }

  // Admin dashboard
  if (currentAdmin && currentPage === 'admin-dashboard') {
    return (
      <AdminDashboard
        villageId={selectedVillage}
        villageName={villageName}
        admin={currentAdmin}
        onLogout={handleAdminLogout}
      />
    );
  }

  // Main village website
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        villageId={selectedVillage}
        villageName={villageName}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        onAdminLogin={handleAdminLogin}
      />

      {currentPage === 'home' && (
        <HomePage
          villageId={selectedVillage}
          villageName={villageName}
        />
      )}

      {currentPage === 'agricultural-info' && (
        <InfoCardsPage
          villageId={selectedVillage}
          category="info"
          title="Agricultural Information"
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'programs' && (
        <InfoCardsPage
          villageId={selectedVillage}
          category="program"
          title="Programs"
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'exhibition' && (
        <InfoCardsPage
          villageId={selectedVillage}
          category="exhibition"
          title="Agricultural Exhibition"
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'gallery' && (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive photo gallery showcasing agricultural activities, 
                student life, and campus facilities
              </p>
            </div>
            <GalleryGrid
              images={[]}
              villageId={selectedVillage}
              isFullPage={true}
            />
          </div>
        </div>
      )}

      {currentPage === 'about' && (
        <AboutPage
          villageId={selectedVillage}
          villageName={villageName}
          onBack={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
}

export default App;