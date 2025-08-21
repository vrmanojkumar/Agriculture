import React, { useState } from 'react';
import { Users, Mail, Phone, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  profile_image_url: string;
  email?: string;
  phone?: string;
}

interface TeamSectionProps {
  villageId: string;
  teamMembers: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ villageId, teamMembers }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Default team data if none provided
  const defaultTeam = villageId === 'village-1' ? [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      position: 'Head of Agricultural Innovation',
      bio: 'Dr. Johnson leads our research in sustainable farming technologies and has over 15 years of experience in agricultural sciences.',
      profile_image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'sarah.johnson@village1.edu',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      position: 'Crop Science Specialist',
      bio: 'Professor Chen specializes in crop genetics and biotechnology, focusing on developing drought-resistant varieties.',
      profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'michael.chen@village1.edu',
      phone: '+1 (555) 234-5678'
    }
  ] : [
    {
      id: '1',
      name: 'Dr. Maria Rodriguez',
      position: 'Traditional Farming Expert',
      bio: 'Dr. Rodriguez specializes in organic farming methods and traditional agricultural practices passed down through generations.',
      profile_image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'maria.rodriguez@village2.edu',
      phone: '+1 (555) 345-6789'
    },
    {
      id: '2',
      name: 'Prof. James Wilson',
      position: 'Community Agriculture Coordinator',
      bio: 'Professor Wilson focuses on community-based agricultural development and sustainable farming practices.',
      profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'james.wilson@village2.edu',
      phone: '+1 (555) 456-7890'
    }
  ];

  const team = teamMembers.length > 0 ? teamMembers : defaultTeam;
  const villageColor = villageId === 'village-1' ? 'green' : 'blue';

  return (
    <>
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of agricultural experts and educators are committed to advancing 
              agricultural knowledge and sustainable farming practices.
            </p>
          </div>

          {/* Group Photo */}
          <div className="mb-12">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team Group Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold">Our Agricultural Team</h3>
                </div>
              </div>
            </div>
          </div>

          {/* View Individual Profiles Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedMember(team[0])}
              className={`inline-flex items-center px-6 py-3 bg-${villageColor}-600 text-white rounded-lg hover:bg-${villageColor}-700 transition-colors font-medium`}
            >
              <Users className="w-5 h-5 mr-2" />
              View Individual Profiles
            </button>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.profile_image_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className={`text-${villageColor}-600 font-medium mb-3`}>{member.position}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="h-64 overflow-hidden">
                <img
                  src={selectedMember.profile_image_url}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                <p className={`text-${villageColor}-600 font-medium text-lg mb-6`}>
                  {selectedMember.position}
                </p>
                
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                </div>
                
                <div className="space-y-3">
                  {selectedMember.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3" />
                      <a href={`mailto:${selectedMember.email}`} className="hover:text-blue-600">
                        {selectedMember.email}
                      </a>
                    </div>
                  )}
                  {selectedMember.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3" />
                      <a href={`tel:${selectedMember.phone}`} className="hover:text-blue-600">
                        {selectedMember.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};