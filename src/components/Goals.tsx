
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Calendar, CheckCircle, PlusCircle, Flag } from 'lucide-react';

// Sample data for goals
const quarterlyGoals = [
  { 
    id: 1, 
    title: 'Increase Market Share', 
    description: 'Grow market share by 5% within the quarter', 
    progress: 65, 
    dueDate: '2025-06-30',
    status: 'In Progress',
    priority: 'High'
  },
  { 
    id: 2, 
    title: 'Launch New Product Feature', 
    description: 'Release v2.0 with AI-powered recommendations', 
    progress: 80, 
    dueDate: '2025-05-15',
    status: 'In Progress',
    priority: 'Critical'
  },
  { 
    id: 3, 
    title: 'Reduce Customer Churn', 
    description: 'Decrease monthly churn rate from 3.2% to 2.5%', 
    progress: 40, 
    dueDate: '2025-06-30',
    status: 'In Progress',
    priority: 'Medium'
  },
  { 
    id: 4, 
    title: 'Establish Strategic Partnership', 
    description: 'Secure at least two new integration partners', 
    progress: 25, 
    dueDate: '2025-07-10',
    status: 'Early Stage',
    priority: 'Medium'
  }
];

const annualGoals = [
  { 
    id: 1, 
    title: 'Revenue Growth', 
    description: 'Achieve $10M in annual recurring revenue', 
    progress: 35, 
    dueDate: '2025-12-31',
    status: 'On Track',
    priority: 'High'
  },
  { 
    id: 2, 
    title: 'International Expansion', 
    description: 'Enter at least 3 new international markets', 
    progress: 20, 
    dueDate: '2025-12-31',
    status: 'Early Stage',
    priority: 'Medium'
  }
];

const GoalCard: React.FC<{
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: string;
  priority: string;
}> = ({ title, description, progress, dueDate, status, priority }) => {
  const date = new Date(dueDate);
  const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'on track': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in progress': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'early stage': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'at risk': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className={getPriorityColor(priority)}>
              {priority}
            </Badge>
            <Badge variant="outline" className={getStatusColor(status)}>
              {status}
            </Badge>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={14} className="mr-2" />
            <span>Due {formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs">Update Progress</Button>
          <Button variant="outline" size="sm" className="text-xs">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Goals: React.FC = () => {
  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Goals & Objectives</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Goals</Button>
          <Button>
            <PlusCircle size={16} className="mr-2" />
            New Goal
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2" size={20} />
              Goal Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quarterly Goals</span>
                <span className="text-sm font-medium">4 Active</span>
              </div>
              <Progress value={57} className="h-2" />
              <div className="text-xs text-muted-foreground">57% average completion</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Annual Goals</span>
                <span className="text-sm font-medium">2 Active</span>
              </div>
              <Progress value={28} className="h-2" />
              <div className="text-xs text-muted-foreground">28% average completion</div>
            </div>
            
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2" size={16} />
                  <span className="text-sm font-medium">Top Performers</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span>Launch New Product Feature</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Increase Market Share</span>
                  <span className="font-medium">65%</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Flag size={16} className="mr-2" />
              Manage Goal Categories
            </Button>
          </CardFooter>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Quarterly Goals (Q2 2025)
              </h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {quarterlyGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  progress={goal.progress}
                  dueDate={goal.dueDate}
                  status={goal.status}
                  priority={goal.priority}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Annual Goals (2025)
              </h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {annualGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  progress={goal.progress}
                  dueDate={goal.dueDate}
                  status={goal.status}
                  priority={goal.priority}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
