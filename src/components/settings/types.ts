import { IconType } from 'react-icons';

export interface SettingsState {
  // AI Settings
  enableAI: boolean;
  autoSuggestions: boolean;
  autoCategories: boolean;
  sentimentAnalysis: boolean;
  prioritySuggestions: boolean;
  autoReplies: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  desktopNotifications: boolean;
  soundAlerts: boolean;
  newConversationAlerts: boolean;
  mentionAlerts: boolean;
  assignmentAlerts: boolean;
  
  // UI Settings
  compactMode: boolean;
  darkMode: boolean;
  showAvatars: boolean;
  showTimestamps: boolean;
}

export type SettingKey = keyof SettingsState;

export interface TabProps {
  id: string;
  label: string;
  icon: IconType;
}