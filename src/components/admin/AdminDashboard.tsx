import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ImageUpload } from '../common/ImageUpload';
import { 
  LogOut, 
  Home, 
  Image, 
  Users, 
  FileText, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  villageId: string;
  villageName: string;
  admin: any;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  villageId,
  villageName,
  admin,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [villageData, setVillageData] = useState<any>(null);
  const [sliderImages, setSliderImages] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [agriculturalInfo, setAgriculturalInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  useEffect(() => {
    fetchAllData();
    loadLocalData();
  }, [villageId]);

  const loadLocalData = () => {
    // Load data from localStorage for persistence
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
      setGalleryImages(JSON.parse(savedGalleryData));
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Load data from localStorage only
      loadLocalData();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVillageData = async (data: any) => {
    try {
      // Store in localStorage for persistence
      localStorage.setItem(`village_${villageId}_data`, JSON.stringify(data));
      setVillageData({ ...villageData, ...data });
      alert('Village data saved successfully!');
    } catch (error: any) {
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleAddSliderImage = async (imageData: any) => {
    try {
      // Store in localStorage for persistence
      const currentSlider = JSON.parse(localStorage.getItem(`village_${villageId}_slider`) || '[]');
      const newSliderData = [...currentSlider, { ...imageData, id: Date.now().toString() }];
      localStorage.setItem(`village_${villageId}_slider`, JSON.stringify(newSliderData));
      setSliderImages(newSliderData);
      alert('Slider image added successfully!');
    } catch (error: any) {
      alert(`Error adding image: ${error.message}`);
    }
  };

  const handleDeleteItem = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // Remove from localStorage based on table type
      if (table === 'slider_images') {
        const currentSlider = JSON.parse(localStorage.getItem(`village_${villageId}_slider`) || '[]');
        const updatedSlider = currentSlider.filter((item: any) => item.id !== id);
        localStorage.setItem(`village_${villageId}_slider`, JSON.stringify(updatedSlider));
        setSliderImages(updatedSlider);
      } else if (table === 'team_members') {
        const currentTeam = JSON.parse(localStorage.getItem(`village_${villageId}_team`) || '[]');
        const updatedTeam = currentTeam.filter((item: any) => item.id !== id);
        localStorage.setItem(`village_${villageId}_team`, JSON.stringify(updatedTeam));
        setTeamMembers(updatedTeam);
      } else if (table === 'gallery_images') {
        const currentGallery = JSON.parse(localStorage.getItem(`village_${villageId}_gallery`) || '[]');
        const updatedGallery = currentGallery.filter((item: any) => item.id !== id);
        localStorage.setItem(`village_${villageId}_gallery`, JSON.stringify(updatedGallery));
        setGalleryImages(updatedGallery);
      } else if (table === 'agricultural_info') {
        const currentContent = JSON.parse(localStorage.getItem(`village_${villageId}_content`) || '[]');
        const updatedContent = currentContent.filter((item: any) => item.id !== id);
        localStorage.setItem(`village_${villageId}_content`, JSON.stringify(updatedContent));
        setAgriculturalInfo(updatedContent);
      }
      alert('Item deleted successfully!');
    } catch (error: any) {
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'village-settings', name: 'Village Settings', icon: Settings },
    { id: 'slider-images', name: 'Slider Images', icon: Image },
    { id: 'team-members', name: 'Team Members', icon: Users },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'content', name: 'Content Management', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">{villageName} - {admin.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? `bg-${villageColor}-100 text-${villageColor}-700 border-${villageColor}-200`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Slider Images</h3>
                    <p className="text-2xl font-bold text-blue-600">{sliderImages.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Team Members</h3>
                    <p className="text-2xl font-bold text-green-600">{teamMembers.length}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-900">Gallery Images</h3>
                    <p className="text-2xl font-bold text-purple-600">{galleryImages.length}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-yellow-900">Content Items</h3>
                    <p className="text-2xl font-bold text-yellow-600">{agriculturalInfo.length}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'village-settings' && (
              <VillageSettingsTab
                villageData={villageData}
                onSave={handleSaveVillageData}
                villageColor={villageColor}
              />
            )}

            {activeTab === 'slider-images' && (
              <SliderImagesTab
                images={sliderImages}
                onAdd={handleAddSliderImage}
                onDelete={(id) => handleDeleteItem('slider_images', id)}
                villageColor={villageColor}
              />
            )}

            {activeTab === 'team-members' && (
              <TeamMembersTab
                members={teamMembers}
                villageId={villageId}
                onRefresh={fetchAllData}
                villageColor={villageColor}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryTab
                images={galleryImages}
                villageId={villageId}
                onRefresh={fetchAllData}
                villageColor={villageColor}
              />
            )}

            {activeTab === 'content' && (
              <ContentTab
                content={agriculturalInfo}
                villageId={villageId}
                onRefresh={fetchAllData}
                villageColor={villageColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Village Settings Tab Component
const VillageSettingsTab: React.FC<any> = ({ villageData, onSave, villageColor }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    //hero_image_url: '',
    hero_title: '',
    hero_subtitle: '',
    about_description: ''
  });

  useEffect(() => {
    if (villageData) {
      setFormData(villageData);
    }
  }, [villageData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Village Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Village Name
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Village Logo
          </label>
          <ImageUpload
            onImageUpload={(imageUrl) => setFormData({ ...formData, logo_url: imageUrl })}
            currentImage={formData.logo_url}
            label="Upload Logo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Background Image
          </label>
          <ImageUpload
            onImageUpload={(imageUrl) => setFormData({ ...formData, hero_image_url: imageUrl })}
            currentImage={formData.hero_image_url}
            label="Upload Hero Image"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Title
          </label>
          <input
            type="text"
            value={formData.hero_title || ''}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={formData.hero_subtitle || ''}
            onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Description
          </label>
          <textarea
            rows={4}
            value={formData.about_description || ''}
            onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`flex items-center px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700 transition-colors`}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Slider Images Tab Component
const SliderImagesTab: React.FC<any> = ({ images, onAdd, onDelete, villageColor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    image_url: '',
    caption: '',
    order_index: 0
  });

  const handleAdd = () => {
    if (!newImage.image_url) {
      alert('Please upload an image first');
      return;
    }
    onAdd(newImage);
    setNewImage({ image_url: '', caption: '', order_index: 0 });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Slider Images</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`flex items-center px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700 transition-colors`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Add New Slider Image</h3>
          <div className="space-y-4">
            <ImageUpload
              onImageUpload={(imageUrl) => setNewImage({ ...newImage, image_url: imageUrl })}
              currentImage={newImage.image_url}
              label="Upload Slider Image"
            />
            <input
              type="text"
              placeholder="Caption (optional)"
              value={newImage.caption}
              onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Order Index"
              value={newImage.order_index}
              onChange={(e) => setNewImage({ ...newImage, order_index: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAdd}
                className={`px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700`}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image: any) => (
          <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={image.image_url}
              alt={image.caption}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="text-sm text-gray-600 mb-2">{image.caption}</p>
              <p className="text-xs text-gray-500 mb-2">Order: {image.order_index}</p>
              <button
                onClick={() => onDelete(image.id)}
                className="flex items-center text-red-600 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Team Members Tab Component
const TeamMembersTab: React.FC<any> = ({ members, villageId, onRefresh, villageColor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    bio: '',
    profile_image_url: '',
    email: '',
    phone: ''
  });

  const handleAdd = async () => {
    try {
      if (!newMember.profile_image_url) {
        alert('Please upload a profile image first');
        return;
      }
      
      // Store in localStorage for persistence
      const currentTeam = JSON.parse(localStorage.getItem(`village_${villageId}_team`) || '[]');
      const newTeamData = [...currentTeam, { ...newMember, id: Date.now().toString() }];
      localStorage.setItem(`village_${villageId}_team`, JSON.stringify(newTeamData));
      setNewMember({
        name: '',
        position: '',
        bio: '',
        profile_image_url: '',
        email: '',
        phone: ''
      });
      setShowAddForm(false);
      setTeamMembers(newTeamData);
      alert('Team member added successfully!');
    } catch (error: any) {
      alert(`Error adding team member: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      // Remove from localStorage
      const currentTeam = JSON.parse(localStorage.getItem(`village_${villageId}_team`) || '[]');
      const updatedTeam = currentTeam.filter((member: any) => member.id !== id);
      localStorage.setItem(`village_${villageId}_team`, JSON.stringify(updatedTeam));
      setTeamMembers(updatedTeam);
      alert('Team member deleted successfully!');
    } catch (error: any) {
      alert(`Error deleting team member: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`flex items-center px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700 transition-colors`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Add New Team Member</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Position"
              value={newMember.position}
              onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <div className="md:col-span-2">
              <ImageUpload
                onImageUpload={(imageUrl) => setNewMember({ ...newMember, profile_image_url: imageUrl })}
                currentImage={newMember.profile_image_url}
                label="Upload Profile Image"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <textarea
            placeholder="Bio"
            rows={3}
            value={newMember.bio}
            onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleAdd}
              className={`px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700`}
            >
              Add
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member: any) => (
          <div key={member.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={member.profile_image_url}
              alt={member.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.position}</p>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{member.bio}</p>
              <button
                onClick={() => handleDelete(member.id)}
                className="flex items-center text-red-600 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gallery Tab Component
const GalleryTab: React.FC<any> = ({ images, villageId, onRefresh, villageColor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    image_url: '',
    title: '',
    description: ''
  });

  const handleAdd = async () => {
    try {
      if (!newImage.image_url) {
        alert('Please upload an image first');
        return;
      }
      
      // Store in localStorage for persistence
      const currentGallery = JSON.parse(localStorage.getItem(`village_${villageId}_gallery`) || '[]');
      const newGalleryData = [...currentGallery, { ...newImage, id: Date.now().toString() }];
      localStorage.setItem(`village_${villageId}_gallery`, JSON.stringify(newGalleryData));
      setNewImage({ image_url: '', title: '', description: '' });
      setShowAddForm(false);
      setGalleryImages(newGalleryData);
      alert('Gallery image added successfully!');
    } catch (error: any) {
      alert(`Error adding image: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // Remove from localStorage
      const currentGallery = JSON.parse(localStorage.getItem(`village_${villageId}_gallery`) || '[]');
      const updatedGallery = currentGallery.filter((image: any) => image.id !== id);
      localStorage.setItem(`village_${villageId}_gallery`, JSON.stringify(updatedGallery));
      setGalleryImages(updatedGallery);
      alert('Image deleted successfully!');
    } catch (error: any) {
      alert(`Error deleting image: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Gallery Images</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`flex items-center px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700 transition-colors`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Add New Gallery Image</h3>
          <div className="space-y-4">
            <ImageUpload
              onImageUpload={(imageUrl) => setNewImage({ ...newImage, image_url: imageUrl })}
              currentImage={newImage.image_url}
              label="Upload Gallery Image"
            />
            <input
              type="text"
              placeholder="Title (optional)"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Description (optional)"
              rows={2}
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAdd}
                className={`px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700`}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image: any) => (
          <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">{image.title || 'Untitled'}</h3>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{image.description}</p>
              <button
                onClick={() => handleDelete(image.id)}
                className="flex items-center text-red-600 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Content Tab Component
const ContentTab: React.FC<any> = ({ content, villageId, onRefresh, villageColor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    content: '',
    featured_image_url: '',
    images: [],
    category: 'info'
  });

  const handleAdd = async () => {
    try {
      if (!newContent.featured_image_url) {
        alert('Please upload a featured image first');
        return;
      }
      
      // Store in localStorage for persistence
      const currentContent = JSON.parse(localStorage.getItem(`village_${villageId}_content`) || '[]');
      const newContentData = [...currentContent, { ...newContent, id: Date.now().toString() }];
      localStorage.setItem(`village_${villageId}_content`, JSON.stringify(newContentData));
      setNewContent({
        title: '',
        description: '',
        content: '',
        featured_image_url: '',
        images: [],
        category: 'info'
      });
      setShowAddForm(false);
      setAgriculturalInfo(newContentData);
      alert('Content added successfully!');
    } catch (error: any) {
      alert(`Error adding content: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      // Remove from localStorage
      const currentContent = JSON.parse(localStorage.getItem(`village_${villageId}_content`) || '[]');
      const updatedContent = currentContent.filter((item: any) => item.id !== id);
      localStorage.setItem(`village_${villageId}_content`, JSON.stringify(updatedContent));
      setAgriculturalInfo(updatedContent);
      alert('Content deleted successfully!');
    } catch (error: any) {
      alert(`Error deleting content: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className={`flex items-center px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700 transition-colors`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Add New Content</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Description"
              rows={2}
              value={newContent.description}
              onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Full Content"
              rows={4}
              value={newContent.content}
              onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ImageUpload
              onImageUpload={(imageUrl) => setNewContent({ ...newContent, featured_image_url: imageUrl })}
              currentImage={newContent.featured_image_url}
              label="Upload Featured Image"
            />
            <select
              value={newContent.category}
              onChange={(e) => setNewContent({ ...newContent, category: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="info">Agricultural Information</option>
              <option value="program">Program</option>
              <option value="exhibition">Exhibition</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleAdd}
                className={`px-4 py-2 bg-${villageColor}-600 text-white rounded-md hover:bg-${villageColor}-700`}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {content.map((item: any) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full bg-${villageColor}-100 text-${villageColor}-800`}>
                  {item.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center text-red-600 hover:text-red-700 text-sm ml-4"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};