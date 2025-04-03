
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Download, RefreshCw, Filter, TrendingUp, AlertCircle } from 'lucide-react';

// Sample data for analytics
const performanceData = [
  { month: 'Jan', revenue: 4000, profit: 2400, customers: 240 },
  { month: 'Feb', revenue: 3000, profit: 1398, customers: 210 },
  { month: 'Mar', revenue: 2000, profit: 9800, customers: 290 },
  { month: 'Apr', revenue: 2780, profit: 3908, customers: 320 },
  { month: 'May', revenue: 1890, profit: 4800, customers: 290 },
  { month: 'Jun', revenue: 2390, profit: 3800, customers: 310 },
  { month: 'Jul', revenue: 3490, profit: 4300, customers: 350 },
];

const productData = [
  { name: 'Product A', sales: 4000, growth: 24 },
  { name: 'Product B', sales: 3000, growth: -12 },
  { name: 'Product C', sales: 2000, growth: 18 },
  { name: 'Product D', sales: 2780, growth: 9 },
  { name: 'Product E', sales: 1890, growth: -3 },
  { name: 'Product F', sales: 2390, growth: 5 },
];

const categoryData = [
  { name: 'Category A', value: 400, color: '#3894ff' },
  { name: 'Category B', value: 300, color: '#51b9db' },
  { name: 'Category C', value: 300, color: '#94ceff' },
  { name: 'Category D', value: 200, color: '#b8e8f4' },
];

const competitorComparisonData = [
  {
    subject: 'User Experience',
    'Your Company': 80,
    'Competitor A': 70,
    'Competitor B': 85,
    'Competitor C': 60,
  },
  {
    subject: 'Pricing',
    'Your Company': 65,
    'Competitor A': 75,
    'Competitor B': 60,
    'Competitor C': 85,
  },
  {
    subject: 'Quality',
    'Your Company': 85,
    'Competitor A': 70,
    'Competitor B': 80,
    'Competitor C': 65,
  },
  {
    subject: 'Customer Support',
    'Your Company': 90,
    'Competitor A': 80,
    'Competitor B': 65,
    'Competitor C': 70,
  },
  {
    subject: 'Innovation',
    'Your Company': 75,
    'Competitor A': 65,
    'Competitor B': 90,
    'Competitor C': 55,
  },
  {
    subject: 'Market Reach',
    'Your Company': 70,
    'Competitor A': 85,
    'Competitor B': 75,
    'Competitor C': 60,
  },
];

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  
  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
          
          <Button variant="outline" size="icon">
            <RefreshCw size={16} />
          </Button>
          
          <Button variant="outline" size="icon">
            <Download size={16} />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue & Profit</CardTitle>
                  <CardDescription>Performance metrics over time</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <TrendingUp size={14} /> 12.5% Growth
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3894ff" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#51b9db" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <p>Last updated: Today at 10:30 AM</p>
              <p>Source: Financial data</p>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="customers" fill="#51b9db" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>AI-detected unusual patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="rounded-full bg-yellow-100 p-4">
                    <AlertCircle size={32} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">March Profit Spike</h3>
                    <p className="text-sm text-muted-foreground">
                      Unusual 490% profit increase detected in March. 
                      This may be due to a one-time sale or accounting adjustment.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Investigate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales by product</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3894ff" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Growth by Product</CardTitle>
                <CardDescription>Year-over-year percentage change</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar 
                      dataKey="growth" 
                      radius={[0, 4, 4, 0]}
                      fill={(entry: any) => (entry.growth >= 0 ? "#10b981" : "#ef4444")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="grid grid-cols-2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="flex flex-col justify-center space-y-4">
                  {categoryData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-sm mr-2" 
                        style={{ backgroundColor: entry.color }} 
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                      <span className="ml-auto text-sm">{entry.value}</span>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>
                        {categoryData.reduce((acc, curr) => acc + curr.value, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,745</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 12%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">86.3%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 3.2%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Customer LTV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$1,842</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 8.7%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Analysis by customer type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Enterprise', value: 35, color: '#3894ff' },
                      { name: 'Mid-market', value: 40, color: '#51b9db' },
                      { name: 'Small Business', value: 20, color: '#94ceff' },
                      { name: 'Individual', value: 5, color: '#b8e8f4' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitors" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>Multi-dimensional comparison with key competitors</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competitorComparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Your Company" dataKey="Your Company" stroke="#3894ff" fill="#3894ff" fillOpacity={0.6} />
                  <Radar name="Competitor A" dataKey="Competitor A" stroke="#51b9db" fill="#51b9db" fillOpacity={0.6} />
                  <Radar name="Competitor B" dataKey="Competitor B" stroke="#94ceff" fill="#94ceff" fillOpacity={0.6} />
                  <Radar name="Competitor C" dataKey="Competitor C" stroke="#b8e8f4" fill="#b8e8f4" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Based on market research and customer feedback. Higher scores indicate better performance.
              </p>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Comparison</CardTitle>
                <CardDescription>Your pricing relative to the market</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: 'Your Company', value: 75 },
                      { name: 'Industry Average', value: 82 },
                      { name: 'Competitor A', value: 65 },
                      { name: 'Competitor B', value: 95 },
                      { name: 'Competitor C', value: 70 },
                    ]}
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
                    <Bar 
                      dataKey="value" 
                      fill={(entry: any) => entry.name === 'Your Company' ? '#3894ff' : '#94ceff'}
                      radius={[0, 4, 4, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Share Trends</CardTitle>
                <CardDescription>Quarter-over-quarter changes</CardDescription>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { quarter: 'Q1', you: 20, compA: 30, compB: 25, compC: 15 },
                      { quarter: 'Q2', you: 22, compA: 28, compB: 26, compC: 16 },
                      { quarter: 'Q3', you: 25, compA: 27, compB: 24, compC: 18 },
                      { quarter: 'Q4', you: 28, compA: 25, compB: 23, compC: 19 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="you" name="Your Company" stroke="#3894ff" strokeWidth={2} />
                    <Line type="monotone" dataKey="compA" name="Competitor A" stroke="#51b9db" />
                    <Line type="monotone" dataKey="compB" name="Competitor B" stroke="#94ceff" />
                    <Line type="monotone" dataKey="compC" name="Competitor C" stroke="#b8e8f4" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
