"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiMessageSquare, 
  FiUsers, 
  FiSettings,
  FiBarChart2, 
  FiMenu, 
  FiX,
  FiHelpCircle
} from 'react-icons/fi';
import { Icon } from '../common/Icon';
import { IconType } from 'react-icons';

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: FiHome },
  { label: 'Inbox', href: '/inbox', icon: FiMessageSquare },
  { label: 'Contacts', href: '/contacts', icon: FiUsers },
  { label: 'Reports', href: '/reports', icon: FiBarChart2 },
  { label: 'Settings', href: '/settings', icon: FiSettings },
  { label: 'Help', href: '/help', icon: FiHelpCircle },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        <Icon icon={isMobileMenuOpen ? FiX : FiMenu} aria-label="Toggle Menu" />
      </button>
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: (!isMounted || isDesktop || isMobileMenuOpen) ? 0 : -300
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-gray-100 dark:bg-gray-900 shadow-lg z-40 md:translate-x-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 mb-3">
            <div className="relative flex items-center px-3 py-3.5 bg-white dark:bg-gray-800 shadow-md overflow-hidden border-b-4 border-primary-500 dark:border-primary-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 dark:bg-primary-700 rounded-md flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Intercom AI</h1>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">AI-POWERED CONVERSATIONS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-3">
            <div className="mb-2">
              <ul className="space-y-0.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        className={`flex items-center px-3 py-2.5 text-sm transition-all duration-200 relative
                          ${isActive
                            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500 dark:border-primary-400 shadow-sm font-semibold pl-4'
                            : 'text-gray-600 hover:bg-white/70 dark:text-gray-400 dark:hover:bg-gray-800/80 border-l-4 border-transparent pl-4 hover:pl-5'
                          }`}
                      >
                        <Icon 
                          icon={item.icon} 
                          className={`mr-3 ${isActive ? 'text-primary-500 dark:text-primary-400 text-lg' : 'text-gray-400 dark:text-gray-500 text-base'}`} 
                          aria-hidden="true" 
                        />
                        <span className={`${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>{item.label}</span>
                        
                        {isActive && (
                          <span className="ml-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 inline-block"></span>
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="mt-6 mb-4">
              <h2 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 px-3 mb-2 uppercase">Shortcuts</h2>
              <div className="grid grid-cols-2 gap-2 px-2">
                <button className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Icon icon={FiMessageSquare} className="text-gray-500 dark:text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-600 dark:text-gray-300">New Chat</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Icon icon={FiUsers} className="text-gray-500 dark:text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-600 dark:text-gray-300">Add Contact</span>
                </button>
              </div>
            </div>
          </nav>

          {/* User profile */}
          <div className="mt-auto p-4 bg-white/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-9 h-9 rounded-md bg-primary-600 dark:bg-primary-700 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">JD</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <div className="ml-3 flex-grow overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block mr-1"></span>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">PREMIUM</p>
                </div>
              </div>
              <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Icon icon={FiSettings} className="text-gray-500 dark:text-gray-400 text-lg" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black z-30"
        />
      )}
    </>
  );
};