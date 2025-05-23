'use client';

import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/common/Button';
import { AISettings } from '@/components/settings/AISettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { InterfaceSettings } from '@/components/settings/InterfaceSettings';
import { AdvancedSettings } from '@/components/settings/AdvancedSettings';
import { SettingsState, SettingKey } from '@/components/settings/types';

export default function SettingsPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('ai');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);
  
  // Default settings state
  const defaultSettings: SettingsState = {
    // AI Settings
    enableAI: true,
    autoSuggestions: true,
    autoCategories: true,
    sentimentAnalysis: true,
    prioritySuggestions: false,
    autoReplies: false,
    
    // Notification Settings
    emailNotifications: true,
    desktopNotifications: true,
    soundAlerts: false,
    newConversationAlerts: true,
    mentionAlerts: true,
    assignmentAlerts: true,
    
    // UI Settings
    compactMode: false,
    darkMode: false,
    showAvatars: true,
    showTimestamps: true,
  };
  
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  
  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatbot-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  // Update a specific setting
  const updateSetting = (key: SettingKey, value: boolean): void => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };
  
  // Save all settings
  const saveSettings = (): void => {
    localStorage.setItem('chatbot-settings', JSON.stringify(settings));
    setHasUnsavedChanges(false);
    setSettingsSaved(true);
    
    // Apply theme setting immediately
    document.documentElement.classList.toggle('dark', settings.darkMode);
    
    setTimeout(() => {
      setSettingsSaved(false);
    }, 3000);
  };
  
  // Reset all settings
  const resetSettings = (): void => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
    setShowResetConfirm(false);
  };
  
  // Preview dark/light modes
  const previewDarkMode = (): void => {
    document.documentElement.classList.add('dark');
    setTimeout(() => {
      if (!settings.darkMode) {
        document.documentElement.classList.remove('dark');
      }
    }, 2000);
  };
  
  const previewLightMode = (): void => {
    document.documentElement.classList.remove('dark');
    setTimeout(() => {
      if (settings.darkMode) {
        document.documentElement.classList.add('dark');
      }
    }, 2000);
  };
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mr-4">
            <FiSettings className="text-gray-600 dark:text-gray-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure your workspace preferences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          {hasUnsavedChanges && (
            <span className="text-sm text-yellow-600 dark:text-yellow-400 mr-2">
              Unsaved changes
            </span>
          )}
          {settingsSaved && (
            <span className="text-sm text-green-600 dark:text-green-400 mr-2">
              Settings saved!
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            disabled={showResetConfirm}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={saveSettings}
            disabled={!hasUnsavedChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Reset all settings?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will reset all settings to their default values. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={resetSettings}>
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'ai'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('ai')}
        >
          AI Features
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'notifications'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'interface'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('interface')}
        >
          Interface
        </button>
        {showAdvancedSettings && (
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'advanced'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
        )}
      </div>
      
      {/* Settings Content */}
      <div className="space-y-6 pb-10">
        {activeTab === 'ai' && (
          <AISettings
            settings={settings}
            updateSetting={updateSetting}
            showAdvancedSettings={showAdvancedSettings}
            setShowAdvancedSettings={setShowAdvancedSettings}
          />
        )}
        
        {activeTab === 'notifications' && (
          <NotificationSettings
            settings={settings}
            updateSetting={updateSetting}
          />
        )}
        
        {activeTab === 'interface' && (
          <InterfaceSettings
            settings={settings}
            updateSetting={updateSetting}
            previewDarkMode={previewDarkMode}
            previewLightMode={previewLightMode}
          />
        )}
        
        {activeTab === 'advanced' && showAdvancedSettings && (
          <AdvancedSettings />
        )}
      </div>
    </MainLayout>
  );
}