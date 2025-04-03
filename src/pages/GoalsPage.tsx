
import React, { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Goals } from '@/components/Goals';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import clientPromise from '@/config/db';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const GoalsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        // In a browser environment, we can't really ping MongoDB directly
        // So we'll mock a successful connection for demonstration
        setIsConnected(true);
        toast({
          title: "Database connected",
          description: "Successfully connected to database (mock in browser environment).",
        });
      } catch (error) {
        console.error("Failed to connect to database", error);
        toast({
          title: "Connection failed",
          description: "Could not connect to database. Check your environment setup.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    checkConnection();
  }, [toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="flex flex-grow">
          <Sidebar />
          <div className={`${isMobile ? 'ml-0' : 'ml-0 md:ml-64'} flex-grow pt-16 w-full transition-all duration-300 overflow-y-auto`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">Connecting to database...</p>
                </div>
              </div>
            ) : (
              <>
                {!isConnected && (
                  <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-800/30 dark:text-red-300">
                    <p>Could not connect to database. Please check your configuration.</p>
                  </div>
                )}
                <div className="p-4 mb-4 text-sm text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-800/30 dark:text-blue-300">
                  <p>Running with mock database in browser environment. For a real database connection, you would need a server-side solution.</p>
                </div>
                <Goals />
              </>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default GoalsPage;
