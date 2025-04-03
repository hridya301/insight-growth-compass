
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Lightbulb, 
  TrendingUp,
  UserPlus 
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="mr-2 h-5 w-5" /> },
    { title: 'Analytics', path: '/analytics', icon: <BarChart3 className="mr-2 h-5 w-5" /> },
    { title: 'Insights', path: '/insights', icon: <Lightbulb className="mr-2 h-5 w-5" /> },
    { title: 'Competitors', path: '/competitors', icon: <TrendingUp className="mr-2 h-5 w-5" /> },
    { title: 'Complete Onboarding', path: '/onboarding', icon: <UserPlus className="mr-2 h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-insight-600">
            Welcome to <span className="text-indigo-600">InsightGrowth</span>
          </CardTitle>
          <CardDescription className="text-center">
            Navigate to any section of the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigationOptions.map((option) => (
              <Button 
                key={option.path}
                onClick={() => navigate(option.path)} 
                className="flex items-center justify-center h-16 text-md"
                variant={option.path === '/onboarding' ? 'default' : 'outline'}
              >
                {option.icon}
                {option.title}
              </Button>
            ))}
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
