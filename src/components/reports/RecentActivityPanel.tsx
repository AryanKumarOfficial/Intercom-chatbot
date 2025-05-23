import React from 'react';
import { Card } from '@/components/common/Card';
import { ActivityItem } from './types';

interface RecentActivityPanelProps {
  data: ActivityItem[];
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({ data }) => {
  return (
    <Card title="Recent Activity">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Latest analytics events and insights
      </div>
      
      <div className="space-y-4">
        {data.map((activity, index) => (
          <div key={index} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className={`p-2 rounded-full mr-4 ${
              activity.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
              activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
              activity.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
              'bg-purple-100 dark:bg-purple-900'
            }`}>
              <activity.icon className={`${
                activity.color === 'green' ? 'text-green-600 dark:text-green-400' :
                activity.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                activity.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-purple-600 dark:text-purple-400'
              }`} size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};