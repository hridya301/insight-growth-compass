
import React, { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Goals } from '@/components/Goals';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
        // Ping Supabase to check connectivity
        const { data, error } = await supabase.from('goals').select('count').limit(1);
        
        if (error) {
          console.error("Supabase connection error:", error);
          setIsConnected(false);
          toast({
            title: "Connection failed",
            description: "Could not connect to Supabase. Check your environment setup.",
            variant: "destructive",
          });
        } else {
          setIsConnected(true);
          toast({
            title: "Database connected",
            description: "Successfully connected to Supabase database.",
          });
        }
      } catch (error) {
        console.error("Failed to connect to database", error);
        setIsConnected(false);
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
