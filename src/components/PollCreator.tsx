
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
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
  CheckSquare 
} from 'lucide-react';
import { toast } from 'sonner';

type PollOption = {
  id: string;
  value: string;
  description?: string;
};

export const PollCreator = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('select');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', value: "I'm touched", description: '' },
    { id: '2', value: '', description: '' }
  ]);
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

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

  const handleCreatePoll = () => {
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
    setDays(1);
    setHours(0);
    setMinutes(0);
    setCurrentStep(1);
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
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 1 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <CheckSquare className="h-5 w-5" />
                  <span className="text-sm">Question & answers</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 2 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <ListFilter className="h-5 w-5" />
                  <span className="text-sm">Choose template</span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">New</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 3 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Poll placement</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 4 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Schedule</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 5 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <Settings className="h-5 w-5" />
                  <span className="text-sm">Advanced settings</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 6 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <Puzzle className="h-5 w-5" />
                  <span className="text-sm">Integration</span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-md ${currentStep === 7 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share or embed poll</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</span>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Question & answers</h2>
                <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>

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
                            placeholder={index === 0 ? "I'm touched" : "Type optional description..."}
                            className="mb-1"
                          />
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

                <div>
                  <label className="text-sm font-medium block mb-2">
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-md p-3 text-center">
                      <span className="text-sm">Set end date</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3 text-center">
                      <span className="text-sm">Set length</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="relative">
                      <Input 
                        type="number" 
                        min={0}
                        value={days} 
                        onChange={(e) => setDays(parseInt(e.target.value))} 
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
                        value={hours} 
                        onChange={(e) => setHours(parseInt(e.target.value))} 
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
                        value={minutes} 
                        onChange={(e) => setMinutes(parseInt(e.target.value))} 
                        className="pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        minutes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={handleCreatePoll}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
