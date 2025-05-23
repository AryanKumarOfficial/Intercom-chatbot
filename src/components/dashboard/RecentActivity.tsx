import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPlusCircle, FiEdit, FiAlertCircle, FiClock } from 'react-icons/fi';
import { Icon } from '../common/Icon';

type Activity = {
  user: string;
  action: string;
  target: string;
  time: string;
};

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

export const RecentActivity = ({ activities, className = '' }: RecentActivityProps) => {
  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Helper to determine icon by action
  const getActionIcon = (action: string) => {
    switch(action.toLowerCase()) {
      case 'resolved':
        return { icon: FiCheckCircle, color: 'text-green-500 dark:text-green-400' };
      case 'assigned':
        return { icon: FiEdit, color: 'text-blue-500 dark:text-blue-400' };
      case 'added':
        return { icon: FiPlusCircle, color: 'text-purple-500 dark:text-purple-400' };
      default:
        return { icon: FiAlertCircle, color: 'text-amber-500 dark:text-amber-400' };
    }
  };
  
  // Generate avatar gradient based on name
  const getAvatarGradient = (name: string) => {
    const colors = [
      'from-pink-500 to-purple-500',
      'from-blue-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-blue-500',
    ];
    
    // Simple hash function to determine color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`space-y-4 ${className}`}
    >
      {activities.map((activity, index) => {
        const actionInfo = getActionIcon(activity.action);
        const avatarGradient = getAvatarGradient(activity.user);
        const initials = activity.user.split(' ').map(name => name[0]).join('');
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start space-x-3 p-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
          >
            {/* User avatar */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center shadow-sm`}>
              <span className="text-xs font-medium text-white">{initials}</span>
            </div>
            
            {/* Activity content */}
            <div className="flex-grow">
              <div className="flex items-center">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>{' '}
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    {activity.target}
                  </span>
                </p>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Icon icon={FiClock} className="mr-1" />
                {activity.time}
              </div>
            </div>
            
            {/* Action indicator */}
            <div className={`flex-shrink-0 p-1.5 rounded-full ${actionInfo.color.replace('text-', 'bg-').replace('500', '100').replace('400', '900/30')}`}>
              <Icon icon={actionInfo.icon} className={`${actionInfo.color} text-sm`} />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};