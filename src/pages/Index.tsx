
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SupabaseConnectionTest } from '@/components/SupabaseConnectionTest';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Welcome to Digital Dreamers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your business intelligence platform powered by Supabase
            </p>
          </div>
          
          <SupabaseConnectionTest />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/onboarding">Start Onboarding</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400">
        <p>© 2025 Digital Dreamers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
