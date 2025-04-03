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
import { ChevronRight, ChevronLeft, Building, Package, Users, BarChart4, ClipboardCheck, X, PlusCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type OnboardingStepProps = {
  onNext: () => void;
  onBack?: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
};

type ReviewSubmitStepProps = OnboardingStepProps & {
  setWebhookResponse: (response: string | null) => void;
  setWebhookError: (error: string | null) => void;
};

type ResponseStepProps = OnboardingStepProps & {
  webhookResponse: string | null;
  webhookError: string | null;
};

type Competitor = {
  name: string;
  website: string;
  strengths: string;
  weaknesses: string;
};

type FormData = {
  // Company Info
  companyName: string;
  industry: string;
  businessType: string;
  companySize: string;
  yearFounded: string;
  
  // Product Info
  productCategory: string;
  productType: string;
  targetMarket: string;
  keyFeatures: string[];
  productDescription: string;
  
  // Competitor Info
  competitors: Competitor[];
  
  // Analysis Preferences
  metricsToAnalyze: string[];
  recommendationTypes: string[];
  analysisFrequency: string;
  additionalNotes: string;
  
  // Terms Agreement
  termsAgreed: boolean;
};

const CompanyInfoStep: React.FC<OnboardingStepProps> = ({ onNext, formData, updateFormData }) => {
  const handleCompanyChange = (field: keyof Pick<FormData, 'companyName' | 'industry' | 'businessType' | 'companySize' | 'yearFounded'>, value: string) => {
    updateFormData({ [field]: value });
  };
  
  const isNextDisabled = !formData.companyName || !formData.industry || !formData.businessType || !formData.companySize;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="company-name" className="text-sm font-medium">Company Name</Label>
        <Input 
          id="company-name" 
          placeholder="Acme Inc." 
          value={formData.companyName}
          onChange={(e) => handleCompanyChange('companyName', e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
        <Select value={formData.industry} onValueChange={(value) => handleCompanyChange('industry', value)}>
          <SelectTrigger id="industry" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
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
        <Label htmlFor="business-type" className="text-sm font-medium">Business Type</Label>
        <Select value={formData.businessType} onValueChange={(value) => handleCompanyChange('businessType', value)}>
          <SelectTrigger id="business-type" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="sme">Small-Medium Enterprise (SME)</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company-size" className="text-sm font-medium">Company Size</Label>
        <Select value={formData.companySize} onValueChange={(value) => handleCompanyChange('companySize', value)}>
          <SelectTrigger id="company-size" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
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
        <Label htmlFor="founded" className="text-sm font-medium">Year Founded</Label>
        <Input 
          id="founded" 
          type="number" 
          placeholder="2020" 
          value={formData.yearFounded}
          onChange={(e) => handleCompanyChange('yearFounded', e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white"
        />
      </div>
      
      <Button 
        onClick={onNext} 
        className="w-full mt-8 bg-insight-600 hover:bg-insight-700 text-white"
        disabled={isNextDisabled}
      >
        Continue <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const ProductInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack, formData, updateFormData }) => {
  const handleKeyFeatureToggle = (feature: string) => {
    const current = formData.keyFeatures || [];
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature];
    
    updateFormData({ keyFeatures: updated });
  };
  
  const isFeatureSelected = (feature: string) => (formData.keyFeatures || []).includes(feature);
  
  const isNextDisabled = !formData.productCategory || !formData.productType || !formData.targetMarket || (formData.keyFeatures || []).length === 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="product-category" className="text-sm font-medium">Product/Service Category</Label>
        <Select value={formData.productCategory} onValueChange={(value) => updateFormData({ productCategory: value })}>
          <SelectTrigger id="product-category" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select product category" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
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
      
      <div className="bg-gray-50 p-4 rounded-lg my-4">
        <Label className="text-sm font-medium mb-3 block">Product/Service Type</Label>
        <RadioGroup 
          value={formData.productType} 
          onValueChange={(value) => updateFormData({ productType: value })} 
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="physical" id="physical" />
            <Label htmlFor="physical" className="cursor-pointer">Physical Product</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="digital" id="digital" />
            <Label htmlFor="digital" className="cursor-pointer">Digital Product</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="service" id="service" />
            <Label htmlFor="service" className="cursor-pointer">Service</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="target-market" className="text-sm font-medium">Target Market</Label>
        <Select value={formData.targetMarket} onValueChange={(value) => updateFormData({ targetMarket: value })}>
          <SelectTrigger id="target-market" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select target market" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
            <SelectItem value="b2b">Business to Business (B2B)</SelectItem>
            <SelectItem value="b2c">Business to Consumer (B2C)</SelectItem>
            <SelectItem value="b2g">Business to Government (B2G)</SelectItem>
            <SelectItem value="multi">Multiple Markets</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Key Features</Label>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature1" 
              checked={isFeatureSelected('User-friendly')}
              onCheckedChange={() => handleKeyFeatureToggle('User-friendly')}
            />
            <Label htmlFor="feature1" className="cursor-pointer">User-friendly</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature2" 
              checked={isFeatureSelected('Cost-effective')}
              onCheckedChange={() => handleKeyFeatureToggle('Cost-effective')}
            />
            <Label htmlFor="feature2" className="cursor-pointer">Cost-effective</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature3" 
              checked={isFeatureSelected('Innovative')}
              onCheckedChange={() => handleKeyFeatureToggle('Innovative')}
            />
            <Label htmlFor="feature3" className="cursor-pointer">Innovative</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature4" 
              checked={isFeatureSelected('Scalable')}
              onCheckedChange={() => handleKeyFeatureToggle('Scalable')}
            />
            <Label htmlFor="feature4" className="cursor-pointer">Scalable</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature5" 
              checked={isFeatureSelected('High quality')}
              onCheckedChange={() => handleKeyFeatureToggle('High quality')}
            />
            <Label htmlFor="feature5" className="cursor-pointer">High quality</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="feature6" 
              checked={isFeatureSelected('Eco-friendly')}
              onCheckedChange={() => handleKeyFeatureToggle('Eco-friendly')}
            />
            <Label htmlFor="feature6" className="cursor-pointer">Eco-friendly</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="product-description" className="text-sm font-medium">Product/Service Description</Label>
        <Textarea 
          id="product-description" 
          placeholder="Describe your product/service in detail..."
          value={formData.productDescription}
          onChange={(e) => updateFormData({ productDescription: e.target.value })}
          rows={4}
          className="w-full rounded-md border border-gray-200 bg-white resize-none"
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="border-gray-200">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-insight-600 hover:bg-insight-700 text-white"
          disabled={isNextDisabled}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CompetitorInfoStep: React.FC<OnboardingStepProps> = ({ onNext, onBack, formData, updateFormData }) => {
  const handleCompetitorChange = (index: number, field: keyof Competitor, value: string) => {
    const updatedCompetitors = [...(formData.competitors || [])];
    updatedCompetitors[index] = { 
      ...updatedCompetitors[index], 
      [field]: value 
    };
    updateFormData({ competitors: updatedCompetitors });
  };
  
  const addCompetitor = () => {
    const competitors = [...(formData.competitors || [])];
    competitors.push({ name: '', website: '', strengths: '', weaknesses: '' });
    updateFormData({ competitors: competitors });
  };
  
  const removeCompetitor = (index: number) => {
    if ((formData.competitors || []).length > 1) {
      const updatedCompetitors = [...(formData.competitors || [])];
      updatedCompetitors.splice(index, 1);
      updateFormData({ competitors: updatedCompetitors });
    }
  };
  
  const isNextDisabled = !formData.competitors || formData.competitors.length === 0 || 
    formData.competitors.some(c => !c.name || !c.website);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Competitor Information</Label>
          <Button type="button" variant="outline" size="sm" onClick={addCompetitor} className="flex items-center gap-1 border-gray-200 text-insight-600">
            <PlusCircle className="h-4 w-4" /> Add Competitor
          </Button>
        </div>
        
        {(formData.competitors || []).map((competitor, index) => (
          <Card key={index} className="animate-scale-in border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-md flex items-center">
                Competitor {index + 1}
              </CardTitle>
              {(formData.competitors || []).length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeCompetitor(index)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`competitor-name-${index}`} className="text-sm font-medium">Competitor Name</Label>
                  <Input 
                    id={`competitor-name-${index}`} 
                    value={competitor.name}
                    onChange={(e) => handleCompetitorChange(index, 'name', e.target.value)}
                    placeholder="Competitor Inc."
                    className="w-full rounded-md border border-gray-200 bg-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`competitor-website-${index}`} className="text-sm font-medium">Competitor Website</Label>
                  <Input 
                    id={`competitor-website-${index}`} 
                    value={competitor.website}
                    onChange={(e) => handleCompetitorChange(index, 'website', e.target.value)}
                    placeholder="https://competitor.com"
                    className="w-full rounded-md border border-gray-200 bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`competitor-strengths-${index}`} className="text-sm font-medium">Key Strengths</Label>
                <Textarea 
                  id={`competitor-strengths-${index}`} 
                  value={competitor.strengths}
                  onChange={(e) => handleCompetitorChange(index, 'strengths', e.target.value)}
                  placeholder="What are they known for? What do they do well?"
                  rows={2}
                  className="w-full rounded-md border border-gray-200 bg-white resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`competitor-weaknesses-${index}`} className="text-sm font-medium">Known Weaknesses</Label>
                <Textarea 
                  id={`competitor-weaknesses-${index}`} 
                  value={competitor.weaknesses}
                  onChange={(e) => handleCompetitorChange(index, 'weaknesses', e.target.value)}
                  placeholder="Where do they fall short? What are their limitations?"
                  rows={2}
                  className="w-full rounded-md border border-gray-200 bg-white resize-none"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="border-gray-200">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-insight-600 hover:bg-insight-700 text-white"
          disabled={isNextDisabled}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const AnalysisPreferencesStep: React.FC<OnboardingStepProps> = ({ onNext, onBack, formData, updateFormData }) => {
  const handleMetricToggle = (metric: string) => {
    const current = formData.metricsToAnalyze || [];
    const updated = current.includes(metric)
      ? current.filter(m => m !== metric)
      : [...current, metric];
    
    updateFormData({ metricsToAnalyze: updated });
  };
  
  const handleRecommendationToggle = (recommendation: string) => {
    const current = formData.recommendationTypes || [];
    const updated = current.includes(recommendation)
      ? current.filter(r => r !== recommendation)
      : [...current, recommendation];
    
    updateFormData({ recommendationTypes: updated });
  };
  
  const isMetricSelected = (metric: string) => (formData.metricsToAnalyze || []).includes(metric);
  const isRecommendationSelected = (recommendation: string) => (formData.recommendationTypes || []).includes(recommendation);
  
  const isNextDisabled = !formData.metricsToAnalyze || formData.metricsToAnalyze.length === 0 || 
    !formData.recommendationTypes || formData.recommendationTypes.length === 0 || 
    !formData.analysisFrequency;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <Label className="text-sm font-medium">Metrics You Want to Analyze</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="metric1" 
              checked={isMetricSelected('Revenue & Sales')}
              onCheckedChange={() => handleMetricToggle('Revenue & Sales')}
            />
            <Label htmlFor="metric1" className="cursor-pointer">Revenue & Sales</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="metric2" 
              checked={isMetricSelected('Market Trends')}
              onCheckedChange={() => handleMetricToggle('Market Trends')}
            />
            <Label htmlFor="metric2" className="cursor-pointer">Market Trends</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="metric3" 
              checked={isMetricSelected('Customer Feedback')}
              onCheckedChange={() => handleMetricToggle('Customer Feedback')}
            />
            <Label htmlFor="metric3" className="cursor-pointer">Customer Feedback</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="metric4" 
              checked={isMetricSelected('Product Performance')}
              onCheckedChange={() => handleMetricToggle('Product Performance')}
            />
            <Label htmlFor="metric4" className="cursor-pointer">Product Performance</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="metric5" 
              checked={isMetricSelected('Competitor Analysis')}
              onCheckedChange={() => handleMetricToggle('Competitor Analysis')}
            />
            <Label htmlFor="metric5" className="cursor-pointer">Competitor Analysis</Label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <Label className="text-sm font-medium">Type of Recommendations</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="rec1" 
              checked={isRecommendationSelected('Product Improvement')}
              onCheckedChange={() => handleRecommendationToggle('Product Improvement')}
            />
            <Label htmlFor="rec1" className="cursor-pointer">Product Improvement</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="rec2" 
              checked={isRecommendationSelected('Pricing Strategy')}
              onCheckedChange={() => handleRecommendationToggle('Pricing Strategy')}
            />
            <Label htmlFor="rec2" className="cursor-pointer">Pricing Strategy</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="rec3" 
              checked={isRecommendationSelected('Marketing Insights')}
              onCheckedChange={() => handleRecommendationToggle('Marketing Insights')}
            />
            <Label htmlFor="rec3" className="cursor-pointer">Marketing Insights</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="rec4" 
              checked={isRecommendationSelected('Operational Efficiency')}
              onCheckedChange={() => handleRecommendationToggle('Operational Efficiency')}
            />
            <Label htmlFor="rec4" className="cursor-pointer">Operational Efficiency</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Checkbox 
              id="rec5" 
              checked={isRecommendationSelected('Customer Experience')}
              onCheckedChange={() => handleRecommendationToggle('Customer Experience')}
            />
            <Label htmlFor="rec5" className="cursor-pointer">Customer Experience</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="analysis-frequency" className="text-sm font-medium">Analysis Frequency</Label>
        <Select value={formData.analysisFrequency} onValueChange={(value) => updateFormData({ analysisFrequency: value })}>
          <SelectTrigger id="analysis-frequency" className="w-full rounded-md border border-gray-200 bg-white">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additional-notes" className="text-sm font-medium">Additional Notes</Label>
        <Textarea 
          id="additional-notes" 
          placeholder="Any specific areas you want our analysis to focus on..."
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-gray-200 bg-white resize-none"
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="border-gray-200">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-insight-600 hover:bg-insight-700 text-white"
          disabled={isNextDisabled}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ onNext, onBack, formData, updateFormData, setWebhookResponse, setWebhookError }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setWebhookResponse(null);
    setWebhookError(null);
    
    try {
      const response = await fetch('https://hridya.app.n8n.cloud/webhook-test/a26abbb7-25d4-4a7e-8d18-d3e97d82cee8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        // Only extract the "output" field from the response
        if (responseData && responseData.output) {
          setWebhookResponse(responseData.output);
        } else {
          setWebhookResponse("No output data received");
        }
        toast.success("Setup complete! Your response has been received.");
        onNext(); // Move to the response step
      } else {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        setWebhookError(errorMessage);
        toast.error("There was an error submitting your data. Please try again.");
      }
    } catch (error) {
      const errorMessage = `Error: ${error instanceof Error ? error.message : String(error)}`;
      setWebhookError(errorMessage);
      console.error("Error submitting form:", error);
      toast.error("Connection error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-md bg-blue-50 p-5 text-blue-800">
        <h3 className="font-medium mb-2">Review Your Information</h3>
        <p className="text-sm">
          Please review all the information you've provided. Once submitted, your personalized dashboard will be created
          based on these details.
        </p>
      </div>
      
      <div className="space-y-4">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Building className="mr-2 h-4 w-4" /> Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Company:</span> {formData.companyName}</p>
            <p><span className="font-medium">Industry:</span> {formData.industry}</p>
            <p><span className="font-medium">Business Type:</span> {formData.businessType}</p>
            <p><span className="font-medium">Size:</span> {formData.companySize}</p>
            {formData.yearFounded && (
              <p><span className="font-medium">Founded:</span> {formData.yearFounded}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Package className="mr-2 h-4 w-4" /> Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Category:</span> {formData.productCategory}</p>
            <p><span className="font-medium">Type:</span> {formData.productType}</p>
            <p><span className="font-medium">Target Market:</span> {formData.targetMarket}</p>
            <p><span className="font-medium">Key Features:</span> {(formData.keyFeatures || []).join(', ')}</p>
            {formData.productDescription && (
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-gray-600">{formData.productDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Users className="mr-2 h-4 w-4" /> Competitor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p><span className="font-medium">Main Competitors:</span> {(formData.competitors || []).map(c => c.name).join(', ')}</p>
            {(formData.competitors || []).length > 0 && (
              <div className="mt-2 space-y-2">
                {(formData.competitors || []).map((competitor, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">{competitor.name}</p>
                    <p className="text-xs text-blue-600">{competitor.website}</p>
                    {competitor.strengths && (
                      <p className="mt-1 text-xs"><span className="font-medium">Strengths:</span> {competitor.strengths}</p>
                    )}
                    {competitor.weaknesses && (
                      <p className="text-xs"><span className="font-medium">Weaknesses:</span> {competitor.weaknesses}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BarChart4 className="mr-2 h-4 w-4" /> Analysis Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="font-medium">Metrics:</span> {(formData.metricsToAnalyze || []).join(', ')}</p>
            <p><span className="font-medium">Recommendations:</span> {(formData.recommendationTypes || []).join(', ')}</p>
            <p><span className="font-medium">Frequency:</span> {formData.analysisFrequency}</p>
            {formData.additionalNotes && (
              <div className="mt-2">
                <span className="font-medium">Additional Notes:</span>
                <p className="mt-1 text-gray-600">{formData.additionalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center space-x-2 mt-6 p-3 bg-gray-50 rounded-md">
        <Checkbox 
          id="terms" 
          checked={formData.termsAgreed}
          onCheckedChange={(checked) => updateFormData({ termsAgreed: checked as boolean })}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the Terms of Service and Privacy Policy
        </Label>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="border-gray-200" disabled={isSubmitting}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting || !formData.termsAgreed}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              Submit <ClipboardCheck className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {webhookError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Submission Error</AlertTitle>
          <AlertDescription>
            {webhookError}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const ResponseStep: React.FC<ResponseStepProps> = ({ onNext, onBack, formData, updateFormData, webhookResponse, webhookError }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-md bg-green-50 p-5 text-green-800">
        <h3 className="font-medium mb-2">Setup Complete!</h3>
        <p className="text-sm">
          Thank you for providing your information. Below is your personalized response.
        </p>
      </div>
      
      {webhookResponse && (
        <Card className="border border-green-200 shadow-md bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-green-800">
              <ClipboardCheck className="mr-2 h-4 w-4" /> Here is your Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-md text-sm overflow-x-auto border border-green-100 whitespace-pre-wrap">
              {webhookResponse}
            </div>
          </CardContent>
        </Card>
      )}
      
      {webhookError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Submission Error</AlertTitle>
          <AlertDescription>
            {webhookError}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="border-gray-200">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Review
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-insight-600 hover:bg-insight-700 text-white"
        >
          Go to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [webhookResponse, setWebhookResponse] = useState<string | null>(null);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    // Company Info
    companyName: '',
    industry: '',
    businessType: '',
    companySize: '',
    yearFounded: '',
    
    // Product Info
    productCategory: '',
    productType: '',
    targetMarket: '',
    keyFeatures: [],
    productDescription: '',
    
    // Competitor Info
    competitors: [{ name: '', website: '', strengths: '', weaknesses: '' }],
    
    // Analysis Preferences
    metricsToAnalyze: [],
    recommendationTypes: [],
    analysisFrequency: '',
    additionalNotes: '',
    
    // Terms Agreement
    termsAgreed: false
  });
  
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to <span className="text-insight-600">InsightGrowth</span>
          </h1>
          <p className="text-gray-600 mt-2">Let's set up your business profile</p>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= i
                      ? 'border-insight-600 bg-insight-600 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  } transition-colors duration-200`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-insight-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs font-medium">
            <span className={step >= 1 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Company</span>
            <span className={step >= 2 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Product</span>
            <span className={step >= 3 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Competitors</span>
            <span className={step >= 4 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Analysis</span>
            <span className={step >= 5 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Review</span>
            <span className={step >= 6 ? 'text-insight-600 font-medium' : 'text-gray-500'}>Response</span>
          </div>
        </div>
        
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-xl text-gray-900">
              {step === 1 && 'Company Information'}
              {step === 2 && 'Product/Service Details'}
              {step === 3 && 'Competitor Analysis'}
              {step === 4 && 'Data Analysis Preferences'}
              {step === 5 && 'Review & Submit'}
              {step === 6 && 'Your Personalized Response'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Describe what you offer to your customers'}
              {step === 3 && 'Identify your main competitors'}
              {step === 4 && 'Select your analysis preferences'}
              {step === 5 && 'Review your information and submit'}
              {step === 6 && 'Your personalized insights based on your information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {step === 1 && <CompanyInfoStep onNext={handleNext} formData={formData} updateFormData={updateFormData} />}
            {step === 2 && <ProductInfoStep onNext={handleNext} onBack={handleBack} formData={formData} updateFormData={updateFormData} />}
            {step === 3 && <CompetitorInfoStep onNext={handleNext} onBack={handleBack} formData={formData} updateFormData={updateFormData} />}
            {step === 4 && <AnalysisPreferencesStep onNext={handleNext} onBack={handleBack} formData={formData} updateFormData={updateFormData} />}
            {step === 5 && (
              <ReviewSubmitStep 
                onNext={handleNext} 
                onBack={handleBack} 
                formData={formData} 
                updateFormData={updateFormData} 
                setWebhookResponse={setWebhookResponse}
                setWebhookError={setWebhookError}
              />
            )}
            {step === 6 && (
              <ResponseStep 
                onNext={handleNext} 
                onBack={handleBack} 
                formData={formData} 
                updateFormData={updateFormData}
                webhookResponse={webhookResponse}
                webhookError={webhookError}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
