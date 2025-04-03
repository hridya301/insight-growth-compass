
import { supabase } from '@/integrations/supabase/client';

export interface Goal {
  id?: string;
  title: string;
  description: string;
  progress: number;
  due_date: Date | string;
  status: string;
  priority: string;
  category: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const goalsService = {
  // Get all goals
  getGoals: async (): Promise<Goal[]> => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching goals:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching goals:', error);
      return [];
    }
  },

  // Get a single goal by ID
  getGoal: async (id: string): Promise<Goal | null> => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching goal with ID ${id}:`, error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching goal with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new goal
  createGoal: async (goal: Omit<Goal, 'id'>): Promise<Goal | null> => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([goal])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating goal:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error creating goal:', error);
      return null;
    }
  },

  // Update an existing goal
  updateGoal: async (id: string, goal: Partial<Goal>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          ...goal,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        console.error(`Error updating goal with ID ${id}:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Error updating goal with ID ${id}:`, error);
      return false;
    }
  },

  // Delete a goal
  deleteGoal: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting goal with ID ${id}:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting goal with ID ${id}:`, error);
      return false;
    }
  }
};
