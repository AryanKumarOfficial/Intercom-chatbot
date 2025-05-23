import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto transition-all duration-200 pl-0 md:pl-64">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-5 sm:p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};