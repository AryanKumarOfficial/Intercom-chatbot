import React from 'react';
import { Card } from '../common/Card';
import { motion } from 'framer-motion';

interface AIPerformanceIndicatorProps {
  score: number; // 0-100
  title?: string;
  className?: string;
}

export const AIPerformanceIndicator = ({
  score,
  title = 'AI Performance',
  className = '',
}: AIPerformanceIndicatorProps) => {
  // Calculate color based on score
  const getColor = () => {
    if (score >= 80) return { 
      main: '#10B981', 
      light: '#D1FAE5',
      gradient: 'from-green-500 to-emerald-600'
    }; // Green
    if (score >= 60) return { 
      main: '#F59E0B', 
      light: '#FEF3C7',
      gradient: 'from-amber-500 to-yellow-600'
    }; // Amber
    return { 
      main: '#EF4444', 
      light: '#FEE2E2',
      gradient: 'from-red-500 to-rose-600'
    }; // Red
  };

  const color = getColor();
  
  // Calculate circumference
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;

  // Performance metrics
  const metrics = [
    { name: 'Response Time', value: 'Fast', score: '1.3s' },
    { name: 'Accuracy', value: 'High', score: '87%' },
    { name: 'User Rating', value: 'Good', score: '4.2/5' },
  ];

  return (
    <Card className={`${className} p-0 overflow-hidden border-0 shadow-md`}>
      {/* Header with gradient background */}
      <div className={`bg-gradient-to-r ${color.gradient} p-4 text-white`}>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-white/80">Current performance score</p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center my-4">
          <div className="relative w-44 h-44">
            {/* Background circle */}
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Dotted background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius + 6}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="3,3"
                className="dark:opacity-10"
              />
              
              {/* Solid background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={color.light}
                strokeWidth="12"
                className="dark:opacity-20"
              />
              
              {/* Progress circle with animation */}
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#circleGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ transformOrigin: 'center', rotate: '-90deg', transform: 'rotate(-90deg)' }}
              />
              
              {/* Define gradient for progress */}
              <defs>
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={color.main} />
                  <stop offset="100%" stopColor={color.main} stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <span className="text-5xl font-bold" style={{ color: color.main }}>{score}</span>
                <span className="text-xl text-gray-400 dark:text-gray-500">%</span>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                  Performance
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Performance metrics */}
        <div className="mt-2 grid grid-cols-3 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{metric.name}</div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{metric.score}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {metric.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};