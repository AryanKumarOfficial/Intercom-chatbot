import React from 'react';
import { FiToggleRight, FiMoon, FiSun } from 'react-icons/fi';
import { Card } from '@/components/common/Card';
import * as Switch from '@radix-ui/react-switch';
import { SettingsState, SettingKey } from './types';

interface InterfaceSettingsProps {
  settings: SettingsState;
  updateSetting: (key: SettingKey, value: boolean) => void;
  previewDarkMode: () => void;
  previewLightMode: () => void;
}

export const InterfaceSettings: React.FC<InterfaceSettingsProps> = ({
  settings,
  updateSetting,
  previewDarkMode,
  previewLightMode
}) => {
  return (
    <Card 
      title="Interface Preferences" 
      icon={FiToggleRight}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark mode</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={previewLightMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Preview light mode"
            >
              <FiSun className="text-gray-500 dark:text-gray-400" size={18} />
            </button>
            <Switch.Root
              checked={settings.darkMode}
              onCheckedChange={(checked) => updateSetting('darkMode', checked)}
              className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
            >
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
            <button 
              onClick={previewDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Preview dark mode"
            >
              <FiMoon className="text-gray-500 dark:text-gray-400" size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Compact mode</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Reduce spacing and show more content</p>
          </div>
          <Switch.Root
            checked={settings.compactMode}
            onCheckedChange={(checked) => updateSetting('compactMode', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Show avatars</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Display user avatars in conversations</p>
          </div>
          <Switch.Root
            checked={settings.showAvatars}
            onCheckedChange={(checked) => updateSetting('showAvatars', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Show timestamps</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Display message timestamps</p>
          </div>
          <Switch.Root
            checked={settings.showTimestamps}
            onCheckedChange={(checked) => updateSetting('showTimestamps', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
            <FiToggleRight size={20} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Customize your experience</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              These settings will be synced across all your devices where you're signed in.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};