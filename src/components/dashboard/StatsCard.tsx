import React from 'react';
import { IconType } from 'react-icons';
import { Icon } from '../common/Icon';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: IconType;
  subtitle?: string;
  accentColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'teal';
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  subtitle,
  accentColor = 'primary',
}: StatsCardProps) => {
  const colorClasses = {
    primary: {
      bg: 'bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700',
      text: 'text-white',
      lightBg: 'bg-primary-50 dark:bg-primary-900/30',
      lightText: 'text-primary-600 dark:text-primary-400',
      shadow: 'shadow-primary-500/20',
    },
    success: {
      bg: 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700',
      text: 'text-white',
      lightBg: 'bg-green-50 dark:bg-green-900/30',
      lightText: 'text-green-600 dark:text-green-400',
      shadow: 'shadow-green-500/20',
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700',
      text: 'text-white',
      lightBg: 'bg-amber-50 dark:bg-amber-900/30',
      lightText: 'text-amber-600 dark:text-amber-400',
      shadow: 'shadow-amber-500/20',
    },
    danger: {
      bg: 'bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700',
      text: 'text-white',
      lightBg: 'bg-red-50 dark:bg-red-900/30',
      lightText: 'text-red-600 dark:text-red-400',
      shadow: 'shadow-red-500/20',
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700',
      text: 'text-white',
      lightBg: 'bg-blue-50 dark:bg-blue-900/30',
      lightText: 'text-blue-600 dark:text-blue-400',
      shadow: 'shadow-blue-500/20',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700',
      text: 'text-white',
      lightBg: 'bg-purple-50 dark:bg-purple-900/30',
      lightText: 'text-purple-600 dark:text-purple-400',
      shadow: 'shadow-purple-500/20',
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700',
      text: 'text-white',
      lightBg: 'bg-teal-50 dark:bg-teal-900/30',
      lightText: 'text-teal-600 dark:text-teal-400',
      shadow: 'shadow-teal-500/20',
    },
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200 relative overflow-hidden ${colorClasses[accentColor].shadow}`}
    >
      {/* Background accent decoration */}
      <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full opacity-10 bg-current" 
        style={{ color: `var(--${accentColor}-color, currentColor)` }}
      />
      
      <div className="flex items-start justify-between">
        <div className="relative z-10">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <div className="flex items-baseline">
            <h3 className={`text-2xl font-bold text-gray-900 dark:text-white`}>{value}</h3>
            {change && (
              <span className={`ml-2 text-sm font-medium ${
                change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div className={`relative z-10 p-3 rounded-full ${colorClasses[accentColor].bg} shadow-md transform transition-transform duration-200 hover:scale-110`}>
          <Icon icon={icon} className={`${colorClasses[accentColor].text} text-xl`} />
        </div>
      </div>
      
      {/* Subtle indicator line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses[accentColor].bg} opacity-80`}></div>
    </div>
  );
};