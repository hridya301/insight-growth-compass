
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Check, Edit, Plus, RefreshCw, Trash, TrendingDown, TrendingUp, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
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
  Radar,
  LineChart,
  Line
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

// Sample competitor data
const competitorData = [
  {
    id: 1,
    name: 'Competitor A',
    logo: '/placeholder.svg',
    description: 'A leading provider in the market with a focus on enterprise solutions.',
    founded: 2010,
    employees: '500-1000',
    funding: '$75M',
    locations: ['United States', 'Europe', 'Asia'],
    strengths: ['Strong brand recognition', 'Excellent customer support', 'Large enterprise client base'],
    weaknesses: ['Higher pricing', 'Complex implementation', 'Limited customization'],
    marketShare: 22,
    growthRate: 15,
    customerSatisfaction: 85,
    pricePoint: 'Premium',
    threat: 'high',
  },
  {
    id: 2,
    name: 'Competitor B',
    logo: '/placeholder.svg',
    description: 'An innovative startup disrupting the market with new technology.',
    founded: 2018,
    employees: '50-200',
    funding: '$25M',
    locations: ['United States', 'Europe'],
    strengths: ['Cutting-edge technology', 'Fast product iteration', 'Modern UI/UX'],
    weaknesses: ['Limited market presence', 'Small support team', 'Narrow feature set'],
    marketShare: 8,
    growthRate: 42,
    customerSatisfaction: 78,
    pricePoint: 'Value',
    threat: 'medium',
  },
  {
    id: 3,
    name: 'Competitor C',
    logo: '/placeholder.svg',
    description: 'A well-established player focusing on cost-effective solutions.',
    founded: 2005,
    employees: '1000+',
    funding: 'Public (IPO 2015)',
    locations: ['Global'],
    strengths: ['Large customer base', 'Cost-effective solutions', 'Wide geographic presence'],
    weaknesses: ['Aging technology stack', 'Slow to innovate', 'Inconsistent support quality'],
    marketShare: 35,
    growthRate: 5,
    customerSatisfaction: 72,
    pricePoint: 'Economy',
    threat: 'low',
  },
];

const featureComparisonData = [
  {
    feature: 'Core Feature A',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': true,
    'Competitor C': true,
  },
  {
    feature: 'Advanced Analytics',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': false,
    'Competitor C': true,
  },
  {
    feature: 'Mobile Support',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': true,
    'Competitor C': false,
  },
  {
    feature: 'API Access',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': true,
    'Competitor C': false,
  },
  {
    feature: 'Custom Reporting',
    'Your Product': false,
    'Competitor A': true,
    'Competitor B': false,
    'Competitor C': true,
  },
  {
    feature: 'White Labeling',
    'Your Product': false,
    'Competitor A': true,
    'Competitor B': false,
    'Competitor C': false,
  },
  {
    feature: 'Multi-language Support',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': false,
    'Competitor C': true,
  },
  {
    feature: 'Offline Mode',
    'Your Product': false,
    'Competitor A': false,
    'Competitor B': true,
    'Competitor C': false,
  },
  {
    feature: 'Enterprise SSO',
    'Your Product': true,
    'Competitor A': true,
    'Competitor B': false,
    'Competitor C': true,
  },
];

const attributesComparisonData = [
  {
    attribute: 'User Experience',
    'Your Product': 85,
    'Competitor A': 75,
    'Competitor B': 90,
    'Competitor C': 60,
  },
  {
    attribute: 'Reliability',
    'Your Product': 90,
    'Competitor A': 85,
    'Competitor B': 70,
    'Competitor C': 80,
  },
  {
    attribute: 'Performance',
    'Your Product': 80,
    'Competitor A': 70,
    'Competitor B': 85,
    'Competitor C': 75,
  },
  {
    attribute: 'Security',
    'Your Product': 95,
    'Competitor A': 90,
    'Competitor B': 80,
    'Competitor C': 85,
  },
  {
    attribute: 'Ease of Integration',
    'Your Product': 75,
    'Competitor A': 65,
    'Competitor B': 80,
    'Competitor C': 60,
  },
];

const marketTrendsData = [
  { year: 2020, 'Your Company': 15, 'Competitor A': 25, 'Competitor B': 5, 'Competitor C': 40 },
  { year: 2021, 'Your Company': 18, 'Competitor A': 24, 'Competitor B': 8, 'Competitor C': 38 },
  { year: 2022, 'Your Company': 22, 'Competitor A': 23, 'Competitor B': 12, 'Competitor C': 35 },
  { year: 2023, 'Your Company': 28, 'Competitor A': 22, 'Competitor B': 18, 'Competitor C': 32 },
  { year: 2024, 'Your Company': 32, 'Competitor A': 20, 'Competitor B': 22, 'Competitor C': 30 },
];

type CompetitorCardProps = {
  competitor: typeof competitorData[0];
};

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getThreatBadge = (threat: string) => {
    switch (threat) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Threat</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium Threat</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Threat</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={competitor.logo} alt={competitor.name} />
              <AvatarFallback>{competitor.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{competitor.name}</CardTitle>
              <CardDescription className="text-xs">
                Founded {competitor.founded} • {competitor.employees} employees
              </CardDescription>
            </div>
          </div>
          {getThreatBadge(competitor.threat)}
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-muted-foreground mb-3">{competitor.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Market Share</p>
            <p className="font-semibold">{competitor.marketShare}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Growth</p>
            <p className="font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {competitor.growthRate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Satisfaction</p>
            <div className="flex items-center">
              <Progress value={competitor.customerSatisfaction} className="h-2 w-14 mr-2" />
              <span className="font-semibold">{competitor.customerSatisfaction}</span>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <div>
              <h4 className="font-medium text-sm mb-1">Key Strengths</h4>
              <ul className="list-disc pl-5 text-xs space-y-1">
                {competitor.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Known Weaknesses</h4>
              <ul className="list-disc pl-5 text-xs space-y-1">
                {competitor.weaknesses.map((weakness, i) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Locations</h4>
              <div className="flex flex-wrap gap-1">
                {competitor.locations.map((location, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{location}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Competitors: React.FC = () => {
  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Competitor
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {competitorData.map((competitor) => (
          <CompetitorCard key={competitor.id} competitor={competitor} />
        ))}
      </div>
      
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="attributes">Attribute Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison Matrix</CardTitle>
              <CardDescription>
                Compare your product features with competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Feature</TableHead>
                      <TableHead>Your Product</TableHead>
                      <TableHead>Competitor A</TableHead>
                      <TableHead>Competitor B</TableHead>
                      <TableHead>Competitor C</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureComparisonData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.feature}</TableCell>
                        <TableCell>
                          {row['Your Product'] ? 
                            <Check className="h-5 w-5 text-green-500" /> : 
                            <X className="h-5 w-5 text-red-500" />
                          }
                        </TableCell>
                        <TableCell>
                          {row['Competitor A'] ? 
                            <Check className="h-5 w-5 text-green-500" /> : 
                            <X className="h-5 w-5 text-red-500" />
                          }
                        </TableCell>
                        <TableCell>
                          {row['Competitor B'] ? 
                            <Check className="h-5 w-5 text-green-500" /> : 
                            <X className="h-5 w-5 text-red-500" />
                          }
                        </TableCell>
                        <TableCell>
                          {row['Competitor C'] ? 
                            <Check className="h-5 w-5 text-green-500" /> : 
                            <X className="h-5 w-5 text-red-500" />
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <Check className="h-4 w-4 text-green-500 mr-1" /> 
                  <span>Feature available</span>
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-red-500 mr-1" /> 
                  <span>Feature not available</span>
                </div>
              </div>
              <Button variant="outline">
                Export Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="attributes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attribute Analysis</CardTitle>
              <CardDescription>
                Compare subjective measures against competitors
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  outerRadius="80%" 
                  data={attributesComparisonData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="attribute" />
                  <PolarRadiusAxis domain={[0, 100]} angle={30} />
                  <Radar 
                    name="Your Product" 
                    dataKey="Your Product" 
                    stroke="#3894ff" 
                    fill="#3894ff" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Competitor A" 
                    dataKey="Competitor A" 
                    stroke="#51b9db" 
                    fill="#51b9db" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Competitor B" 
                    dataKey="Competitor B" 
                    stroke="#94ceff" 
                    fill="#94ceff" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Competitor C" 
                    dataKey="Competitor C" 
                    stroke="#b8e8f4" 
                    fill="#b8e8f4" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Based on market research, customer feedback, and expert analysis.
              </div>
              <Button variant="outline">
                Export Chart
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Share Trends</CardTitle>
              <CardDescription>
                Changes in market position over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={marketTrendsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Your Company" 
                    stroke="#3894ff" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Competitor A" 
                    stroke="#51b9db" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Competitor B" 
                    stroke="#94ceff" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Competitor C" 
                    stroke="#b8e8f4" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center text-sm text-amber-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Market share data is estimated based on available information.</span>
              </div>
              <Button variant="outline">
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
