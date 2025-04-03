
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

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
      
      <Button onClick={onNext} className="w-full">
        Continue
      </Button>
    </div>
  );
};

const ProductInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [productType, setProductType] = useState<string>("");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="product-name">Product/Service Name</Label>
        <Input id="product-name" placeholder="Acme Cloud Platform" />
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
      
      {productType && (
        <div className="space-y-2 animate-scale-in">
          {productType === "physical" && (
            <>
              <Label htmlFor="manufacturing-details">Manufacturing Details</Label>
              <Select>
                <SelectTrigger id="manufacturing-details">
                  <SelectValue placeholder="Select manufacturing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-house">In-house manufacturing</SelectItem>
                  <SelectItem value="outsourced">Outsourced manufacturing</SelectItem>
                  <SelectItem value="hybrid">Hybrid model</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          
          {productType === "digital" && (
            <>
              <Label htmlFor="platform">Platform</Label>
              <Select>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="multi-platform">Multi-platform</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          
          {productType === "service" && (
            <>
              <Label htmlFor="service-delivery">Service Delivery</Label>
              <Select>
                <SelectTrigger id="service-delivery">
                  <SelectValue placeholder="Select service delivery model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      )}
      
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
      
      <div className="space-y-2">
        <Label htmlFor="product-description">Product/Service Description</Label>
        <Textarea 
          id="product-description" 
          placeholder="Describe your product/service in detail..."
          rows={4}
        />
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};

const CompetitorInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  const [competitors, setCompetitors] = useState([{ name: '', strengths: '', weaknesses: '' }]);
  
  const addCompetitor = () => {
    setCompetitors([...competitors, { name: '', strengths: '', weaknesses: '' }]);
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
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step < 3) {
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
              {[1, 2, 3].map((i) => (
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
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Company</span>
            <span className={step >= 2 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Product</span>
            <span className={step >= 3 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Competitors</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Company Information'}
              {step === 2 && 'Product/Service Details'}
              {step === 3 && 'Competitor Analysis'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Describe what you offer to your customers'}
              {step === 3 && 'Identify your main competitors'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && <CompanyInfoStep onNext={handleNext} />}
            {step === 2 && <ProductInfoStep onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <CompetitorInfoStep onNext={handleNext} onBack={handleBack} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
