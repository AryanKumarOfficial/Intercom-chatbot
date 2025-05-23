import React from 'react';
import { Card } from '@/components/common/Card';
import { LineChart } from '@/components/charts/LineChart';
import { ResponseTimeItem } from './types';

interface ResponseTimeChartProps {
  data: ResponseTimeItem[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export const ResponseTimeChart: React.FC<ResponseTimeChartProps> = ({
  data,
  period,
  onPeriodChange
}) => {
  const periodOptions = ['Daily', 'Weekly', 'Monthly'];

  return (
    <Card title="Response Time Distribution">
      <div className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Time to first response and resolution
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Average response time: <span className="font-medium text-gray-900 dark:text-white">2.5 min</span>
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            {periodOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onPeriodChange(option)}
                className={`
                  px-4 py-2 text-sm font-medium 
                  ${period === option 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                  ${option === periodOptions[0] ? 'rounded-l-md' : ''}
                  ${option === periodOptions[periodOptions.length - 1] ? 'rounded-r-md' : ''}
                  border border-gray-300 dark:border-gray-600
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <LineChart 
            data={data.map(item => ({
              x: item.name,
              y: item.count
            }))}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Response Time</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resolution</span>
          </div>
          <div className="text-right">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View detailed breakdown
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Under 1 min
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {Math.round((data.find(item => item.name === '< 1 min')?.count || 0) / data.reduce((sum, item) => sum + item.count, 0) * 100)}%
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              1-15 min
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {Math.round(((data.find(item => item.name === '1-5 min')?.count || 0) + (data.find(item => item.name === '5-15 min')?.count || 0)) / data.reduce((sum, item) => sum + item.count, 0) * 100)}%
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              15+ min
            </div>
            <div className="mt-1 text-2xl font-semibold text-orange-600 dark:text-orange-400">
              {Math.round(((data.find(item => item.name === '15-30 min')?.count || 0) + (data.find(item => item.name === '> 30 min')?.count || 0)) / data.reduce((sum, item) => sum + item.count, 0) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};