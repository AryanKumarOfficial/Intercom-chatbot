import React from 'react';
import { Card } from '@/components/common/Card';
import { TeamMember } from './types';

interface TeamPerformanceTableProps {
  data: TeamMember[];
  selectedTeamMember: string | null;
  setSelectedTeamMember: (name: string | null) => void;
  filteredTeamMember: TeamMember | null;
}

export const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({
  data,
  selectedTeamMember,
  setSelectedTeamMember,
  filteredTeamMember
}) => {
  return (
    <Card title="Team Performance">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Individual agent statistics
      </div>
      
      <div className="space-y-4">
        {filteredTeamMember ? (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {filteredTeamMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-lg text-gray-900 dark:text-white">{filteredTeamMember.name}</span>
              </div>
              <button 
                onClick={() => setSelectedTeamMember(null)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Back to team
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400">Conversations</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{filteredTeamMember.conversations}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{filteredTeamMember.avgTime}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400">Satisfaction Score</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{filteredTeamMember.satisfaction}/5.0</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Performance Metrics</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Resolution Rate</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>First Response Time</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>AI Assistance Usage</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          data.map((agent, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedTeamMember(agent.name)}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{agent.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{agent.conversations}</p>
                  <p className="text-gray-500 dark:text-gray-400">Conversations</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{agent.avgTime}</p>
                  <p className="text-gray-500 dark:text-gray-400">Avg Time</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{agent.satisfaction}</p>
                  <p className="text-gray-500 dark:text-gray-400">Rating</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};