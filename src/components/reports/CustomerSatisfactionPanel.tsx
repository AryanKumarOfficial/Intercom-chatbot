import React from 'react';
import { Card } from '@/components/common/Card';
import { CustomerSatisfactionItem } from './types';

interface CustomerSatisfactionPanelProps {
  data: CustomerSatisfactionItem[];
  hoveredItem: number | null;
  setHoveredItem: (index: number | null) => void;
}

export const CustomerSatisfactionPanel: React.FC<CustomerSatisfactionPanelProps> = ({
  data,
  hoveredItem,
  setHoveredItem
}) => {
  return (
    <Card title="Customer Satisfaction">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Based on post-conversation surveys
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between py-2 px-2 rounded-lg transition-colors duration-200 ${
              hoveredItem === index ? 'bg-gray-50 dark:bg-gray-800' : ''
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                index === 0 ? 'bg-green-500' :
                index === 1 ? 'bg-blue-500' :
                index === 2 ? 'bg-yellow-500' :
                index === 3 ? 'bg-orange-500' :
                'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">{item.count}</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ 
                    width: `${item.percentage}%`,
                    transition: 'width 0.5s ease-in-out'
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2 min-w-[40px] text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};