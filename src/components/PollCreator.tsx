import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { 
  X, 
  MinusCircle, 
  PlusCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  Copy, 
  Check 
} from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const PollCreator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollType, setPollType] = useState('text');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [steps, setSteps] = useState([
    'Question',
    'Options',
    'Settings',
  ]);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const navigateToStep = (step: number) => {
    setCurrentStep(step);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      toast.error('You must have at least two options.');
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setQuestion('');
    setOptions(['', '']);
    setPollType('text');
    setIsMultipleChoice(false);
    setEndDate(undefined);
    setEndTime('');
    setIsPublic(true);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!question.trim()) {
      toast.error('Question cannot be empty.');
      return;
    }

    if (options.some(option => !option.trim())) {
      toast.error('All options must be filled.');
      return;
    }

    // Construct the poll object
    const pollData = {
      question,
      options,
      pollType,
      isMultipleChoice,
      endDate,
      endTime,
      isPublic,
    };

    // Log the poll data (replace with actual submission logic)
    console.log('Poll Data:', pollData);
    toast.success('Poll created successfully!');

    // Reset the form after submission
    resetForm();
    setOpen(false); // Close the dialog
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Ask a Question';
      case 2:
        return 'Add Options';
      case 3:
        return 'Configure Settings';
      default:
        return 'Create Your Poll';
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="What's your favorite color?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 2}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addOption}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Poll Type</Label>
              <RadioGroup value={pollType} onValueChange={setPollType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Image</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="multipleChoice" checked={isMultipleChoice} onCheckedChange={setIsMultipleChoice} />
              <Label htmlFor="multipleChoice">Multiple Choice</Label>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public">Public</Label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto px-8">
          Create a Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left sidebar */}
          <div className="w-full lg:w-[220px] bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="font-semibold mb-4">Create Your Poll</h2>
            <div className="space-y-1">
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    currentStep === index + 1
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => navigateToStep(index + 1)}
                >
                  {step}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 p-6 flex flex-col">
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

            <div className="flex-grow">
              {getStepContent()}
            </div>

            <DialogFooter className="mt-6 border-t border-gray-200 pt-4 flex justify-between w-full">
              <div className="flex gap-2">
                {currentStep !== 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="ghost" onClick={resetForm}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              <Button onClick={currentStep === steps.length ? handleSubmit : nextStep}>
                {currentStep === steps.length ? 'Finish' : 'Continue'}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
