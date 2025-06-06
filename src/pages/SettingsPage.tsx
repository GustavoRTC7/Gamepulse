import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Settings, Volume2, Bell, Monitor, Globe, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    volume: 80,
    notifications: true,
    darkMode: true,
    language: i18n.language || 'en-US'
  });

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, volume: Number(e.target.value) }));
  };

  const handleToggle = (setting: string) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSettings(prev => ({ ...prev, language: newLanguage }));
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Settings size={24} className="text-purple-400 mr-2" />
          {t('settings.title')}
        </h1>
        <p className="text-gray-400">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Globe size={20} className="mr-2" />
              {t('settings.language.title')}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="w-full bg-gray-800 text-gray-100 rounded-lg border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="en-US">English (US)</option>
                <option value="pt-BR">Português (BR)</option>
              </select>
              <p className="text-sm text-gray-400">{t('settings.language.subtitle')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Volume2 size={20} className="mr-2" />
              {t('settings.sound.title')}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.sound.masterVolume')}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {settings.volume}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Bell size={20} className="mr-2" />
              {t('settings.notifications.title')}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{t('settings.notifications.enable')}</span>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    settings.notifications ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Monitor size={20} className="mr-2" />
              {t('settings.display.title')}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{t('settings.display.darkMode')}</span>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    settings.darkMode ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save size={16} className="mr-2" />
          {t('settings.save')}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;