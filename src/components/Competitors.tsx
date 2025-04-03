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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '@/integrations/supabase/types';

type Competitor = Database['public']['Tables']['competitors']['Row'];

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
  competitor: Competitor;
  onEdit: (competitor: Competitor) => void;
  onDelete: (competitorId: string) => void;
};

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getThreatBadge = (threat: string | null) => {
    if (!threat) return null;
    
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
            <p className="font-semibold">{competitor.market_share}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Growth</p>
            <p className="font-semibold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {competitor.growth_rate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Satisfaction</p>
            <div className="flex items-center">
              <Progress value={competitor.customer_satisfaction || 0} className="h-2 w-14 mr-2" />
              <span className="font-semibold">{competitor.customer_satisfaction}</span>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <div>
              <h4 className="font-medium text-sm mb-1">Key Strengths</h4>
              <ul className="list-disc pl-5 text-xs space-y-1">
                {competitor.strengths && competitor.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Known Weaknesses</h4>
              <ul className="list-disc pl-5 text-xs space-y-1">
                {competitor.weaknesses && competitor.weaknesses.map((weakness, i) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Locations</h4>
              <div className="flex flex-wrap gap-1">
                {competitor.locations && competitor.locations.map((location, i) => (
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
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onEdit(competitor)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(competitor.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Competitors: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompetitorId, setEditingCompetitorId] = useState<string | null>(null);
  const [competitorToDeleteId, setCompetitorToDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    logo: '/placeholder.svg',
    description: '',
    founded: new Date().getFullYear(),
    employees: '1-50',
    funding: '',
    locations: '',
    strengths: '',
    weaknesses: '',
    market_share: 0,
    growth_rate: 0,
    customer_satisfaction: 0,
    price_point: 'Standard',
    threat: 'medium',
  });

  const { data: competitors = [], isLoading, error } = useQuery({
    queryKey: ['competitors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching competitors:', error);
        throw new Error(error.message);
      }
      
      return data as Competitor[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (competitor: any) => {
      const { data, error } = await supabase
        .from('competitors')
        .insert([competitor])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, competitor }: { id: string; competitor: any }) => {
      const { data, error } = await supabase
        .from('competitors')
        .update(competitor)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('competitors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCompetitor({
      ...newCompetitor,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewCompetitor({
      ...newCompetitor,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10) || 0;
    setNewCompetitor({
      ...newCompetitor,
      [name]: numValue
    });
  };

  const resetForm = () => {
    setNewCompetitor({
      name: '',
      logo: '/placeholder.svg',
      description: '',
      founded: new Date().getFullYear(),
      employees: '1-50',
      funding: '',
      locations: '',
      strengths: '',
      weaknesses: '',
      market_share: 0,
      growth_rate: 0,
      customer_satisfaction: 0,
      price_point: 'Standard',
      threat: 'medium',
    });
    setIsEditing(false);
    setEditingCompetitorId(null);
  };

  const handleEditCompetitor = (competitor: Competitor) => {
    setIsEditing(true);
    setEditingCompetitorId(competitor.id);
    setNewCompetitor({
      name: competitor.name,
      logo: competitor.logo,
      description: competitor.description || '',
      founded: competitor.founded || new Date().getFullYear(),
      employees: competitor.employees || '1-50',
      funding: competitor.funding || '',
      locations: competitor.locations ? competitor.locations.join(', ') : '',
      strengths: competitor.strengths ? competitor.strengths.join('\n') : '',
      weaknesses: competitor.weaknesses ? competitor.weaknesses.join('\n') : '',
      market_share: competitor.market_share || 0,
      growth_rate: competitor.growth_rate || 0,
      customer_satisfaction: competitor.customer_satisfaction || 0,
      price_point: competitor.price_point || 'Standard',
      threat: competitor.threat || 'medium',
    });
    setDialogOpen(true);
  };

  const handleDeleteCompetitor = (competitorId: string) => {
    setCompetitorToDeleteId(competitorId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCompetitor = async () => {
    if (competitorToDeleteId) {
      try {
        await deleteMutation.mutateAsync(competitorToDeleteId);
        
        toast({
          title: "Competitor deleted",
          description: "The competitor has been successfully removed.",
        });
        
        setDeleteDialogOpen(false);
        setCompetitorToDeleteId(null);
      } catch (error) {
        console.error('Error deleting competitor:', error);
        toast({
          title: "Error",
          description: "Failed to delete competitor. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveCompetitor = async () => {
    if (!newCompetitor.name) {
      toast({
        title: "Error",
        description: "Competitor name is required",
        variant: "destructive",
      });
      return;
    }

    const competitorEntry = {
      name: newCompetitor.name,
      logo: newCompetitor.logo,
      description: newCompetitor.description || null,
      founded: newCompetitor.founded || null,
      employees: newCompetitor.employees || null,
      funding: newCompetitor.funding || null,
      locations: newCompetitor.locations ? newCompetitor.locations.split(',').map(location => location.trim()).filter(location => location) : null,
      strengths: newCompetitor.strengths ? newCompetitor.strengths.split('\n').filter(strength => strength.trim()) : null,
      weaknesses: newCompetitor.weaknesses ? newCompetitor.weaknesses.split('\n').filter(weakness => weakness.trim()) : null,
      market_share: newCompetitor.market_share || null,
      growth_rate: newCompetitor.growth_rate || null,
      customer_satisfaction: newCompetitor.customer_satisfaction || null,
      price_point: newCompetitor.price_point || null,
      threat: newCompetitor.threat || null,
    };

    try {
      if (isEditing && editingCompetitorId) {
        await updateMutation.mutateAsync({ 
          id: editingCompetitorId, 
          competitor: competitorEntry 
        });
        
        toast({
          title: "Success",
          description: `${newCompetitor.name} has been updated successfully.`,
        });
      } else {
        await createMutation.mutateAsync(competitorEntry);
        
        toast({
          title: "Success",
          description: `${newCompetitor.name} has been added to your competitors list.`,
        });
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving competitor:', error);
      toast({
        title: "Error",
        description: "Failed to save competitor. Please try again.",
        variant: "destructive",
      });
    }
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['competitors'] });
    toast({
      title: "Data refreshed",
      description: "The competitors list has been refreshed.",
    });
  };

  const dialogTitle = isEditing ? "Edit Competitor" : "Add New Competitor";
  const dialogDescription = isEditing 
    ? "Update the information about this competitor. Fields marked with * are required."
    : "Enter the information about your new competitor. Fields marked with * are required.";
  const buttonText = isEditing ? "Save Changes" : "Add Competitor";

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Competitor
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="text-center">
            <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <p>Loading competitors...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
          <h3 className="text-red-800 font-medium">Error loading data</h3>
          <p className="text-red-600">There was a problem loading the competitors list. Please try again.</p>
          <Button variant="outline" className="mt-2" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : competitors.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 my-4 text-center">
          <h3 className="text-lg font-medium mb-2">No competitors found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first competitor.</p>
          <Button onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Competitor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {competitors.map((competitor) => (
            <CompetitorCard 
              key={competitor.id} 
              competitor={competitor} 
              onEdit={handleEditCompetitor}
              onDelete={handleDeleteCompetitor}
            />
          ))}
        </div>
      )}
      
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

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setDialogOpen(open);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newCompetitor.name} 
                  onChange={handleInputChange} 
                  placeholder="Competitor name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded">Founded Year</Label>
                <Input 
                  id="founded" 
                  name="founded" 
                  type="number" 
                  value={newCompetitor.founded} 
                  onChange={handleNumberChange} 
                  placeholder="Year founded"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={newCompetitor.description} 
                onChange={handleInputChange} 
                placeholder="Brief description of the competitor"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Company Size</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('employees', value)} 
                  defaultValue={newCompetitor.employees}
                  value={newCompetitor.employees}
                >
                  <SelectTrigger id="employees">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="50-200">50-200 employees</SelectItem>
                    <SelectItem value="200-500">200-500 employees</SelectItem>
                    <SelectItem value="500-1000">500-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding">Funding</Label>
                <Input 
                  id="funding" 
                  name="funding" 
                  value={newCompetitor.funding} 
                  onChange={handleInputChange} 
                  placeholder="e.g. $10M Series A"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locations">Locations</Label>
              <Input 
                id="locations" 
                name="locations" 
                value={newCompetitor.locations} 
                onChange={handleInputChange} 
                placeholder="Comma-separated locations (e.g. United States, Europe, Asia)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="strengths">Key Strengths</Label>
                <Textarea 
                  id="strengths" 
                  name="strengths" 
                  value={newCompetitor.strengths} 
                  onChange={handleInputChange} 
                  placeholder="List strengths (one per line)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weaknesses">Known Weaknesses</Label>
                <Textarea 
                  id="weaknesses" 
                  name="weaknesses" 
                  value={newCompetitor.weaknesses} 
                  onChange={handleInputChange} 
                  placeholder="List weaknesses (one per line)"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="market_share">Market Share (%)</Label>
                <Input 
                  id="market_share" 
                  name="market_share" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={newCompetitor.market_share} 
                  onChange={handleNumberChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growth_rate">Growth Rate (%)</Label>
                <Input 
                  id="growth_rate" 
                  name="growth_rate" 
                  type="number" 
                  value={newCompetitor.growth_rate} 
                  onChange={handleNumberChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_satisfaction">Satisfaction (0-100)</Label>
                <Input 
                  id="customer_satisfaction" 
                  name="customer_satisfaction" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={newCompetitor.customer_satisfaction} 
                  onChange={handleNumberChange} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_point">Price Point</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('price_point', value)} 
                  defaultValue={newCompetitor.price_point}
                  value={newCompetitor.price_point}
                >
                  <SelectTrigger id="price_point">
                    <SelectValue placeholder="Select price point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Value">Value</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="threat">Threat Level</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('threat', value)} 
                  defaultValue={newCompetitor.threat}
                  value={newCompetitor.threat}
                >
                  <SelectTrigger id="threat">
                    <SelectValue placeholder="Select threat level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveCompetitor}>
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              competitor and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCompetitor}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
