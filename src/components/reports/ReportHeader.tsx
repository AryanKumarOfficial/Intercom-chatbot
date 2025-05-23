import React from 'react';
import { FiBarChart2, FiDownload, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/common/Button';

interface ReportHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
          <FiBarChart2 className="text-yellow-600 dark:text-yellow-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Analyze your data with interactive reports and visualizations
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-4 md:mt-0">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
        
        {/* Enhanced Export Button */}
        <div className="relative">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`
              relative overflow-hidden px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-300 ease-in-out transform
              ${isRefreshing 
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
              }
              focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800
              disabled:opacity-75 disabled:transform-none
              group
            `}
          >
            {/* Background animation for loading state */}
            {isRefreshing && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse"></div>
            )}
            
            {/* Button content */}
            <div className="relative flex items-center space-x-2">
              <div className={`
                transition-transform duration-300
                ${isRefreshing ? 'animate-spin' : 'group-hover:scale-110'}
              `}>
                {isRefreshing ? (
                  <FiRefreshCw size={16} />
                ) : (
                  <FiDownload size={16} />
                )}
              </div>
              
              <span className="font-semibold">
                {isRefreshing ? 'Exporting...' : 'Export Data'}
              </span>
            </div>
            
            {/* Shine effect on hover */}
            {!isRefreshing && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </div>
            )}
          </button>
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
              {isRefreshing ? 'Processing...' : 'Export reports as CSV'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};