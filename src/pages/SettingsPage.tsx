
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Settings } from '@/components/Settings';
import { useIsMobile } from '@/hooks/use-mobile';

const SettingsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-grow w-full">
        <Sidebar />
        <div className={`${isMobile ? 'ml-0' : 'ml-0 md:ml-64'} flex-grow pt-16 w-full transition-all duration-300 overflow-y-auto`}>
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
