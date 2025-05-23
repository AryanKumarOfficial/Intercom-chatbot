import React from 'react';
import { Card } from '@/components/common/Card';
import { LineChart } from '@/components/charts/LineChart';
import { FiInfo } from 'react-icons/fi';
import { ConversationDataItem } from './types';

interface ConversationTrendsProps {
  data: ConversationDataItem[];
  selectedMetric: 'conversations' | 'responses';
  setSelectedMetric: (metric: 'conversations' | 'responses') => void;
}

export const ConversationTrends: React.FC<ConversationTrendsProps> = ({
  data,
  selectedMetric,
  setSelectedMetric
}) => {
  // Transform the data for the LineChart component
  const transformData = () => {
    return data.map(item => ({
      x: item.name,
      y: selectedMetric === 'conversations' ? item.conversations : item.responses,
    }));
  };

  return (
    <Card title="Conversation Trends">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Daily conversation volume and response rates
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('conversations')}
            className={`text-xs px-2 py-1 rounded-md ${
              selectedMetric === 'conversations' 
              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Conversations
          </button>
          <button
            onClick={() => setSelectedMetric('responses')}
            className={`text-xs px-2 py-1 rounded-md ${
              selectedMetric === 'responses' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Responses
          </button>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
          <FiInfo size={14} className="mr-1" /> Details
        </button>
      </div>
      <div className="h-80">
        <LineChart 
          data={transformData()} 
          strokeColor={selectedMetric === 'conversations' ? '#EAB308' : '#3B82F6'}
          fillColor={selectedMetric === 'conversations' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(59, 130, 246, 0.1)'}
          title={selectedMetric === 'conversations' ? 'Conversation Volume' : 'Response Volume'}
        />
      </div>
    </Card>
  );
};