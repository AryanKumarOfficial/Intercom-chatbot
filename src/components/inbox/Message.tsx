import React, { ReactNode } from 'react';
import { FiUser, FiSmile, FiClock, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { Icon } from '../common/Icon';
import { motion } from 'framer-motion';

type MessageType = 'user' | 'agent' | 'system';
type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface MessageProps {
  content: string | ReactNode;
  sender: string;
  timestamp: string;
  type: MessageType;
  isTyping?: boolean;
  avatar?: string;
  status?: MessageStatus;
  isAI?: boolean;
}

export const Message = ({
  content,
  sender,
  timestamp,
  type,
  isTyping = false,
  avatar,
  status = 'read',
  isAI = false
}: MessageProps) => {
  const isUser = type === 'user';
  const isSystem = type === 'system';

  const statusIcons = {
    sending: FiClock,
    sent: FiCheck,
    delivered: FiCheck,
    read: FiCheckCircle,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAI ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <Icon 
              icon={isAI ? FiSmile : FiUser} 
              className={`${isAI ? 'text-purple-600 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300'}`} 
            />
          </div>
        </div>
      )}
      
      <div className={`max-w-[75%]`}>
        {!isUser && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {isAI ? 'AI Assistant' : sender}
          </div>
        )}
        
        <div className={`relative p-3 rounded-2xl ${
          isUser 
            ? 'bg-primary-600 text-white rounded-tr-none dark:bg-primary-700' 
            : isAI 
              ? 'bg-purple-50 text-gray-800 rounded-tl-none dark:bg-purple-900/30 dark:text-gray-100'
              : 'bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-800 dark:text-gray-100'
        }`}>
          <div className="whitespace-pre-wrap">{content}</div>
          <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
            isUser ? 'text-primary-100 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'
          }`}>
            <span>{timestamp}</span>
            {isUser && (
              <Icon 
                icon={statusIcons[status]} 
                className={`ml-1 ${status === 'read' ? 'text-blue-400' : ''}`} 
              />
            )}
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {sender.split(' ').map(name => name[0]).join('')}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};