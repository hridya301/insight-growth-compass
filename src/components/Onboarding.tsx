
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft, Building, Package, Users, BarChart4, ClipboardCheck } from 'lucide-react';

type OnboardingStepProps = {
  onNext: () => void;
  onBack?: () => void;
};

const CompanyInfoStep: React.FC<OnboardingStepProps> = ({ onNext }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="company-name">Company Name</Label>
        <Input id="company-name" placeholder="Acme Inc." />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="business-type">Business Type</Label>
        <Select>
          <SelectTrigger id="business-type">
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="sme">Small-Medium Enterprise (SME)</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company-size">Company Size</Label>
        <Select>
          <SelectTrigger id="company-size">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="501-1000">501-1000 employees</SelectItem>
            <SelectItem value="1000+">1000+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="founded">Year Founded</Label>
        <Input id="founded" type="number" placeholder="2020" />
      </div>
      
      <Button onClick={onNext} className="w-full mt-4">
        Continue <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const ProductInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [productType, setProductType] = useState<string>("");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="product-category">Product/Service Category</Label>
        <Select>
          <SelectTrigger id="product-category">
            <SelectValue placeholder="Select product category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software">Software</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Product/Service Type</Label>
        <RadioGroup defaultValue={productType} onValueChange={setProductType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="physical" id="physical" />
            <Label htmlFor="physical">Physical Product</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="digital" id="digital" />
            <Label htmlFor="digital">Digital Product</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="service" id="service" />
            <Label htmlFor="service">Service</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="target-market">Target Market</Label>
        <Select>
          <SelectTrigger id="target-market">
            <SelectValue placeholder="Select target market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="b2b">Business to Business (B2B)</SelectItem>
            <SelectItem value="b2c">Business to Consumer (B2C)</SelectItem>
            <SelectItem value="b2g">Business to Government (B2G)</SelectItem>
            <SelectItem value="multi">Multiple Markets</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Key Features</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="feature1" />
            <Label htmlFor="feature1">User-friendly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature2" />
            <Label htmlFor="feature2">Cost-effective</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature3" />
            <Label htmlFor="feature3">Innovative</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature4" />
            <Label htmlFor="feature4">Scalable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature5" />
            <Label htmlFor="feature5">High quality</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature6" />
            <Label htmlFor="feature6">Eco-friendly</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="product-description">Product/Service Description</Label>
        <Textarea 
          id="product-description" 
          placeholder="Describe your product/service in detail..."
          rows={4}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CompetitorInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [competitors, setCompetitors] = useState([{ name: '', website: '', strengths: '', weaknesses: '' }]);
  
  const addCompetitor = () => {
    setCompetitors([...competitors, { name: '', website: '', strengths: '', weaknesses: '' }]);
  };
  
  const updateCompetitor = (index: number, field: string, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = { ...newCompetitors[index], [field]: value };
    setCompetitors(newCompetitors);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Competitor Information</Label>
          <Button type="button" variant="outline" size="sm" onClick={addCompetitor}>
            Add Another
          </Button>
        </div>
        
        {competitors.map((competitor, index) => (
          <Card key={index} className="animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Competitor {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`competitor-name-${index}`}>Competitor Name</Label>
                <Input 
                  id={`competitor-name-${index}`} 
                  value={competitor.name}
                  onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                  placeholder="Competitor Inc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`competitor-website-${index}`}>Competitor Website</Label>
                <Input 
                  id={`competitor-website-${index}`} 
                  value={competitor.website}
                  onChange={(e) => updateCompetitor(index, 'website', e.target.value)}
                  placeholder="https://competitor.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`competitor-strengths-${index}`}>Key Strengths</Label>
                <Textarea 
                  id={`competitor-strengths-${index}`} 
                  value={competitor.strengths}
                  onChange={(e) => updateCompetitor(index, 'strengths', e.target.value)}
                  placeholder="What are they known for? What do they do well?"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`competitor-weaknesses-${index}`}>Known Weaknesses</Label>
                <Textarea 
                  id={`competitor-weaknesses-${index}`} 
                  value={competitor.weaknesses}
                  onChange={(e) => updateCompetitor(index, 'weaknesses', e.target.value)}
                  placeholder="Where do they fall short? What are their limitations?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const AnalysisPreferencesStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <Label>Metrics You Want to Analyze</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="metric1" />
            <Label htmlFor="metric1">Revenue & Sales</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="metric2" />
            <Label htmlFor="metric2">Market Trends</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="metric3" />
            <Label htmlFor="metric3">Customer Feedback</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="metric4" />
            <Label htmlFor="metric4">Product Performance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="metric5" />
            <Label htmlFor="metric5">Competitor Analysis</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Type of Recommendations</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="rec1" />
            <Label htmlFor="rec1">Product Improvement</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rec2" />
            <Label htmlFor="rec2">Pricing Strategy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rec3" />
            <Label htmlFor="rec3">Marketing Insights</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rec4" />
            <Label htmlFor="rec4">Operational Efficiency</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rec5" />
            <Label htmlFor="rec5">Customer Experience</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="analysis-frequency">Analysis Frequency</Label>
        <Select>
          <SelectTrigger id="analysis-frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additional-notes">Additional Notes</Label>
        <Textarea 
          id="additional-notes" 
          placeholder="Any specific areas you want our analysis to focus on..."
          rows={4}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ReviewSubmitStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-md bg-blue-50 p-4 text-blue-800">
        <h3 className="font-medium mb-2">Review Your Information</h3>
        <p className="text-sm">
          Please review all the information you've provided. Once submitted, your personalized dashboard will be created
          based on these details.
        </p>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Building className="mr-2 h-4 w-4" /> Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Company:</span> Acme Inc.</p>
            <p><span className="font-medium">Industry:</span> Technology</p>
            <p><span className="font-medium">Business Type:</span> SME</p>
            <p><span className="font-medium">Size:</span> 11-50 employees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Package className="mr-2 h-4 w-4" /> Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Category:</span> Software</p>
            <p><span className="font-medium">Type:</span> Digital Product</p>
            <p><span className="font-medium">Target Market:</span> B2B</p>
            <p><span className="font-medium">Key Features:</span> User-friendly, Scalable, Innovative</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Users className="mr-2 h-4 w-4" /> Competitor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Main Competitors:</span> Competitor Inc., IndustryLeader LLC</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BarChart4 className="mr-2 h-4 w-4" /> Analysis Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Metrics:</span> Revenue & Sales, Market Trends, Customer Feedback</p>
            <p><span className="font-medium">Recommendations:</span> Product Improvement, Marketing Insights</p>
            <p><span className="font-medium">Frequency:</span> Weekly</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm">
          I agree to the Terms of Service and Privacy Policy
        </Label>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Submit <ClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      toast.success("Setup complete! Redirecting to dashboard...");
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-insight-600">
            Welcome to <span className="text-analysis-500">InsightGrowth</span>
          </h1>
          <p className="text-gray-600 mt-2">Let's set up your business profile</p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= i
                      ? 'border-insight-600 bg-insight-600 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-insight-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs">
            <span className={step >= 1 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Company</span>
            <span className={step >= 2 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Product</span>
            <span className={step >= 3 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Competitors</span>
            <span className={step >= 4 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Analysis</span>
            <span className={step >= 5 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Review</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Company Information'}
              {step === 2 && 'Product/Service Details'}
              {step === 3 && 'Competitor Analysis'}
              {step === 4 && 'Data Analysis Preferences'}
              {step === 5 && 'Review & Submit'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Describe what you offer to your customers'}
              {step === 3 && 'Identify your main competitors'}
              {step === 4 && 'Select your analysis preferences'}
              {step === 5 && 'Review your information and submit'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && <CompanyInfoStep onNext={handleNext} />}
            {step === 2 && <ProductInfoStep onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <CompetitorInfoStep onNext={handleNext} onBack={handleBack} />}
            {step === 4 && <AnalysisPreferencesStep onNext={handleNext} onBack={handleBack} />}
            {step === 5 && <ReviewSubmitStep onNext={handleNext} onBack={handleBack} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
