import React from 'react';
import { Card } from '@/components/common/Card';
import { BarChart } from '@/components/charts/BarChart';
import { ConversationDataItem } from './types';

interface ConversationChartProps {
  data: ConversationDataItem[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const ConversationChart: React.FC<ConversationChartProps> = ({ 
  data, 
  timeRange, 
  onTimeRangeChange 
}) => {
  const timeRangeOptions = ['24h', '7d', '30d', '90d'];

  return (
    <Card title="Conversation Trends">
      <div className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Volume and response rates
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} conversations in the selected period
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            {timeRangeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onTimeRangeChange(option)}
                className={`
                  px-4 py-2 text-sm font-medium 
                  ${timeRange === option 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                  ${option === timeRangeOptions[0] ? 'rounded-l-md' : ''}
                  ${option === timeRangeOptions[timeRangeOptions.length - 1] ? 'rounded-r-md' : ''}
                  border border-gray-300 dark:border-gray-600
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <BarChart 
            data={data.map(item => ({
              name: item.name,
              value: item.conversations,
            }))} 
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Conversations
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {data.reduce((sum, item) => sum + item.conversations, 0)}
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Response Rate
            </div>
            <div className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-400">
              {Math.round(
                (data.reduce((sum, item) => sum + item.responses, 0) / 
                data.reduce((sum, item) => sum + item.conversations, 0)) * 100
              )}%
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Response Time
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              2.4 min
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};