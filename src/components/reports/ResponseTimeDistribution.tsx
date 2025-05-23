import React from 'react';
import { Card } from '@/components/common/Card';
import { BarChart } from '@/components/charts/BarChart';
import { FiInfo } from 'react-icons/fi';
import { ResponseTimeItem } from './types';

interface ResponseTimeDistributionProps {
  data: ResponseTimeItem[];
}

export const ResponseTimeDistribution: React.FC<ResponseTimeDistributionProps> = ({ data }) => {
  // Transform the data for the BarChart component
  const transformData = () => {
    return data.map(item => ({
      name: item.name,
      value: item.count
    }));
  };

  return (
    <Card title="Response Time Distribution">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        How quickly your team responds to customers
      </div>
      
      <div className="mb-4 flex justify-end">
        <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
          <FiInfo size={14} className="mr-1" /> Details
        </button>
      </div>
      <div className="h-80">
        <BarChart 
          data={transformData()} 
          className="w-full h-full"
          maxValue={Math.max(...data.map(item => item.count)) * 1.2}
        />
      </div>
    </Card>
  );
};