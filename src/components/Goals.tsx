
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Calendar, CheckCircle, PlusCircle, Flag } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalsService, Goal as GoalType } from '@/services/mongodb/goalsService';

// Goal interface for better type safety
interface Goal {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: string;
  priority: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the goal schema for form validation
const goalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dueDate: z.string().refine(date => new Date(date) > new Date(), {
    message: "Due date must be in the future"
  }),
  priority: z.enum(["Critical", "High", "Medium", "Low"]),
  category: z.enum(["Quarterly", "Annual"])
});

// Schema for updating progress
const progressUpdateSchema = z.object({
  progress: z.number().min(0).max(100),
  status: z.enum(["Completed", "On Track", "In Progress", "Early Stage", "At Risk", "Overdue"]),
  notes: z.string().optional()
});

type GoalFormValues = z.infer<typeof goalSchema>;
type ProgressUpdateValues = z.infer<typeof progressUpdateSchema>;

const GoalCard: React.FC<{
  goal: Goal;
  onUpdateProgress: (goalId: string, data: Partial<Goal>) => void;
}> = ({ goal, onUpdateProgress }) => {
  const date = new Date(goal.dueDate);
  const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const progressForm = useForm<ProgressUpdateValues>({
    resolver: zodResolver(progressUpdateSchema),
    defaultValues: {
      progress: goal.progress,
      status: goal.status as any,
      notes: ''
    }
  });

  const handleProgressUpdate = (data: ProgressUpdateValues) => {
    onUpdateProgress(goal._id || '', {
      progress: data.progress,
      status: data.status
    });
    
    toast({
      title: "Progress Updated",
      description: `Updated progress for '${goal.title}' to ${data.progress}%`
    });
    
    setUpdateDialogOpen(false);
  };
  
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
          <CardTitle className="text-lg font-bold">{goal.title}</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className={getPriorityColor(goal.priority)}>
              {goal.priority}
            </Badge>
            <Badge variant="outline" className={getStatusColor(goal.status)}>
              {goal.status}
            </Badge>
          </div>
        </div>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={14} className="mr-2" />
            <span>Due {formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">Update Progress</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Progress</DialogTitle>
                <DialogDescription>
                  Update the progress and status for "{goal.title}"
                </DialogDescription>
              </DialogHeader>
              <Form {...progressForm}>
                <form onSubmit={progressForm.handleSubmit(handleProgressUpdate)} className="space-y-4">
                  <FormField
                    control={progressForm.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="100" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={progressForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            {...field}
                          >
                            <option value="Completed">Completed</option>
                            <option value="On Track">On Track</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Early Stage">Early Stage</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Overdue">Overdue</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={progressForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any notes about this progress update"
                            className="min-h-[80px]" 
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          These notes will be visible in the goal history
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-xl">{goal.title}</DialogTitle>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                </div>
                <DialogDescription>
                  Goal details and tracking information
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm mt-1">{goal.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Progress</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2.5" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Due Date</h3>
                    <p className="text-sm mt-1">{formattedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">ID</h3>
                    <p className="text-sm mt-1">GOAL-{goal.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Timeline</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Goal Created</p>
                        <p className="text-xs text-muted-foreground">Jan 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Initial Progress (25%)</p>
                        <p className="text-xs text-muted-foreground">Feb 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1 mr-2"></div>
                      <div>
                        <p className="text-sm font-medium">Progress Update ({goal.progress}%)</p>
                        <p className="text-xs text-muted-foreground">Today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    setUpdateDialogOpen(true);
                  }}
                >
                  Update Progress
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Goals: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch goals from database
  const { data: allGoals = [], isLoading: isLoadingGoals } = useQuery({
    queryKey: ['goals'],
    queryFn: goalsService.getGoals,
  });

  // Filter by category
  const quarterlyGoals = allGoals.filter((goal: Goal) => goal.category === "Quarterly");
  const annualGoals = allGoals.filter((goal: Goal) => goal.category === "Annual");

  // Create new goal mutation
  const createGoalMutation = useMutation({
    mutationFn: (newGoal: Omit<GoalType, '_id'>) => goalsService.createGoal(newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setDialogOpen(false);
      toast({
        title: "Goal Created",
        description: "Your goal has been successfully created.",
      });
    },
    onError: (error) => {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<GoalType> }) => 
      goalsService.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast({
        title: "Goal Updated",
        description: "Your goal has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error("Error updating goal:", error);
      toast({
        title: "Error",
        description: "Failed to update goal. Please try again.",
        variant: "destructive",
      });
    }
  });

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      category: "Quarterly"
    }
  });

  const onSubmit = (values: GoalFormValues) => {
    createGoalMutation.mutate({
      title: values.title,
      description: values.description,
      progress: 0,
      dueDate: new Date(values.dueDate),
      status: "Early Stage",
      priority: values.priority,
      category: values.category,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    form.reset();
  };

  // Function to update a specific goal's progress
  const handleUpdateGoal = (goalId: string, updatedData: Partial<Goal>) => {
    updateGoalMutation.mutate({
      id: goalId,
      data: updatedData
    });
  };

  // Calculate average progress
  const calculateAverageProgress = (goals: Goal[]) => {
    if (goals.length === 0) return 0;
    return Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);
  };

  // Get top performers
  const getTopPerformers = () => {
    return [...quarterlyGoals, ...annualGoals]
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 2);
  };

  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Goals & Objectives</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Goals</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Define a new goal for your team or organization. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Increase Revenue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the goal and how it will be measured" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="Critical">Critical</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Category</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="Quarterly"
                                checked={field.value === "Quarterly"}
                                onChange={() => field.onChange("Quarterly")}
                                className="h-4 w-4"
                              />
                              <span>Quarterly Goal</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="Annual"
                                checked={field.value === "Annual"}
                                onChange={() => field.onChange("Annual")}
                                className="h-4 w-4"
                              />
                              <span>Annual Goal</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Create Goal</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {isLoadingGoals ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading goals...</p>
          </div>
        </div>
      ) : (
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
                  <span className="text-sm font-medium">{quarterlyGoals.length} Active</span>
                </div>
                <Progress 
                  value={calculateAverageProgress(quarterlyGoals)} 
                  className="h-2" 
                />
                <div className="text-xs text-muted-foreground">
                  {calculateAverageProgress(quarterlyGoals)}% average completion
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Annual Goals</span>
                  <span className="text-sm font-medium">{annualGoals.length} Active</span>
                </div>
                <Progress 
                  value={calculateAverageProgress(annualGoals)} 
                  className="h-2" 
                />
                <div className="text-xs text-muted-foreground">
                  {calculateAverageProgress(annualGoals)}% average completion
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2" size={16} />
                    <span className="text-sm font-medium">Top Performers</span>
                  </div>
                </div>
                <div className="text-sm">
                  {getTopPerformers().map((goal) => (
                    <div key={`top-${goal._id}`} className="flex justify-between py-1">
                      <span>{goal.title}</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                  ))}
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
                    key={goal._id}
                    goal={goal}
                    onUpdateProgress={handleUpdateGoal}
                  />
                ))}
                {quarterlyGoals.length === 0 && (
                  <div className="col-span-full text-center py-10 border border-dashed rounded-lg">
                    <Target size={30} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No quarterly goals yet. Create your first one!</p>
                  </div>
                )}
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
                    key={goal._id}
                    goal={goal}
                    onUpdateProgress={handleUpdateGoal}
                  />
                ))}
                {annualGoals.length === 0 && (
                  <div className="col-span-full text-center py-10 border border-dashed rounded-lg">
                    <Target size={30} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No annual goals yet. Create your first one!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
