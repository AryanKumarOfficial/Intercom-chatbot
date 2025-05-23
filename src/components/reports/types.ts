import { IconType } from 'react-icons';

export interface ReportDataPoint {
  date: string;
  value: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  target?: number;
}

export interface ConversationMetric {
  name: string;
  value: number;
  change: number;
}

export interface AgentPerformance {
  name: string;
  avatar: string;
  responseTime: number;
  satisfaction: number;
  resolution: number;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ChannelData {
  name: string;
  value: number;
}

export interface TimeRangeOption {
  label: string;
  value: string;
}

export interface ConversationDataItem {
  name: string;
  conversations: number;
  responses: number;
}

export interface ResponseTimeItem {
  name: string;
  count: number;
}

export interface CustomerSatisfactionItem {
  name: string;
  count: number;
  percentage: number;
}

export interface TeamMember {
  name: string;
  conversations: number;
  avgTime: string;
  satisfaction: number;
}

export interface ActivityItem {
  type: 'insight' | 'milestone' | 'alert' | 'achievement';
  message: string;
  time: string;
  icon: IconType;
  color: 'green' | 'blue' | 'yellow' | 'purple';
}

export interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: IconType;
  color: 'yellow' | 'blue' | 'green' | 'purple';
}