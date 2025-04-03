
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Layers, TrendingUp, Users, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Sample data
const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

const competitorData = [
  { name: 'Your Company', value: 75 },
  { name: 'Competitor A', value: 60 },
  { name: 'Competitor B', value: 85 },
  { name: 'Competitor C', value: 45 },
];

const marketShareData = [
  { name: 'Your Company', value: 35, color: '#3894ff' },
  { name: 'Competitor A', value: 25, color: '#51b9db' },
  { name: 'Competitor B', value: 20, color: '#94ceff' },
  { name: 'Competitor C', value: 15, color: '#b8e8f4' },
  { name: 'Others', value: 5, color: '#dbeeff' },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description: string;
}> = ({ title, value, change, icon, description }) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs">
          <div className={isPositive ? "text-green-500" : "text-red-500"}>
            <span className="flex items-center">
              {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(change)}%
            </span>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change={20.1}
          icon={<BarChart size={16} />}
          description="from last month"
        />
        <StatCard
          title="Market Position"
          value="2nd"
          change={-1}
          icon={<Layers size={16} />}
          description="in your category"
        />
        <StatCard
          title="Growth Rate"
          value="12.5%"
          change={2.4}
          icon={<TrendingUp size={16} />}
          description="compared to industry"
        />
        <StatCard
          title="Customer Satisfaction"
          value="92%"
          change={5}
          icon={<Users size={16} />}
          description="from previous quarter"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Trend</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your company's performance over time</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Revenue growth over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3894ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3894ff" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3894ff" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Competitor Comparison</CardTitle>
            <CardDescription>Performance relative to key competitors</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart 
                data={competitorData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#51b9db" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1 card-hover">
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
            <CardDescription>Current distribution in your market</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {marketShareData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>AI Insights & Recommendations</CardTitle>
            <CardDescription>Personalized suggestions based on your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Product Improvement</h4>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">High Impact</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Our analysis shows that improving your product's user interface could increase customer satisfaction by approximately 15%, based on competitor analysis and user feedback trends.
              </p>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Market Expansion</h4>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium Impact</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Consider expanding into the enterprise segment, where Competitor B has seen 23% growth but feature gaps exist that your product can address.
              </p>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Pricing Strategy</h4>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Opportunity</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A tiered pricing model could increase revenue by an estimated 18% based on price sensitivity analysis of your current customer base.
              </p>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Insights
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
