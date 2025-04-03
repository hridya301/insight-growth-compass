
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export interface TeamMember {
  id?: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  projects: number;
  projects_completed: number;
  tasks: number;
  tasks_completed: number;
  performance: number;
  availability: string;
  created_at?: string;
  updated_at?: string;
}

export const teamService = {
  // Get all team members
  getTeamMembers: async (): Promise<TeamMember[]> => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching team members:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },

  // Get a single team member by ID
  getTeamMember: async (id: string): Promise<TeamMember | null> => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching team member with ID ${id}:`, error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching team member with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new team member
  createTeamMember: async (member: Omit<TeamMember, 'id'>): Promise<TeamMember | null> => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating team member:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error creating team member:', error);
      return null;
    }
  },

  // Update an existing team member
  updateTeamMember: async (id: string, member: Partial<TeamMember>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update(member)
        .eq('id', id);
      
      if (error) {
        console.error(`Error updating team member with ID ${id}:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Error updating team member with ID ${id}:`, error);
      return false;
    }
  },

  // Delete a team member
  deleteTeamMember: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting team member with ID ${id}:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting team member with ID ${id}:`, error);
      return false;
    }
  }
};
