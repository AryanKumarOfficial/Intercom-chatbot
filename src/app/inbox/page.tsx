'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiPlus, FiRefreshCw, FiMessageSquare } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchBar } from '@/components/common/SearchBar';
import { FilterPanel } from '@/components/common/FilterPanel';
import { Button } from '@/components/common/Button';
import { ConversationItem, Conversation, ConversationStatus, AISuggestion } from '@/components/inbox/ConversationItem';

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    subject: 'Need help with installation',
    preview: 'I\'m having trouble installing your software on my Mac. I followed the instructions but...',
    timestamp: '10 min ago',
    status: 'open',
    isUnread: true,
    isStarred: true,
    assignee: 'Sarah Williams',
    aiSuggestion: 'reply',
    tags: ['technical', 'mac'],
  },
  {
    id: '2',
    user: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    subject: 'Billing inquiry',
    preview: 'I was charged twice for my subscription this month. Can you please check and refund the extra payment?',
    timestamp: '1 hour ago',
    status: 'pending',
    isUnread: true,
    isStarred: false,
    assignee: 'Michael Brown',
    aiSuggestion: 'escalate',
    tags: ['billing'],
  },
  {
    id: '3',
    user: {
      name: 'Robert Smith',
      email: 'robert.smith@example.com',
    },
    subject: 'Feature request',
    preview: 'I was wondering if you could add a dark mode to your application. It would be really helpful for...',
    timestamp: '3 hours ago',
    status: 'open',
    isUnread: false,
    isStarred: true,
    tags: ['feature', 'ui'],
  },
  {
    id: '4',
    user: {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
    },
    subject: 'Thank you for the quick response',
    preview: 'I just wanted to thank your team for resolving my issue so quickly. Your support team is amazing!',
    timestamp: 'Yesterday',
    status: 'resolved',
    isUnread: false,
    isStarred: false,
    assignee: 'Sarah Williams',
  },
  {
    id: '5',
    user: {
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
    },
    subject: 'Unable to login',
    preview: 'I\'ve been trying to login to my account but I keep getting an error message saying "Invalid credentials"...',
    timestamp: 'Yesterday',
    status: 'open',
    isUnread: true,
    isStarred: false,
    aiSuggestion: 'categorize',
    tags: ['account', 'login'],
  },
  {
    id: '6',
    user: {
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
    },
    subject: 'Feedback on new features',
    preview: 'I\'ve been using the new features you released last week and I have some feedback that might be helpful...',
    timestamp: '2 days ago',
    status: 'resolved',
    isUnread: false,
    isStarred: false,
    tags: ['feedback'],
  },
  {
    id: '7',
    user: {
      name: 'David Miller',
      email: 'david.miller@example.com',
    },
    subject: 'Cancellation request',
    preview: 'I would like to cancel my subscription. Can you please guide me through the process or do it from your end?',
    timestamp: '3 days ago',
    status: 'pending',
    isUnread: false,
    isStarred: false,
    assignee: 'Michael Brown',
    aiSuggestion: 'escalate',
    tags: ['subscription', 'cancellation'],
  },
];

// Filter options
const statusOptions = [
  { id: 'open', label: 'Open' },
  { id: 'pending', label: 'Pending' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'unassigned', label: 'Unassigned' },
];

const agentOptions = [
  { id: 'sarah_williams', label: 'Sarah Williams' },
  { id: 'michael_brown', label: 'Michael Brown' },
  { id: 'david_clark', label: 'David Clark' },
  { id: 'jennifer_lee', label: 'Jennifer Lee' },
];

const aiOptions = [
  { id: 'reply', label: 'Reply Suggestions' },
  { id: 'categorize', label: 'Categorization' },
  { id: 'escalate', label: 'Escalation' },
];

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter state
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedAI, setSelectedAI] = useState<string[]>([]);
  const [isAIEnabled, setIsAIEnabled] = useState(true);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedStatus, selectedAgents, selectedAI, isAIEnabled);
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Apply filters
  const applyFilters = (
    query = searchQuery,
    statuses = selectedStatus,
    agents = selectedAgents,
    aiSuggestions = selectedAI,
    aiEnabled = isAIEnabled
  ) => {
    setIsLoading(true);
    
    // Filter by search query
    let filtered = conversations;
    if (query) {
      filtered = filtered.filter(conv => 
        conv.subject.toLowerCase().includes(query.toLowerCase()) ||
        conv.preview.toLowerCase().includes(query.toLowerCase()) ||
        conv.user.name.toLowerCase().includes(query.toLowerCase()) ||
        conv.user.email.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by status
    if (statuses.length > 0) {
      filtered = filtered.filter(conv => statuses.includes(conv.status));
    }
    
    // Filter by assignee
    if (agents.length > 0) {
      filtered = filtered.filter(conv => {
        if (!conv.assignee) return false;
        return agents.some(agent => 
          conv.assignee?.toLowerCase().replace(' ', '_') === agent
        );
      });
    }
    
    // Filter by AI suggestions
    if (aiEnabled && aiSuggestions.length > 0) {
      filtered = filtered.filter(conv => 
        conv.aiSuggestion && aiSuggestions.includes(conv.aiSuggestion)
      );
    }
    
    // Simulate network delay
    setTimeout(() => {
      setFilteredConversations(filtered);
      setIsLoading(false);
    }, 500);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedStatus([]);
    setSelectedAgents([]);
    setSelectedAI([]);
    setSearchQuery('');
    applyFilters('', [], [], [], isAIEnabled);
  };

  // Simulate refreshing the inbox
  const refreshInbox = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // You could add logic here to fetch new data
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and respond to customer conversations
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            icon={FiRefreshCw} 
            onClick={refreshInbox}
            isLoading={isLoading}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={FiPlus}
          >
            New Conversation
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          onFilterToggle={toggleFilterPanel}
          isFilterOpen={isFilterOpen}
          placeholder="Search conversations..."
        />
        
        <AnimatePresence>
          {isFilterOpen && (
            <FilterPanel
              statusOptions={statusOptions}
              agentOptions={agentOptions}
              aiOptions={aiOptions}
              selectedStatus={selectedStatus}
              selectedAgents={selectedAgents}
              selectedAI={selectedAI}
              isAIEnabled={isAIEnabled}
              onStatusChange={setSelectedStatus}
              onAgentChange={setSelectedAgents}
              onAIChange={setSelectedAI}
              onAIToggle={setIsAIEnabled}
              onApplyFilters={() => applyFilters()}
              onClearFilters={clearAllFilters}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Conversations List */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversations found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hero Section - Empty State */}
      {filteredConversations.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
          <div className="bg-primary-100 dark:bg-primary-900 p-6 rounded-full mb-6 shadow-lg">
            <FiMessageSquare className="text-primary-600 dark:text-primary-400" size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Inbox</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">View and manage all your conversations in one place. Start a new chat or continue existing ones with ease.</p>
          <button className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition">Start New Conversation</button>
        </div>
      )}
    </MainLayout>
  );
}