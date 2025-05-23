'use client';

import React, { useState, useMemo } from 'react';
import {
    FiUsers, FiPlus, FiSearch, FiFilter, FiEdit3, FiTrash2, FiMail,
    FiPhone, FiMapPin, FiStar, FiMoreVertical, FiDownload, FiUpload,
    FiGrid, FiList, FiEye, FiMessageSquare, FiCalendar, FiTrendingUp,
    FiUser, FiHome, FiTag, FiClock
} from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/common/Button';
import { SearchBar } from '@/components/common/SearchBar';

// Enhanced contact interface
interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    location: string;
    avatar: string;
    isStarred: boolean;
    lastContact: string;
    status: 'active' | 'inactive' | 'pending';
    tags: string[];
    notes?: string;
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
    };
    interactions: number;
    addedDate: string;
}

// Enhanced mock contact data
const mockContacts: Contact[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Tech Corp',
        role: 'Senior Developer',
        location: 'New York, USA',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        isStarred: true,
        lastContact: '2 days ago',
        status: 'active',
        tags: ['Developer', 'Tech', 'VIP'],
        interactions: 24,
        addedDate: '2024-01-15',
        notes: 'Key technical contact for enterprise solutions'
    },
    {
        id: '2',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '+1 (555) 234-5678',
        company: 'Design Studio',
        role: 'UI/UX Designer',
        location: 'San Francisco, USA',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b8fb?w=400',
        isStarred: false,
        lastContact: '1 week ago',
        status: 'active',
        tags: ['Designer', 'Creative'],
        interactions: 12,
        addedDate: '2024-02-20'
    },
    {
        id: '3',
        name: 'Robert Smith',
        email: 'robert.smith@example.com',
        phone: '+1 (555) 345-6789',
        company: 'Marketing Inc',
        role: 'Marketing Manager',
        location: 'Chicago, USA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        isStarred: true,
        lastContact: '3 days ago',
        status: 'inactive',
        tags: ['Marketing', 'Strategy'],
        interactions: 8,
        addedDate: '2024-03-10'
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+1 (555) 456-7890',
        company: 'Consulting LLC',
        role: 'Business Consultant',
        location: 'Boston, USA',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        isStarred: false,
        lastContact: '5 days ago',
        status: 'pending',
        tags: ['Consultant', 'Business'],
        interactions: 5,
        addedDate: '2024-04-05'
    },
    {
        id: '5',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 567-8901',
        company: 'StartupXYZ',
        role: 'Founder & CEO',
        location: 'Austin, USA',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400',
        isStarred: true,
        lastContact: '1 day ago',
        status: 'active',
        tags: ['CEO', 'Startup', 'VIP'],
        interactions: 35,
        addedDate: '2024-01-08'
    }
];


export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'name' | 'company' | 'lastContact' | 'interactions'>('name');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        setFormLoading(true);
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            // Close modal and reset form
            setFormLoading(false);
        }, 2800);
        setTimeout(() => {
            // Close modal and reset form
            setIsAddModalOpen(false);
            setSelectedContact(null);
        }, 3000);
    };

    // Get unique tags for filter
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        contacts.forEach(contact => contact.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [contacts]);

    // Enhanced filtering and sorting
    const filteredAndSortedContacts = useMemo(() => {
        let filtered = contacts.filter(contact => {
            const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.role.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = selectedFilter === 'all' ||
                (selectedFilter === 'starred' && contact.isStarred) ||
                (selectedFilter === 'active' && contact.status === 'active') ||
                (selectedFilter === 'inactive' && contact.status === 'inactive') ||
                (selectedFilter === 'pending' && contact.status === 'pending');

            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => contact.tags.includes(tag));

            return matchesSearch && matchesFilter && matchesTags;
        });

        // Sort contacts
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'company':
                    return a.company.localeCompare(b.company);
                case 'lastContact':
                    return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
                case 'interactions':
                    return b.interactions - a.interactions;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [contacts, searchQuery, selectedFilter, selectedTags, sortBy]);

    const handleStarToggle = (contactId: string) => {
        setContacts(contacts.map(contact =>
            contact.id === contactId ? { ...contact, isStarred: !contact.isStarred } : contact
        ));
    };

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const getStatusColor = (status: Contact['status']) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const ContactCard = ({ contact }: { contact: Contact }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
            {/* Card Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center flex-1">
                        <div className="relative">
                            <img
                                src={contact.avatar}
                                alt={contact.name}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${contact.status === 'active' ? 'bg-green-500' :
                                contact.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                                }`} />
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {contact.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {contact.role} at {contact.company}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleStarToggle(contact.id)}
                            className={`p-2 rounded-full transition-all duration-200 ${contact.isStarred
                                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <FiStar size={16} fill={contact.isStarred ? 'currentColor' : 'none'} />
                        </button>

                        <div className="relative group/menu">
                            <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                <FiMoreVertical size={16} />
                            </button>

                            {/* Dropdown menu */}
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                    <button
                                        onClick={() => { setSelectedContact(contact); setIsDetailModalOpen(true); }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                                    >
                                        <FiEye className="mr-3" size={14} />
                                        View Details
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                                        <FiEdit3 className="mr-3" size={14} />
                                        Edit Contact
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                                        <FiMessageSquare className="mr-3" size={14} />
                                        Send Message
                                    </button>
                                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center">
                                        <FiTrash2 className="mr-3" size={14} />
                                        Delete Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiMail className="mr-3 text-gray-400" size={14} />
                        <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiPhone className="mr-3 text-gray-400" size={14} />
                        <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiMapPin className="mr-3 text-gray-400" size={14} />
                        <span className="truncate">{contact.location}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {contact.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {contact.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{contact.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                            <FiMessageSquare className="mr-1" size={12} />
                            {contact.interactions}
                        </div>
                        <div className="flex items-center">
                            <FiClock className="mr-1" size={12} />
                            {contact.lastContact}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout>
            {/* Enhanced Header */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center mb-4 lg:mb-0">
                        <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl mr-4 shadow-lg">
                            <FiUsers className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage your network of {contacts.length} contacts
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" icon={FiDownload}>
                            Export
                        </Button>
                        <Button variant="outline" size="sm" icon={FiUpload}>
                            Import
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            icon={FiPlus}
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                            Add Contact
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <FiUsers className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contacts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <FiTrendingUp className="text-green-600 dark:text-green-400" size={20} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contacts.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                                <FiStar className="text-yellow-600 dark:text-yellow-400" size={20} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Starred</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contacts.filter(c => c.isStarred).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <FiHome className="text-purple-600 dark:text-purple-400" size={20} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Companies</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {new Set(contacts.map(c => c.company)).size}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar
                            onSearch={setSearchQuery}
                            placeholder="Search contacts by name, email, company, or role..."
                            isFilterOpen={false}
                            onFilterToggle={() => { }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="company">Sort by Company</option>
                            <option value="lastContact">Sort by Last Contact</option>
                            <option value="interactions">Sort by Interactions</option>
                        </select>

                        <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-400'} rounded-l-lg transition`}
                            >
                                <FiGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-400'} rounded-r-lg transition`}
                            >
                                <FiList size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-2">
                    {['all', 'starred', 'active', 'inactive', 'pending'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === filter
                                ? 'bg-green-500 text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tag Filters */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 self-center">Tags:</span>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTagToggle(tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                                    }`}
                            >
                                <FiTag className="inline mr-1" size={10} />
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredAndSortedContacts.length} of {contacts.length} contacts
                </p>

                {(searchQuery || selectedFilter !== 'all' || selectedTags.length > 0) && (
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedFilter('all');
                            setSelectedTags([]);
                        }}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Contacts Grid/List */}
            <div className={`
                ${viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
            `}>
                {filteredAndSortedContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>

            {/* Enhanced Empty State */}
            {filteredAndSortedContacts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-full mb-6 shadow-lg">
                        <FiUsers className="text-green-600 dark:text-green-400" size={64} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {searchQuery || selectedFilter !== 'all' || selectedTags.length > 0
                            ? 'No contacts match your criteria'
                            : 'No contacts yet'
                        }
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
                        {searchQuery || selectedFilter !== 'all' || selectedTags.length > 0
                            ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                            : 'Start building your network by adding your first contact. You can import from various sources or add them manually.'
                        }
                    </p>

                    {!(searchQuery || selectedFilter !== 'all' || selectedTags.length > 0) && (
                        <div className="flex gap-4">
                            <Button variant="primary" icon={FiPlus} onClick={() => setIsAddModalOpen(true)}>
                                Add Your First Contact
                            </Button>
                            <Button variant="outline" icon={FiUpload}>
                                Import Contacts
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Enhanced Add Contact Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Contact</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Fill in the contact information below</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Developer"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter company name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter location"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tags separated by commas"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Add any additional notes about this contact"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    variant="primary"
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                >
                                    {formLoading ? 'Adding...' : 'Add Contact'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Contact Detail Modal */}
            {isDetailModalOpen && selectedContact && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={selectedContact.avatar}
                                        alt={selectedContact.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {selectedContact.name}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {selectedContact.role} at {selectedContact.company}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <FiMail className="mr-3 text-gray-400" size={16} />
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {selectedContact.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiPhone className="mr-3 text-gray-400" size={16} />
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {selectedContact.phone}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiMapPin className="mr-3 text-gray-400" size={16} />
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {selectedContact.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Activity
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Interactions</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {selectedContact.interactions}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Last Contact</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {selectedContact.lastContact}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Status</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                                                {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedContact.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedContact.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedContact.notes && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Notes</h3>
                                    <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        {selectedContact.notes}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button variant="outline" icon={FiEdit3} className="flex-1">
                                    Edit Contact
                                </Button>
                                <Button variant="primary" icon={FiMessageSquare} className="flex-1">
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
