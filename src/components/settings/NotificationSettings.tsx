import React from 'react';
import { FiBell } from 'react-icons/fi';
import { Card } from '@/components/common/Card';
import * as Switch from '@radix-ui/react-switch';
import { SettingsState, SettingKey } from './types';

interface NotificationSettingsProps {
  settings: SettingsState;
  updateSetting: (key: SettingKey, value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  settings, 
  updateSetting 
}) => {
  return (
    <Card 
      title="Notification Settings" 
      icon={FiBell}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Email notifications</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Receive email notifications</p>
          </div>
          <Switch.Root
            checked={settings.emailNotifications}
            onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Desktop notifications</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Show desktop notifications</p>
          </div>
          <Switch.Root
            checked={settings.desktopNotifications}
            onCheckedChange={(checked) => updateSetting('desktopNotifications', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Sound alerts</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Play sound for new messages</p>
          </div>
          <Switch.Root
            checked={settings.soundAlerts}
            onCheckedChange={(checked) => updateSetting('soundAlerts', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="pt-4 pb-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Notification types</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Control what type of notifications you receive</p>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">New conversations</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">When a new conversation is started</p>
          </div>
          <Switch.Root
            checked={settings.newConversationAlerts}
            onCheckedChange={(checked) => updateSetting('newConversationAlerts', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Mentions</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">When you are mentioned in a conversation</p>
          </div>
          <Switch.Root
            checked={settings.mentionAlerts}
            onCheckedChange={(checked) => updateSetting('mentionAlerts', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Assignments</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">When a conversation is assigned to you</p>
          </div>
          <Switch.Root
            checked={settings.assignmentAlerts}
            onCheckedChange={(checked) => updateSetting('assignmentAlerts', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      </div>
    </Card>
  );
};