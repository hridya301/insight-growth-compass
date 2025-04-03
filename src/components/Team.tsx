import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  PieChart, 
  Award, 
  BarChart2,
  ChevronsUpDown
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: 'Emma Thompson',
    position: 'Chief Marketing Officer',
    email: 'emma@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'ET',
    projects: 6,
    projectsCompleted: 4,
    tasks: 18,
    tasksCompleted: 14,
    performance: 92,
    availability: 'Available'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Senior Data Analyst',
    email: 'michael@example.com',
    phone: '+1 (555) 987-6543',
    avatar: 'MC',
    projects: 4,
    projectsCompleted: 3,
    tasks: 23,
    tasksCompleted: 20,
    performance: 96,
    availability: 'In Meeting'
  },
  {
    id: 3,
    name: 'Sarah Rodriguez',
    position: 'UX Designer',
    email: 'sarah@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'SR',
    projects: 5,
    projectsCompleted: 2,
    tasks: 15,
    tasksCompleted: 11,
    performance: 88,
    availability: 'Available'
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Product Manager',
    email: 'david@example.com',
    phone: '+1 (555) 789-0123',
    avatar: 'DK',
    projects: 7,
    projectsCompleted: 5,
    tasks: 29,
    tasksCompleted: 24,
    performance: 94,
    availability: 'On Leave'
  },
  {
    id: 5,
    name: 'Jessica Patel',
    position: 'Content Strategist',
    email: 'jessica@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'JP',
    projects: 3,
    projectsCompleted: 1,
    tasks: 12,
    tasksCompleted: 7,
    performance: 82,
    availability: 'Available'
  },
  {
    id: 6,
    name: 'Alex Johnson',
    position: 'Software Engineer',
    email: 'alex@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'AJ',
    projects: 5,
    projectsCompleted: 4,
    tasks: 26,
    tasksCompleted: 22,
    performance: 90,
    availability: 'Remote'
  }
];

// Sample team performance data
const teamPerformance = {
  avgProductivity: 92,
  tasksCompleted: 98,
  meetingAttendance: 95,
  projectsDelivered: 88,
  teamCollaboration: 94
};

const MemberCard: React.FC<{
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  projects: number;
  projectsCompleted: number;
  tasks: number;
  tasksCompleted: number;
  performance: number;
  availability: string;
}> = ({ 
  name, 
  position, 
  email, 
  phone, 
  avatar, 
  projects, 
  projectsCompleted,
  tasks,
  tasksCompleted,
  performance,
  availability
}) => {
  const getAvailabilityBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-50 text-green-700 border-green-200';
      case 'in meeting': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'on leave': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'remote': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                {avatar}
              </div>
            </Avatar>
            <div>
              <CardTitle className="text-base sm:text-lg">{name}</CardTitle>
              <CardDescription className="text-xs sm:text-sm line-clamp-1">{position}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${getAvailabilityBadge(availability)} text-xs whitespace-nowrap`}>
            {availability}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="text-xs sm:text-sm space-y-2">
          <div className="flex items-center text-muted-foreground">
            <Mail size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Phone size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{phone}</span>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span>Performance</span>
              <span>{performance}%</span>
            </div>
            <Progress value={performance} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projects</span>
                <span>{projectsCompleted}/{projects}</span>
              </div>
              <Progress value={(projectsCompleted / projects) * 100} className="h-1.5" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tasks</span>
                <span>{tasksCompleted}/{tasks}</span>
              </div>
              <Progress value={(tasksCompleted / tasks) * 100} className="h-1.5" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-4">
        <Button variant="outline" size="sm" className="text-xs flex-grow">
          Message
        </Button>
        <Button variant="outline" size="sm" className="text-xs flex-grow">
          Meeting
        </Button>
        <Button size="sm" className="text-xs flex-grow">
          Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Team: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 w-full space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Team Management</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">Export Team Data</Button>
          <Button size="sm" className="text-xs sm:text-sm">
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-1 h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2" size={20} />
              Team Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">{teamMembers.length}</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium">Team Performance</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Productivity</span>
                    <span>{teamPerformance.avgProductivity}%</span>
                  </div>
                  <Progress value={teamPerformance.avgProductivity} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tasks Completed</span>
                    <span>{teamPerformance.tasksCompleted}%</span>
                  </div>
                  <Progress value={teamPerformance.tasksCompleted} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Projects Delivered</span>
                    <span>{teamPerformance.projectsDelivered}%</span>
                  </div>
                  <Progress value={teamPerformance.projectsDelivered} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Team Collaboration</span>
                    <span>{teamPerformance.teamCollaboration}%</span>
                  </div>
                  <Progress value={teamPerformance.teamCollaboration} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full text-sm">
              <Calendar size={16} className="mr-2" />
              Team Calendar
            </Button>
            <Button variant="outline" className="w-full text-sm">
              <PieChart size={16} className="mr-2" />
              Resource Allocation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg sm:text-xl font-semibold">Team Members</h2>
              <Badge>{teamMembers.length} Total</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Award size={16} className="mr-2" />
                Top Performers
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <BarChart2 size={16} className="mr-2" />
                Skills Matrix
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronsUpDown size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sort Team Members</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                position={member.position}
                email={member.email}
                phone={member.phone}
                avatar={member.avatar}
                projects={member.projects}
                projectsCompleted={member.projectsCompleted}
                tasks={member.tasks}
                tasksCompleted={member.tasksCompleted}
                performance={member.performance}
                availability={member.availability}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
