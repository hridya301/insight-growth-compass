
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Competitors } from '@/components/Competitors';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient();

const CompetitorsPage = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="flex flex-grow">
          <Sidebar />
          <div className={`${isMobile ? 'ml-0' : 'ml-0 md:ml-64'} flex-grow pt-16 w-full transition-all duration-300 overflow-y-auto`}>
            <Competitors />
          </div>
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default CompetitorsPage;
