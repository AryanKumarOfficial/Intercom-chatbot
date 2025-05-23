import React from 'react';
import { FiCpu, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { Card } from '@/components/common/Card';
import * as Switch from '@radix-ui/react-switch';
import { SettingsState, SettingKey } from './types';

interface AISettingsProps {
  settings: SettingsState;
  updateSetting: (key: SettingKey, value: boolean) => void;
  showAdvancedSettings: boolean;
  setShowAdvancedSettings: (show: boolean) => void;
}

export const AISettings: React.FC<AISettingsProps> = ({ 
  settings, 
  updateSetting,
  showAdvancedSettings,
  setShowAdvancedSettings
}) => {
  return (
    <Card 
      title="AI Feature Settings" 
      icon={FiCpu}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">AI features are enabled</h3>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                Your workspace is using AI to help categorize conversations, suggest responses, and analyze sentiment.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable AI features</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Master switch for all AI capabilities</p>
          </div>
          <Switch.Root
            checked={settings.enableAI}
            onCheckedChange={(checked) => updateSetting('enableAI', checked)}
            className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Response suggestions</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Suggest replies based on conversation context</p>
          </div>
          <Switch.Root
            checked={settings.autoSuggestions}
            onCheckedChange={(checked) => updateSetting('autoSuggestions', checked)}
            disabled={!settings.enableAI}
            className={`w-10 h-5 rounded-full relative outline-none cursor-pointer ${
              settings.enableAI ? 'bg-gray-300 data-[state=checked]:bg-blue-600' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] ${
              !settings.enableAI && 'opacity-60'
            }`} />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Auto-categorization</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically categorize conversations</p>
          </div>
          <Switch.Root
            checked={settings.autoCategories}
            onCheckedChange={(checked) => updateSetting('autoCategories', checked)}
            disabled={!settings.enableAI}
            className={`w-10 h-5 rounded-full relative outline-none cursor-pointer ${
              settings.enableAI ? 'bg-gray-300 data-[state=checked]:bg-blue-600' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] ${
              !settings.enableAI && 'opacity-60'
            }`} />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Sentiment analysis</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Detect customer sentiment in conversations</p>
          </div>
          <Switch.Root
            checked={settings.sentimentAnalysis}
            onCheckedChange={(checked) => updateSetting('sentimentAnalysis', checked)}
            disabled={!settings.enableAI}
            className={`w-10 h-5 rounded-full relative outline-none cursor-pointer ${
              settings.enableAI ? 'bg-gray-300 data-[state=checked]:bg-blue-600' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] ${
              !settings.enableAI && 'opacity-60'
            }`} />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Priority detection</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Flag high priority conversations</p>
          </div>
          <Switch.Root
            checked={settings.prioritySuggestions}
            onCheckedChange={(checked) => updateSetting('prioritySuggestions', checked)}
            disabled={!settings.enableAI}
            className={`w-10 h-5 rounded-full relative outline-none cursor-pointer ${
              settings.enableAI ? 'bg-gray-300 data-[state=checked]:bg-blue-600' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] ${
              !settings.enableAI && 'opacity-60'
            }`} />
          </Switch.Root>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Auto-replies</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically reply to common questions</p>
          </div>
          <Switch.Root
            checked={settings.autoReplies}
            onCheckedChange={(checked) => updateSetting('autoReplies', checked)}
            disabled={!settings.enableAI}
            className={`w-10 h-5 rounded-full relative outline-none cursor-pointer ${
              settings.enableAI ? 'bg-gray-300 data-[state=checked]:bg-blue-600' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] ${
              !settings.enableAI && 'opacity-60'
            }`} />
          </Switch.Root>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
            <FiCpu size={20} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Advanced AI settings</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Configure training, models, and other advanced AI settings.
            </p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => {
                setShowAdvancedSettings(!showAdvancedSettings);
                if (!showAdvancedSettings) {
                  setTimeout(() => document.getElementById('advanced-tab')?.click(), 100);
                }
              }}
              className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/50"
            >
              {showAdvancedSettings ? 'Hide Advanced' : 'Show Advanced'}
            </button>
          </div>
        </div>
      </div>
      
      {!settings.enableAI && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">AI features disabled</h3>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                Enable AI features to improve your workflow with automated suggestions and insights.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};