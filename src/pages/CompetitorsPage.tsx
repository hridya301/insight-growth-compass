
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Competitors } from '@/components/Competitors';

const CompetitorsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <Sidebar />
      <div className="ml-64 pt-16 w-full">
        <Competitors />
      </div>
    </div>
  );
};

export default CompetitorsPage;
