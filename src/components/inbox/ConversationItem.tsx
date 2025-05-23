import React from 'react';
import Link from 'next/link';
import { FiBell, FiStar, FiClock, FiCheckCircle, FiClock as FiPending } from 'react-icons/fi';
import { Icon } from '../common/Icon';

export type ConversationStatus = 'open' | 'pending' | 'resolved';
export type AISuggestion = 'reply' | 'categorize' | 'escalate';

export interface Conversation {
  id: string;
  user: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  timestamp: string;
  status: ConversationStatus;
  isUnread?: boolean;
  isStarred?: boolean;
  assignee?: string;
  aiSuggestion?: AISuggestion;
  tags?: string[];
}

interface ConversationItemProps {
  conversation: Conversation;
}

// Original interface for backward compatibility
interface LegacyConversationItemProps {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  isActive?: boolean;
  isPriority?: boolean;
  isNew?: boolean;
  avatar?: string;
}

// Union type to accept either new or legacy props
type ConversationProps = ConversationItemProps | LegacyConversationItemProps;

export const ConversationItem = (props: ConversationProps) => {
  // Check if we're using the new conversation object format
  if ('conversation' in props) {
    const { conversation } = props;
    return (
      <Link href={`/inbox/${conversation.id}`} passHref>
        <div
          className={`
            relative px-4 py-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer
            ${conversation.isUnread ? 'bg-primary-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
            transition-all duration-200 hover:translate-x-1
          `}
        >
          {/* Priority indicator */}
          {conversation.isStarred && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
          )}
          
          <div className="flex items-center">
            {/* Avatar */}
            <div className="flex-shrink-0 mr-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-2 border-white dark:border-gray-700">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {conversation.user.name.charAt(0)}
                  </span>
                </div>
                
                {/* Status indicators */}
                {conversation.isStarred && (
                  <div className="absolute -right-1 -top-1 bg-amber-500 rounded-full p-1 shadow-sm border border-white dark:border-gray-800">
                    <Icon icon={FiStar} className="text-white text-xs" />
                  </div>
                )}
                
                {conversation.aiSuggestion && (
                  <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-1 shadow-sm border border-white dark:border-gray-800">
                    <Icon icon={FiBell} className="text-white text-xs" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-medium truncate ${conversation.isUnread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {conversation.user.name}
                </h4>
                <div className="flex items-center space-x-1">
                  <Icon icon={FiClock} className="text-gray-400 text-xs" />
                  <span className="text-xs text-gray-400 dark:text-gray-500">{conversation.timestamp}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 mt-1">
                {conversation.subject}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                {conversation.preview}
              </p>
            </div>
            
            {/* Status indicator */}
            <div className="ml-3 flex-shrink-0">
              {conversation.isUnread && (
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500 text-xs font-medium text-white shadow-sm">
                  New
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Legacy component usage (for backward compatibility)
  const { id, contactName, lastMessage, timestamp, unread = 0, isActive = false, isPriority = false, isNew = false, avatar } = props;
  
  return (
    <Link href={`/inbox/${id}`} passHref>
      <div
        className={`
          relative px-4 py-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer
          ${isActive ? 'bg-primary-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          transition-all duration-200 hover:translate-x-1
        `}
      >
        {/* Priority indicator */}
        {isPriority && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
        )}
        
        <div className="flex items-center">
          {/* Avatar */}
          <div className="flex-shrink-0 mr-3">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt={contactName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 to-gray-600 flex items-center justify-center border-2 border-white dark:border-gray-700">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {contactName.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Status indicators */}
              {isPriority && (
                <div className="absolute -right-1 -top-1 bg-amber-500 rounded-full p-1 shadow-sm border border-white dark:border-gray-800">
                  <Icon icon={FiStar} className="text-white text-xs" />
                </div>
              )}
              
              {isNew && (
                <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-1 shadow-sm border border-white dark:border-gray-800">
                  <Icon icon={FiBell} className="text-white text-xs" />
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium truncate ${unread > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {contactName}
              </h4>
              <div className="flex items-center space-x-1">
                <Icon icon={FiClock} className="text-gray-400 text-xs" />
                <span className="text-xs text-gray-400 dark:text-gray-500">{timestamp}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
              {lastMessage}
            </p>
          </div>
          
          {/* Unread indicator */}
          {unread > 0 && (
            <div className="ml-3 flex-shrink-0">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-500 text-xs font-medium text-white shadow-sm">
                {unread > 9 ? '9+' : unread}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};