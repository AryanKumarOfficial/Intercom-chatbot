'use client';

import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiUsers, FiClock, FiTrendingUp } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';

// Import the modular components
import { ReportHeader } from '@/components/reports/ReportHeader';
import { StatGrid } from '@/components/reports/StatGrid';
import { ConversationTrends } from '@/components/reports/ConversationTrends';
import { ResponseTimeDistribution } from '@/components/reports/ResponseTimeDistribution';
import { CustomerSatisfactionPanel } from '@/components/reports/CustomerSatisfactionPanel';
import { TeamPerformanceTable } from '@/components/reports/TeamPerformanceTable';
import { RecentActivityPanel } from '@/components/reports/RecentActivityPanel';

// Import types from components/reports/types.ts
import { 
  ConversationDataItem, 
  ResponseTimeItem, 
  CustomerSatisfactionItem, 
  TeamMember, 
  ActivityItem, 
  StatItem 
} from '@/components/reports/types';

// Mock data for charts - In a real app, this would come from an API
const conversationData: ConversationDataItem[] = [
  { name: 'Mon', conversations: 45, responses: 42 },
  { name: 'Tue', conversations: 52, responses: 48 },
  { name: 'Wed', conversations: 38, responses: 35 },
  { name: 'Thu', conversations: 61, responses: 58 },
  { name: 'Fri', conversations: 47, responses: 44 },
  { name: 'Sat', conversations: 33, responses: 30 },
  { name: 'Sun', conversations: 28, responses: 26 }
];

const responseTimeData: ResponseTimeItem[] = [
  { name: '< 1 min', count: 45 },
  { name: '1-5 min', count: 32 },
  { name: '5-15 min', count: 18 },
  { name: '15-30 min', count: 12 },
  { name: '> 30 min', count: 8 }
];

const customerSatisfactionData: CustomerSatisfactionItem[] = [
  { name: 'Very Satisfied', count: 156, percentage: 65 },
  { name: 'Satisfied', count: 72, percentage: 30 },
  { name: 'Neutral', count: 8, percentage: 3 },
  { name: 'Dissatisfied', count: 3, percentage: 1 },
  { name: 'Very Dissatisfied', count: 1, percentage: 1 }
];

const teamPerformanceData: TeamMember[] = [
  { name: 'Sarah Wilson', conversations: 156, avgTime: '1.8 min', satisfaction: 4.9 },
  { name: 'Mike Johnson', conversations: 142, avgTime: '2.1 min', satisfaction: 4.7 },
  { name: 'Emily Chen', conversations: 134, avgTime: '2.4 min', satisfaction: 4.8 },
  { name: 'David Brown', conversations: 128, avgTime: '2.0 min', satisfaction: 4.6 },
  { name: 'Lisa Garcia', conversations: 121, avgTime: '2.3 min', satisfaction: 4.5 }
];

const recentActivityData: ActivityItem[] = [
  {
    type: 'insight',
    message: 'Response time improved by 15% this week',
    time: '2 hours ago',
    icon: FiTrendingUp,
    color: 'green'
  },
  {
    type: 'milestone',
    message: 'Reached 1,000 conversations this month',
    time: '1 day ago',
    icon: FiMessageSquare,
    color: 'blue'
  },
  {
    type: 'alert',
    message: 'Customer satisfaction dipped below 90% yesterday',
    time: '2 days ago',
    icon: FiTrendingUp,
    color: 'yellow'
  },
  {
    type: 'achievement',
    message: 'Team achieved 95% resolution rate',
    time: '3 days ago',
    icon: FiUsers,
    color: 'purple'
  }
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'conversations' | 'responses'>('conversations');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const [hoveredSatisfactionItem, setHoveredSatisfactionItem] = useState<number | null>(null);

  // Mock API data refresh
  const refreshData = (): void => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Filter team member data when selected
  const filteredTeamMember = selectedTeamMember 
    ? teamPerformanceData.find(member => member.name === selectedTeamMember) || null
    : null;

  // Create stats data for StatGrid component
  const stats: StatItem[] = [
    {
      title: 'Total Conversations',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: FiMessageSquare,
      color: 'yellow'
    },
    {
      title: 'Active Users',
      value: '892',
      change: '+8.2%',
      trend: 'up',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Avg Response Time',
      value: '2.4 min',
      change: '-15.3%',
      trend: 'down',
      icon: FiClock,
      color: 'green'
    },
    {
      title: 'Resolution Rate',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'purple'
    }
  ];

  useEffect(() => {
    // This would fetch real data in a production app
    const loadData = async (): Promise<void> => {
      // simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    };
    
    loadData();
  }, [selectedPeriod]);

  return (
    <MainLayout>
      {/* Header section using the ReportHeader component */}
      <ReportHeader 
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        isRefreshing={isRefreshing}
        onRefresh={refreshData}
      />

      {/* Stats Grid section using the StatGrid component */}
      <StatGrid stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Conversation Trends using the ConversationTrends component */}
        <ConversationTrends 
          data={conversationData}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />

        {/* Response Time Distribution using the ResponseTimeDistribution component */}
        <ResponseTimeDistribution data={responseTimeData} />
      </div>

      {/* Customer Satisfaction & Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Satisfaction using the CustomerSatisfactionPanel component */}
        <CustomerSatisfactionPanel 
          data={customerSatisfactionData}
          hoveredItem={hoveredSatisfactionItem}
          setHoveredItem={setHoveredSatisfactionItem}
        />

        {/* Team Performance using the TeamPerformanceTable component */}
        <TeamPerformanceTable 
          data={teamPerformanceData}
          selectedTeamMember={selectedTeamMember}
          setSelectedTeamMember={setSelectedTeamMember}
          filteredTeamMember={filteredTeamMember}
        />
      </div>

      {/* Recent Activity using the RecentActivityPanel component */}
      <RecentActivityPanel data={recentActivityData} />
    </MainLayout>
  );
}
