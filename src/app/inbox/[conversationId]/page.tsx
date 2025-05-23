'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSend, FiPaperclip, FiUser, FiClock, FiTag, FiStar, FiMoreVertical } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Message } from '@/components/inbox/Message';
import { AISuggestionPanel } from '@/components/inbox/AISuggestionPanel';

// Types
type MessageData = {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
    type: 'user' | 'agent' | 'system';
};

type Suggestion = {
    id: string;
    content: string;
    type: 'simple' | 'detailed' | 'question';
};

// Mock conversation data
const conversationData = {
    '1': {
        id: '1',
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        subject: 'Need help with installation',
        status: 'open',
        assignee: 'Sarah Williams',
        tags: ['technical', 'mac'],
        messages: [
            {
                id: 'm1',
                content: 'Hi there, I\'m having trouble installing your software on my Mac. I\'ve followed the instructions on your website but it\'s giving me an error when I try to open the application.',
                sender: 'John Doe',
                timestamp: '2 days ago',
                type: 'user' as const,
            },
            {
                id: 'm2',
                content: 'Hello John, I\'m sorry you\'re having issues with the installation. Could you let me know which version of macOS you\'re using and what error message you\'re seeing?',
                sender: 'Sarah Williams',
                timestamp: '2 days ago',
                type: 'agent' as const,
            },
            {
                id: 'm3',
                content: 'I\'m using macOS Monterey (12.3) and the error says "The application cannot be opened because the developer cannot be verified."',
                sender: 'John Doe',
                timestamp: '1 day ago',
                type: 'user' as const,
            },
            {
                id: 'm4',
                content: 'Sarah has been assigned to this conversation',
                sender: 'System',
                timestamp: '1 day ago',
                type: 'system' as const,
            },
        ],
    },
    '2': {
        id: '2',
        user: {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
        },
        subject: 'Billing inquiry',
        status: 'pending',
        assignee: 'Michael Brown',
        tags: ['billing'],
        messages: [
            {
                id: 'm1',
                content: 'Hello, I was charged twice for my subscription this month. Can you please check and refund the extra payment?',
                sender: 'Alice Johnson',
                timestamp: '1 day ago',
                type: 'user' as const,
            },
            {
                id: 'm2',
                content: 'Hi Alice, I\'m sorry to hear about the double charge. Let me look into this for you right away.',
                sender: 'Michael Brown',
                timestamp: '1 day ago',
                type: 'agent' as const,
            },
        ],
    },
};

// Mock AI suggestions
const mockSuggestions: Suggestion[] = [
    {
        id: 's1',
        content: 'I understand you\'re having trouble with verifying the developer. This is a common security feature in macOS. You can resolve this by going to System Preferences > Security & Privacy, and clicking "Open Anyway" next to the message about our application being blocked.',
        type: 'detailed',
    },
    {
        id: 's2',
        content: 'Have you tried right-clicking the application and selecting "Open" from the context menu? This often bypasses the security warning on macOS.',
        type: 'question',
    },
    {
        id: 's3',
        content: 'I can help you resolve this security warning. It\'s a standard macOS protection feature.',
        type: 'simple',
    },
];

export default function ConversationPage() {
    const params = useParams();
    const router = useRouter();
    const conversationId = params.conversationId as string;
    const conversation = conversationData[conversationId as keyof typeof conversationData];

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (conversation) {
            setMessages(conversation.messages);
            simulateLoadingSuggestions();
        }
    }, [conversation]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: MessageData = {
            id: `m${messages.length + 1}`,
            content: message,
            sender: 'Sarah Williams',
            timestamp: 'Just now',
            type: 'agent',
        };

        setMessages([...messages, newMessage]);
        setMessage('');
        simulateUserResponse();
    };

    const simulateUserResponse = () => {
        // Simulate user typing indicator after a delay
        setTimeout(() => {
            setIsTyping(true);

            // Simulate user response after a while
            setTimeout(() => {
                setIsTyping(false);
                const userReply: MessageData = {
                    id: `m${messages.length + 2}`,
                    content: 'Thanks for the solution! I\'ll try that right away and let you know if it works.',
                    sender: 'John Doe',
                    timestamp: 'Just now',
                    type: 'user',
                };
                setMessages(prev => [...prev, userReply]);

                // Generate new suggestions after user response
                simulateLoadingSuggestions();
            }, 3000);
        }, 1000);
    };

    const simulateLoadingSuggestions = () => {
        setIsLoadingSuggestions(true);
        setTimeout(() => {
            setSuggestions(mockSuggestions);
            setIsLoadingSuggestions(false);
        }, 1500);
    };

    const handleSuggestionSelect = (suggestion: Suggestion) => {
        setMessage(suggestion.content);
    };

    const handleRegenerateSuggestions = () => {
        simulateLoadingSuggestions();
    };

    if (!conversation) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-lg font-medium mb-2">Conversation not found</h2>
                    <p className="text-gray-500 mb-4">The conversation you're looking for doesn't exist or has been removed.</p>
                    <Button 
                        variant="primary" 
                        icon={FiArrowLeft} 
                        onClick={() => router.push('/inbox')}
                    >
                        Back to Inbox
                    </Button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                    <Button 
                        variant="ghost" 
                        icon={FiArrowLeft} 
                        size="md"
                        onClick={() => router.push('/inbox')}
                        className="mr-2"
                    >
                        Back
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{conversation.subject}</h1>
                        <div className="flex items-center mt-1">
                            <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-medium mr-1">
                                {conversation.user.name.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{conversation.user.name}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{conversation.user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        icon={FiTag}
                        onClick={() => { }}
                    >
                        Add Tag
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        icon={FiStar}
                        onClick={() => { }}
                    >
                        Star
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {}}
                        className="text-gray-400 hover:text-gray-600"
                        icon={FiMoreVertical}
                    >
                        <span className="sr-only">More options</span>
                    </Button>
                </div>
            </div>

            {/* Conversation details and messages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Messages thread */}
                <div className="lg:col-span-2">
                    <Card className="bg-white dark:bg-gray-900 p-0 h-[70vh] flex flex-col">
                        {/* Conversation info */}
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                                </span>

                                {conversation.assignee && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                        <Icon icon={FiUser} className="mr-1" size="sm" />
                                        {conversation.assignee}
                                    </span>
                                )}

                                {conversation.tags?.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Messages container */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <Message
                                        key={msg.id}
                                        content={msg.content}
                                        sender={msg.sender}
                                        timestamp={msg.timestamp}
                                        type={msg.type}
                                    />
                                ))}
                                {isTyping && (
                                    <Message
                                        content=""
                                        type="user"
                                        isTyping={true}
                                        sender="Sarah Williams"
                                        timestamp="Just now"
                                    />
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message input */}
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-end">
                                <div className="flex-1 relative">
                                    <textarea
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                                        placeholder="Type your message..."
                                    />
                                    <button
                                        className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-gray-500"
                                        onClick={() => { }}
                                    >
                                        <Icon icon={FiPaperclip} aria-label="Attach file" />
                                    </button>
                                </div>
                                <Button
                                    variant="primary"
                                    icon={FiSend}
                                    className="ml-2"
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* AI Suggestions Panel */}
                <div className="lg:col-span-1">
                    <AISuggestionPanel
                        isLoading={isLoadingSuggestions}
                        suggestions={suggestions}
                        onSuggestionSelect={handleSuggestionSelect}
                        onRegenerateSuggestions={handleRegenerateSuggestions}
                        className="sticky top-4"
                    />
                </div>
            </div>
        </MainLayout>
    );
}