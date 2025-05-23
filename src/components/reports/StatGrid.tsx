import React from 'react';
import { Card } from '@/components/common/Card';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { StatItem } from './types';

interface StatGridProps {
  stats: StatItem[];
}

export const StatGrid: React.FC<StatGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                {stat.trend === 'up' ? (
                  <FiTrendingUp className="text-green-500 mr-1" size={16} />
                ) : (
                  <FiTrendingDown className="text-green-500 mr-1" size={16} />
                )}
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${
              stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
              stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
              stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
              'bg-purple-100 dark:bg-purple-900'
            }`}>
              <stat.icon className={`${
                stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                'text-purple-600 dark:text-purple-400'
              }`} size={20} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};