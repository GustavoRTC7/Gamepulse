import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { User, Camera, Save, X } from 'lucide-react';
import { marvelAvatars } from '../data/avatars';
import { supabase } from '../config/supabase';

const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email || '',
    bio: currentUser.bio || '',
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setShowAvatarModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          avatar: selectedAvatar,
          updated_at: new Date()
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      // Show success message or notification
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <User size={24} className="text-purple-400 mr-2" />
          Profile Settings
        </h1>
        <p className="text-gray-400">Manage your profile information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={selectedAvatar}
                    alt={currentUser.username}
                    size="xl"
                    className="relative group"
                  />
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => setShowAvatarModal(true)}
                      type="button"
                    >
                      <Camera size={16} className="mr-2" />
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800 text-gray-100 rounded-lg border border-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="flex items-center"
                    isLoading={isSaving}
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-white">Account Statistics</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm">Account Level</div>
                  <div className="text-white text-lg font-bold">{currentUser.level}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Rank</div>
                  <div className="text-white text-lg font-bold">{currentUser.rank}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Win Rate</div>
                  <div className="text-white text-lg font-bold">{currentUser.winRate}%</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Total Matches</div>
                  <div className="text-white text-lg font-bold">{currentUser.totalMatches}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Choose Your Avatar</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {marvelAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`cursor-pointer rounded-lg p-2 transition-all ${
                    selectedAvatar === avatar.url
                      ? 'bg-purple-600'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleAvatarSelect(avatar.url)}
                >
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-center text-white">{avatar.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;