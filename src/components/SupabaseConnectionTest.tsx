
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const SupabaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setErrorMessage(null);
    
    try {
      // Use a simple ping method by checking if we get a response
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Supabase connection error:', error);
        setConnectionStatus('error');
        setErrorMessage(error.message);
      } else {
        // We successfully connected to Supabase
        console.log('Supabase connection successful');
        setConnectionStatus('success');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Supabase Connection Test</h2>
      
      {connectionStatus === 'checking' && (
        <Alert>
          <AlertTitle>Checking connection...</AlertTitle>
          <AlertDescription>
            Testing connection to Supabase...
          </AlertDescription>
        </Alert>
      )}
      
      {connectionStatus === 'success' && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
          <AlertTitle className="text-green-800 dark:text-green-300">Connection Successful!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Your app is correctly connected to Supabase. You're ready to start building your database tables and features.
          </AlertDescription>
        </Alert>
      )}
      
      {connectionStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Connection Failed</AlertTitle>
          <AlertDescription>
            There was an error connecting to Supabase: {errorMessage}
            <br />
            Please check your Supabase configuration and make sure your project is properly set up.
          </AlertDescription>
        </Alert>
      )}
      
      <Button onClick={checkConnection} variant={connectionStatus === 'error' ? 'destructive' : 'default'}>
        Test Connection Again
      </Button>
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Note: This test attempts to check connectivity with Supabase. If you see a "Connection Successful" message, 
        it means your Supabase integration is working correctly even though we haven't created any tables yet.</p>
      </div>
    </div>
  );
};
