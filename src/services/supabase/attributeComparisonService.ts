
import { supabase } from '@/integrations/supabase/client';

export interface AttributeComparison {
  id?: string;
  attribute: string;
  your_product: number;
  competitors: {
    name: string;
    score: number;
  }[];
  category?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const attributeComparisonService = {
  // Get all attributes
  getAttributes: async (): Promise<AttributeComparison[]> => {
    try {
      const { data, error } = await supabase
        .from('attribute_comparisons')
        .select('*');
      
      if (error) {
        console.error('Error fetching attribute comparisons:', error);
        return [];
      }
      
      return data.map(item => ({
        id: item.id,
        attribute: item.attribute,
        your_product: item.your_product,
        competitors: item.competitors,
        category: item.category,
        created_at: item.created_at,
        updated_at: item.updated_at
      })) || [];
    } catch (error) {
      console.error('Error fetching attribute comparisons:', error);
      return [];
    }
  },

  // Create or update attributes
  saveAttributes: async (attributes: Omit<AttributeComparison, 'id'>[]): Promise<boolean> => {
    try {
      // First clear existing attributes
      const { error: deleteError } = await supabase
        .from('attribute_comparisons')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // This will delete all rows
      
      if (deleteError) {
        console.error('Error deleting existing attribute comparisons:', deleteError);
        return false;
      }
      
      // Then insert the new ones
      const { error: insertError } = await supabase
        .from('attribute_comparisons')
        .insert(attributes.map(attribute => ({
          attribute: attribute.attribute,
          your_product: attribute.your_product,
          competitors: attribute.competitors,
          category: attribute.category
        })));
      
      if (insertError) {
        console.error('Error inserting attribute comparisons:', insertError);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving attribute comparisons:', error);
      return false;
    }
  }
};
