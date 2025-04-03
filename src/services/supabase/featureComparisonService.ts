
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export interface FeatureComparison {
  id?: string;
  feature: string;
  your_product: boolean;
  competitors: {
    name: string;
    hasFeature: boolean;
  }[];
  category?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const featureComparisonService = {
  // Get all features
  getFeatures: async (): Promise<FeatureComparison[]> => {
    try {
      const { data, error } = await supabase
        .from('feature_comparisons')
        .select('*');
      
      if (error) {
        console.error('Error fetching feature comparisons:', error);
        return [];
      }
      
      return data.map(item => ({
        id: item.id,
        feature: item.feature,
        your_product: item.your_product,
        competitors: item.competitors as {name: string; hasFeature: boolean;}[],
        category: item.category,
        created_at: item.created_at,
        updated_at: item.updated_at
      })) || [];
    } catch (error) {
      console.error('Error fetching feature comparisons:', error);
      return [];
    }
  },

  // Create or update features
  saveFeatures: async (features: Omit<FeatureComparison, 'id'>[]): Promise<boolean> => {
    try {
      // First clear existing features
      const { error: deleteError } = await supabase
        .from('feature_comparisons')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // This will delete all rows
      
      if (deleteError) {
        console.error('Error deleting existing feature comparisons:', deleteError);
        return false;
      }
      
      // Then insert the new ones
      const { error: insertError } = await supabase
        .from('feature_comparisons')
        .insert(features.map(feature => ({
          feature: feature.feature,
          your_product: feature.your_product,
          competitors: feature.competitors,
          category: feature.category
        })));
      
      if (insertError) {
        console.error('Error inserting feature comparisons:', insertError);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving feature comparisons:', error);
      return false;
    }
  }
};
