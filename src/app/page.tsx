'use client';

import React, { useEffect, useState } from 'react';
import { 
  FiUsers, 
  FiMessageSquare, 
  FiActivity, 
  FiClock, 
  FiArrowRight, 
  FiTrendingUp
} from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { AIPerformanceIndicator } from '@/components/dashboard/AIPerformanceIndicator';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export default function Dashboard() {
  // Using exact data values from the screenshot
  const weeklyConversationData = [45, 68, 93, 78, 110, 82, 97];
  
  // Days of the week labels from the screenshot
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Sample data for user engagement line chart
  const lineData = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 55 },
    { x: 3, y: 60 },
    { x: 4, y: 75 },
    { x: 5, y: 68 },
    { x: 6, y: 85 },
  ];
  
  // Sample activities
  const activities = [
    {
      user: "Jane Smith",
      action: "resolved",
      target: "ticket #4392",
      time: "10 minutes ago"
    },
    {
      user: "Michael Johnson",
      action: "assigned",
      target: "3 new conversations",
      time: "1 hour ago"
    },
    {
      user: "Sarah Williams",
      action: "added",
      target: "new automation rule",
      time: "3 hours ago"
    }
  ];

  return (
    <MainLayout>
      {/* Enhanced Header Section */}
      <div className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your support inbox today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="primary" 
              size="sm" 
              icon={FiArrowRight}
              iconPosition="right"
              className="shadow-md"
            >
              View Activity Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Total Conversations"
          value="1,284"
          change={{
            value: 12,
            isPositive: true
          }}
          icon={FiMessageSquare}
          accentColor="primary"
        />
        <StatsCard
          title="Active Users"
          value="3,945"
          change={{
            value: 8,
            isPositive: true
          }}
          icon={FiUsers}
          accentColor="success"
        />
        <StatsCard
          title="Resolution Rate"
          value="92%"
          change={{
            value: 3,
            isPositive: true
          }}
          icon={FiActivity}
          accentColor="info"
        />
        <StatsCard
          title="Avg. Response Time"
          value="2h 14m"
          change={{
            value: 5,
            isPositive: false
          }}
          icon={FiClock}
          accentColor="warning"
        />
      </div>

      {/* Charts with enhanced styling */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
        <Card 
          title="Weekly Conversations" 
          className="lg:col-span-3 border-t-4 border-t-primary-500 overflow-visible"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-300">Last 7 days</span>
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-1">
              <span className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium mr-2">
                <FiTrendingUp className="mr-1" /> +12%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">vs last week</span>
            </div>
          </div>
          
          {/* Chart container with improved structure */}
          <div className="h-[250px] w-full">
            <BarChart 
              data={weeklyConversationData}
              height={220}
              labels={weekdays}
              barWidth={30}
              barGap={16}
              darkMode={true}
              showValues={true}
              color="#6366f1"
            />
          </div>
        </Card>
        
        <Card 
          title="User Engagement" 
          className="lg:col-span-4 border-t-4 border-t-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</span>
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-1">
              <span className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                <FiTrendingUp className="mr-1" /> +24%
              </span>
            </div>
          </div>
          <div className="w-full">
            <LineChart data={lineData} height={220} title="User Activity" />
          </div>
        </Card>
      </div>

      {/* AI Performance and Recent Activity with enhanced styling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AIPerformanceIndicator score={87} title="AI Performance" />
          
          <Card
            className="bg-gradient-to-br from-indigo-600 to-blue-500 border-0 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">AI Insights</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-white text-lg mb-2">This week summary</h4>
                <p className="text-white/90 text-sm">
                  AI handled <span className="font-bold">76%</span> of incoming requests without human 
                  intervention, reducing agent workload by approximately <span className="font-bold">15 hours</span>.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="text-white hover:bg-white/20 border border-white/30 rounded-lg px-4 py-2"
                >
                  Train AI
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Recent Activity" className="h-full">
            <RecentActivity activities={activities} />
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary-600 dark:text-primary-400 font-medium"
                icon={FiArrowRight}
                iconPosition="right"
              >
                View all activity
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
