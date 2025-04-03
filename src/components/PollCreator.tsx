
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  ListFilter, 
  SmilePlus, 
  Hash, 
  Calendar, 
  Clock, 
  Plus, 
  X,
  Share2, 
  Settings, 
  Puzzle, 
  FileText, 
  CheckSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

type PollOption = {
  id: string;
  value: string;
  description?: string;
};

type PollSchedule = {
  days: number;
  hours: number;
  minutes: number;
  scheduleType: 'length' | 'endDate';
  endDate?: Date;
};

export const PollCreator = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('select');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', value: "I'm touched", description: '' },
    { id: '2', value: '', description: '' }
  ]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);
  const [schedule, setSchedule] = useState<PollSchedule>({
    days: 1,
    hours: 0,
    minutes: 0,
    scheduleType: 'length',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [pollPlacement, setPollPlacement] = useState('dashboard');
  const [integration, setIntegration] = useState<string | null>(null);

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now().toString(), value: '', description: '' }]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    } else {
      toast.error("You need at least 2 options");
    }
  };

  const handleOptionChange = (id: string, field: 'value' | 'description', value: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    ));
  };

  const handleScheduleChange = (field: keyof PollSchedule, value: any) => {
    setSchedule({ ...schedule, [field]: value });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (currentStep === 1 && options.some(opt => !opt.value.trim())) {
      toast.error("All options must have a value");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreatePoll = () => {
    const pollData = {
      question,
      pollType,
      options,
      schedule,
      isAnonymous,
      allowMultipleVotes,
      pollPlacement,
      integration
    };
    
    console.log("Poll created:", pollData);
    toast.success("Poll created successfully!");
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setQuestion('');
    setPollType('select');
    setOptions([
      { id: '1', value: "I'm touched", description: '' },
      { id: '2', value: '', description: '' }
    ]);
    setSchedule({
      days: 1,
      hours: 0,
      minutes: 0,
      scheduleType: 'length',
    });
    setIsAnonymous(false);
    setAllowMultipleVotes(false);
    setCurrentStep(1);
    setPollPlacement('dashboard');
    setIntegration(null);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Question & answers";
      case 2: return "Choose Template";
      case 3: return "Poll Placement";
      case 4: return "Schedule";
      case 5: return "Advanced Settings";
      case 6: return "Integration";
      case 7: return "Share or Embed Poll";
      default: return "";
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="question" className="text-sm font-medium">
                Ask a question
              </label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Poll type
              </label>
              <Tabs defaultValue={pollType} onValueChange={setPollType} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="select" className="flex gap-2 items-center">
                    <ListFilter className="h-4 w-4" />
                    Select list
                  </TabsTrigger>
                  <TabsTrigger value="emoji" className="flex gap-2 items-center">
                    <SmilePlus className="h-4 w-4" />
                    Emojis
                  </TabsTrigger>
                  <TabsTrigger value="numerical" className="flex gap-2 items-center">
                    <Hash className="h-4 w-4" />
                    Numerical
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Options
              </label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 text-center text-gray-500">{index + 1}</div>
                    <div className="flex-1">
                      <Input
                        value={option.value}
                        onChange={(e) => handleOptionChange(option.id, 'value', e.target.value)}
                        placeholder={index === 0 ? "I'm touched" : "Type an option..."}
                        className="mb-1"
                      />
                      {pollType === 'select' && (
                        <Input
                          value={option.description || ''}
                          onChange={(e) => handleOptionChange(option.id, 'description', e.target.value)}
                          placeholder="Optional description"
                          className="text-xs"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveOption(option.id)}
                      className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAddOption} 
                className="mt-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <Plus className="h-4 w-4 mr-1" /> Add option
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Select a template for your poll</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:border-indigo-500 transition-all">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Basic Poll</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription>Simple question with multiple choice answers</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:border-indigo-500 transition-all">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Feedback Poll</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription>Collect user feedback with ratings</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:border-indigo-500 transition-all">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Image Poll</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription>Include images with your options</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:border-indigo-500 transition-all opacity-70">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Quiz Poll</CardTitle>
                  <span className="absolute top-2 right-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Pro</span>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription>Test knowledge with right/wrong answers</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Choose where your poll will appear</p>
            
            <RadioGroup defaultValue={pollPlacement} onValueChange={setPollPlacement}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="dashboard" id="dashboard" />
                <Label htmlFor="dashboard">Dashboard</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="analytics" id="analytics" />
                <Label htmlFor="analytics">Analytics Page</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="insights" id="insights" />
                <Label htmlFor="insights">Insights Page</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="competitors" id="competitors" />
                <Label htmlFor="competitors">Competitors Page</Label>
              </div>
            </RadioGroup>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Set when your poll should start and end</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                className={`bg-gray-50 rounded-md p-3 text-center cursor-pointer ${schedule.scheduleType === 'endDate' ? 'bg-indigo-50 border border-indigo-200' : ''}`}
                onClick={() => handleScheduleChange('scheduleType', 'endDate')}
              >
                <span className="text-sm flex justify-center items-center gap-2">
                  <Calendar className="h-4 w-4" /> Set end date
                </span>
              </div>
              <div 
                className={`bg-gray-50 rounded-md p-3 text-center cursor-pointer ${schedule.scheduleType === 'length' ? 'bg-indigo-50 border border-indigo-200' : ''}`}
                onClick={() => handleScheduleChange('scheduleType', 'length')}
              >
                <span className="text-sm flex justify-center items-center gap-2">
                  <Clock className="h-4 w-4" /> Set length
                </span>
              </div>
            </div>
            
            {schedule.scheduleType === 'length' ? (
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="relative">
                  <Input 
                    type="number" 
                    min={0}
                    value={schedule.days} 
                    onChange={(e) => handleScheduleChange('days', parseInt(e.target.value) || 0)} 
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    days
                  </span>
                </div>
                <div className="relative">
                  <Input 
                    type="number" 
                    min={0}
                    max={23}
                    value={schedule.hours} 
                    onChange={(e) => handleScheduleChange('hours', parseInt(e.target.value) || 0)} 
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    hours
                  </span>
                </div>
                <div className="relative">
                  <Input 
                    type="number" 
                    min={0}
                    max={59}
                    value={schedule.minutes} 
                    onChange={(e) => handleScheduleChange('minutes', parseInt(e.target.value) || 0)} 
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    minutes
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <label className="text-sm font-medium">End date</label>
                <Input
                  type="date"
                  className="mt-1"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined;
                    handleScheduleChange('endDate', date);
                  }}
                />
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Configure advanced poll settings</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Anonymous Voting</h4>
                  <p className="text-sm text-gray-500">Hide voter identities</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroup defaultValue={isAnonymous ? "yes" : "no"} onValueChange={(val) => setIsAnonymous(val === "yes")}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="yes" id="anonymous-yes" />
                        <Label htmlFor="anonymous-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="no" id="anonymous-no" />
                        <Label htmlFor="anonymous-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Multiple Votes</h4>
                  <p className="text-sm text-gray-500">Allow users to select multiple options</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroup defaultValue={allowMultipleVotes ? "yes" : "no"} onValueChange={(val) => setAllowMultipleVotes(val === "yes")}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="yes" id="multiple-yes" />
                        <Label htmlFor="multiple-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="no" id="multiple-no" />
                        <Label htmlFor="multiple-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Result Visibility</h4>
                <Select defaultValue="always">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always visible</SelectItem>
                    <SelectItem value="after-vote">After voting</SelectItem>
                    <SelectItem value="after-end">After poll ends</SelectItem>
                    <SelectItem value="admin">Only to administrators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Connect your poll to other services</p>
            
            <div className="grid grid-cols-1 gap-3">
              <Card 
                className={`cursor-pointer hover:border-indigo-500 transition-all ${integration === 'slack' ? 'border-indigo-500 bg-indigo-50' : ''}`}
                onClick={() => setIntegration('slack')}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-[#4A154B] text-white p-2 rounded">
                    <svg width="16" height="16" viewBox="0 0 122 122" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.6 62.4C25.6 57.6 21.7 53.7 16.9 53.7C12.1 53.7 8.2 57.6 8.2 62.4V77.8C8.2 82.6 12.1 86.5 16.9 86.5C21.7 86.5 25.6 82.6 25.6 77.8V62.4Z" fill="white"/>
                      <path d="M62.4 62.4C62.4 57.6 58.5 53.7 53.7 53.7C48.9 53.7 45 57.6 45 62.4V77.8C45 82.6 48.9 86.5 53.7 86.5C58.5 86.5 62.4 82.6 62.4 77.8V62.4Z" fill="white"/>
                      <path d="M77.8 62.4C77.8 57.6 73.9 53.7 69.1 53.7C64.3 53.7 60.4 57.6 60.4 62.4C60.4 67.2 64.3 71.1 69.1 71.1H77.8V62.4Z" fill="white"/>
                      <path d="M77.8 25.6C82.6 25.6 86.5 21.7 86.5 16.9C86.5 12.1 82.6 8.2 77.8 8.2C73 8.2 69.1 12.1 69.1 16.9V25.6H77.8Z" fill="white"/>
                      <path d="M77.8 62.4C82.6 62.4 86.5 58.5 86.5 53.7C86.5 48.9 82.6 45 77.8 45H62.4C57.6 45 53.7 48.9 53.7 53.7C53.7 58.5 57.6 62.4 62.4 62.4H77.8Z" fill="white"/>
                      <path d="M114.3 53.7C114.3 58.5 118.2 62.4 123 62.4C127.8 62.4 131.7 58.5 131.7 53.7C131.7 48.9 127.8 45 123 45H114.3V53.7Z" fill="white"/>
                      <path d="M114.3 53.7C114.3 48.9 110.4 45 105.6 45C100.8 45 96.9 48.9 96.9 53.7V69.1C96.9 73.9 100.8 77.8 105.6 77.8C110.4 77.8 114.3 73.9 114.3 69.1V53.7Z" fill="white"/>
                      <path d="M105.6 114.3C110.4 114.3 114.3 110.4 114.3 105.6C114.3 100.8 110.4 96.9 105.6 96.9C100.8 96.9 96.9 100.8 96.9 105.6V114.3H105.6Z" fill="white"/>
                      <path d="M62.4 105.6C62.4 110.4 66.3 114.3 71.1 114.3C75.9 114.3 79.8 110.4 79.8 105.6C79.8 100.8 75.9 96.9 71.1 96.9H62.4V105.6Z" fill="white"/>
                      <path d="M62.4 105.6C57.6 105.6 53.7 109.5 53.7 114.3C53.7 119.1 57.6 123 62.4 123C67.2 123 71.1 119.1 71.1 114.3V105.6H62.4Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Slack</h4>
                    <p className="text-xs text-gray-500">Share and collect responses in Slack</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:border-indigo-500 transition-all ${integration === 'teams' ? 'border-indigo-500 bg-indigo-50' : ''}`}
                onClick={() => setIntegration('teams')}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-[#444791] text-white p-2 rounded">
                    <svg width="16" height="16" viewBox="0 0 2228.833 2073.333" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1554.637,777.5h575.713c54.391,0,98.483,44.092,98.483,98.483c0,1.529,0,575.713,0,575.713
                        c0,54.391-44.092,98.483-98.483,98.483h-575.713c-54.391,0-98.483-44.092-98.483-98.483V875.983
                        C1456.154,821.6,1500.246,777.5,1554.637,777.5z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Microsoft Teams</h4>
                    <p className="text-xs text-gray-500">Share and collect responses in Teams</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="cursor-not-allowed opacity-60">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-[#0072C6] text-white p-2 rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6l8 5 8-5" stroke="white" strokeWidth="2" />
                      <path d="M2 6v12h16V6" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-xs text-gray-500">Send poll via email (Pro feature)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Get sharable links or embed code</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Direct Link</h4>
                <div className="flex gap-2">
                  <Input 
                    value="https://insightgrowth.app/polls/new-poll" 
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Embed Code</h4>
                <Textarea 
                  className="h-24 text-xs bg-gray-50 font-mono"
                  readOnly
                  value={`<iframe 
  src="https://insightgrowth.app/polls/embed/new-poll" 
  width="100%" 
  height="400px" 
  frameborder="0">
</iframe>`}
                />
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Share via</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
        Create Poll
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 gap-0">
          <div className="flex h-[600px] max-h-[80vh]">
            {/* Left sidebar */}
            <div className="w-[270px] border-r p-6 bg-gray-50">
              <div className="mb-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Insert a Simple Poll
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Simple Poll is a tool for creating quick polls, letting users easily vote on various options and collect feedback.
                </p>
              </div>

              <div className="space-y-4">
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 1 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(1)}
                >
                  <CheckSquare className="h-5 w-5" />
                  <span className="text-sm">Question & answers</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 2 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(2)}
                >
                  <ListFilter className="h-5 w-5" />
                  <span className="text-sm">Choose template</span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">New</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 3 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(3)}
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Poll placement</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 4 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(4)}
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Schedule</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 5 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(5)}
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-sm">Advanced settings</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 6 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(6)}
                >
                  <Puzzle className="h-5 w-5" />
                  <span className="text-sm">Integration</span>
                </div>
                
                <div 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${currentStep === 7 ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  onClick={() => setCurrentStep(7)}
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share or embed poll</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</span>
                  <span className="text-xs text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="h-1 bg-indigo-600 rounded-full" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 p-6">
              <DialogHeader className="mb-6 flex justify-between items-center">
                <DialogTitle className="text-xl font-semibold">
                  {getStepTitle()}
                </DialogTitle>
                <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </DialogClose>
              </DialogHeader>
              <DialogDescription className="sr-only">
                Configure your poll settings
              </DialogDescription>

              {getStepContent()}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                      onClick={handleNextStep}
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={handleCreatePoll}
                    >
                      Create Poll
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
