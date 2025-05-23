import React from 'react';
import { FiShield } from 'react-icons/fi';
import { Card } from '@/components/common/Card';
import * as Switch from '@radix-ui/react-switch';

interface AdvancedSettingsProps {
  // Add any specific props needed for advanced settings
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = () => {
  return (
    <Card 
      title="Advanced Settings" 
      icon={FiShield}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiShield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Warning</h3>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                These settings are for advanced users. Changing them may affect your experience and performance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Developer mode</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Enable debug tools and verbose logging</p>
          </div>
          <Switch.Root
            checked={false}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">API access</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Enable API for third-party integrations</p>
          </div>
          <Switch.Root
            checked={false}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Experimental features</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Try new features before they're released</p>
          </div>
          <Switch.Root
            checked={false}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Data retention</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">How long to keep your conversation history</p>
          </div>
          <select className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1">
            <option value="forever">Forever</option>
            <option value="1year">1 Year</option>
            <option value="6months">6 Months</option>
            <option value="3months">3 Months</option>
            <option value="1month">1 Month</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Export all data</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Download a copy of all your data</p>
          </div>
          <button className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/50">
            Export
          </button>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Delete all data</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete all your conversations</p>
          </div>
          <button className="text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-md hover:bg-red-100 dark:hover:bg-red-800/50">
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};