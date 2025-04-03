
import React from 'react';
import { Onboarding } from '@/components/Onboarding';
import { PollCreator } from '@/components/PollCreator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-insight-600">
            Welcome to <span className="text-indigo-600">InsightGrowth</span>
          </CardTitle>
          <CardDescription className="text-center">
            Start by creating your company profile or exploring our poll feature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button onClick={() => navigate('/onboarding')} className="w-full md:w-auto px-8">
              Complete Onboarding
            </Button>
            <PollCreator />
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>
              InsightGrowth helps you analyze your business data and compare with competitors
              to provide valuable insights for growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
