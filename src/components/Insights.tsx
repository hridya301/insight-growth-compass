import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  Check, 
  X, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight,
  BarChart,
  LineChart,
  PieChart,
  Users,
  ShoppingBag
} from 'lucide-react';

type InsightItemProps = {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  type: 'opportunity' | 'risk' | 'strength' | 'weakness';
  category: string;
};

const InsightItem: React.FC<InsightItemProps> = ({
  title,
  description,
  impact,
  confidence,
  type,
  category,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<'thumbsUp' | 'thumbsDown' | null>(null);
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'risk':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'strength':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'weakness':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return '';
    }
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'medium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'low':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return '';
    }
  };
  
  const getIconByType = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Lightbulb size={16} />;
      case 'risk':
        return <AlertCircle size={16} />;
      case 'strength':
        return <Check size={16} />;
      case 'weakness':
        return <X size={16} />;
      default:
        return null;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Product':
        return <ShoppingBag size={16} />;
      case 'Market':
        return <BarChart size={16} />;
      case 'Customer':
        return <Users size={16} />;
      case 'Growth':
        return <TrendingUp size={16} />;
      case 'Performance':
        return <LineChart size={16} />;
      case 'Pricing':
        return <PieChart size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="mb-4 card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getBadgeColor(type)}>
              <span className="flex items-center space-x-1">
                {getIconByType(type)}
                <span className="capitalize">{type}</span>
              </span>
            </Badge>
            <Badge variant="outline" className={getImpactColor(impact)}>
              {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
            </Badge>
            <Badge variant="outline">
              <span className="flex items-center space-x-1">
                {getCategoryIcon(category)}
                <span>{category}</span>
              </span>
            </Badge>
          </div>
          <div>
            <Progress value={confidence} className="w-20 h-2" />
            <span className="text-xs text-muted-foreground">{confidence}% confidence</span>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          {expanded ? description : `${description.substring(0, 150)}...`}
        </p>
        {!expanded && (
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm" 
            onClick={() => setExpanded(true)}
          >
            Read more
          </Button>
        )}
        
        {expanded && (
          <div className="mt-4 space-y-4">
            <Separator />
            <div>
              <h4 className="font-medium mb-1">Recommended Action</h4>
              <p className="text-sm">
                Based on this insight, consider implementing a structured approach to gather and analyze customer feedback, focusing on specific product features.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Supporting Data</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Customer satisfaction surveys from Q2 showed 25% dissatisfaction with current features</li>
                <li>Competitor analysis reveals 3 key features present in competitive products but missing in yours</li>
                <li>Support tickets related to missing features increased by 15% in the last quarter</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      
      {expanded && (
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={feedback === 'thumbsUp' ? 'bg-green-50' : ''}
              onClick={() => setFeedback('thumbsUp')}
            >
              <ThumbsUp size={16} className="mr-1" /> Helpful
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={feedback === 'thumbsDown' ? 'bg-red-50' : ''}
              onClick={() => setFeedback('thumbsDown')}
            >
              <ThumbsDown size={16} className="mr-1" /> Not Helpful
            </Button>
          </div>
          <Button size="sm" className="flex items-center" variant="default">
            Take Action <ArrowRight size={16} className="ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export const Insights: React.FC = () => {
  return (
    <div className="p-6 w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <Button>
          <Lightbulb size={16} className="mr-2" /> Generate New Insights
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Insight Summary</CardTitle>
          <CardDescription>
            AI-powered analysis of your business data and competitor information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Opportunities</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-red-600">5</div>
              <div className="text-sm text-muted-foreground">Risks</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-muted-foreground">Strengths</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">7</div>
              <div className="text-sm text-muted-foreground">Weaknesses</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            <InsightItem
              title="Product feature gaps relative to competitors"
              description="Our analysis indicates that your product is missing key features that are present in 75% of competitor offerings. Specifically, advanced reporting capabilities, integration with third-party tools, and customizable dashboards are features that customers frequently mention in competitor reviews. Adding these features could significantly improve competitive positioning and address a common reason for customer churn."
              impact="high"
              confidence={89}
              type="opportunity"
              category="Product"
            />
            
            <InsightItem
              title="Price sensitivity in mid-market segment"
              description="Data shows that your conversion rate drops by 45% when targeting mid-market companies (50-200 employees) compared to small businesses. Competitor analysis reveals your pricing is 20-30% higher than alternatives for this segment. Consider introducing a mid-market specific tier or volume discounts to address this price sensitivity and capture more of this market."
              impact="medium"
              confidence={78}
              type="weakness"
              category="Pricing"
            />
            
            <InsightItem
              title="Customer support response time advantage"
              description="Your average support response time of 2.4 hours outperforms the industry average of 8.7 hours by a significant margin. Customer satisfaction scores for support (92%) are also well above industry benchmarks (74%). This represents a key competitive advantage that should be highlighted in marketing materials and sales conversations."
              impact="medium"
              confidence={93}
              type="strength"
              category="Customer"
            />
            
            <InsightItem
              title="Emerging competitor in enterprise segment"
              description="Competitor C has increased their enterprise customer acquisition rate by 156% in the last quarter, primarily targeting your existing customer base. Their recent funding round of $25M is being used to expand their enterprise sales team and develop features specifically requested by your enterprise customers. This represents a significant threat to your highest-value customer segment."
              impact="high"
              confidence={82}
              type="risk"
              category="Market"
            />
            
            <InsightItem
              title="Untapped market opportunity in healthcare vertical"
              description="Analysis of industry trends shows 27% growth in the healthcare technology sector, yet this vertical represents only 5% of your customer base. Competitor analysis reveals limited specialized solutions for healthcare compliance needs. There's a significant opportunity to develop industry-specific features and marketing to capture this growing market with relatively low competitive pressure."
              impact="high"
              confidence={87}
              type="opportunity"
              category="Growth"
            />
            
            <InsightItem
              title="Mobile usage trend misalignment"
              description="While 68% of your users access the product via mobile devices, only 15% of your development resources are allocated to mobile experience improvements. Customer satisfaction on mobile (67%) lags significantly behind desktop (89%). This misalignment may impact retention as industry trends show increasing mobile-first preferences."
              impact="medium"
              confidence={91}
              type="weakness"
              category="Product"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="opportunities" className="mt-6">
          {/* Filtered opportunities would appear here */}
          <div className="space-y-4">
            <InsightItem
              title="Product feature gaps relative to competitors"
              description="Our analysis indicates that your product is missing key features that are present in 75% of competitor offerings. Specifically, advanced reporting capabilities, integration with third-party tools, and customizable dashboards are features that customers frequently mention in competitor reviews. Adding these features could significantly improve competitive positioning and address a common reason for customer churn."
              impact="high"
              confidence={89}
              type="opportunity"
              category="Product"
            />
            
            <InsightItem
              title="Untapped market opportunity in healthcare vertical"
              description="Analysis of industry trends shows 27% growth in the healthcare technology sector, yet this vertical represents only 5% of your customer base. Competitor analysis reveals limited specialized solutions for healthcare compliance needs. There's a significant opportunity to develop industry-specific features and marketing to capture this growing market with relatively low competitive pressure."
              impact="high"
              confidence={87}
              type="opportunity"
              category="Growth"
            />
          </div>
        </TabsContent>
        
        {/* Other tab content would follow the same pattern */}
        <TabsContent value="risks" className="mt-6">
          <div className="space-y-4">
            <InsightItem
              title="Emerging competitor in enterprise segment"
              description="Competitor C has increased their enterprise customer acquisition rate by 156% in the last quarter, primarily targeting your existing customer base. Their recent funding round of $25M is being used to expand their enterprise sales team and develop features specifically requested by your enterprise customers. This represents a significant threat to your highest-value customer segment."
              impact="high"
              confidence={82}
              type="risk"
              category="Market"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="strengths" className="mt-6">
          <div className="space-y-4">
            <InsightItem
              title="Customer support response time advantage"
              description="Your average support response time of 2.4 hours outperforms the industry average of 8.7 hours by a significant margin. Customer satisfaction scores for support (92%) are also well above industry benchmarks (74%). This represents a key competitive advantage that should be highlighted in marketing materials and sales conversations."
              impact="medium"
              confidence={93}
              type="strength"
              category="Customer"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="weaknesses" className="mt-6">
          <div className="space-y-4">
            <InsightItem
              title="Price sensitivity in mid-market segment"
              description="Data shows that your conversion rate drops by 45% when targeting mid-market companies (50-200 employees) compared to small businesses. Competitor analysis reveals your pricing is 20-30% higher than alternatives for this segment. Consider introducing a mid-market specific tier or volume discounts to address this price sensitivity and capture more of this market."
              impact="medium"
              confidence={78}
              type="weakness"
              category="Pricing"
            />
            
            <InsightItem
              title="Mobile usage trend misalignment"
              description="While 68% of your users access the product via mobile devices, only 15% of your development resources are allocated to mobile experience improvements. Customer satisfaction on mobile (67%) lags significantly behind desktop (89%). This misalignment may impact retention as industry trends show increasing mobile-first preferences."
              impact="medium"
              confidence={91}
              type="weakness"
              category="Product"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Lightbulb className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No saved insights yet</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              Save important insights to reference them later
            </p>
            <Button variant="outline">
              Browse All Insights
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
