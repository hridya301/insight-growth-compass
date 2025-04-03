
import React, { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Sidebar } from '@/components/Sidebar';
import { Goals } from '@/components/Goals';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import clientPromise from '@/config/db';

const GoalsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        const client = await clientPromise;
        // Check if we can connect to the database
        await client.db().command({ ping: 1 });
        setIsConnected(true);
        toast({
          title: "Database connected",
          description: "Successfully connected to MongoDB Atlas.",
        });
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        toast({
          title: "Connection failed",
          description: "Could not connect to MongoDB. Check your credentials.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    checkConnection();
  }, [toast]);

  return (
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
                  <p>Could not connect to MongoDB. Please check your .env file and make sure VITE_MONGODB_URI is set correctly.</p>
                </div>
              )}
              <Goals />
            </>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default GoalsPage;
