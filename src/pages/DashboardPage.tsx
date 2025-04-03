
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <Sidebar />
      <div className="ml-64 pt-16 w-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
