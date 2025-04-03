
import { ObjectId } from 'mongodb';
import clientPromise from '@/config/db';

export interface Goal {
  _id?: string | ObjectId;
  title: string;
  description: string;
  progress: number;
  dueDate: Date;
  status: string;
  priority: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const goalsService = {
  // Get all goals
  getGoals: async (): Promise<Goal[]> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('goals');
      return await collection.find({}).toArray() as unknown as Goal[];
    } catch (error) {
      console.error('Error fetching goals:', error);
      return [];
    }
  },

  // Get a single goal by ID
  getGoal: async (id: string): Promise<Goal | null> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('goals');
      return await collection.findOne({ _id: new ObjectId(id) }) as unknown as Goal;
    } catch (error) {
      console.error(`Error fetching goal with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new goal
  createGoal: async (goal: Omit<Goal, '_id'>): Promise<Goal | null> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('goals');
      const newGoal = {
        ...goal,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await collection.insertOne(newGoal as any);
      return { ...newGoal, _id: result.insertedId } as unknown as Goal;
    } catch (error) {
      console.error('Error creating goal:', error);
      return null;
    }
  },

  // Update an existing goal
  updateGoal: async (id: string, goal: Partial<Goal>): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('goals');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...goal,
            updatedAt: new Date() 
          } 
        }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating goal with ID ${id}:`, error);
      return false;
    }
  },

  // Delete a goal
  deleteGoal: async (id: string): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('goals');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting goal with ID ${id}:`, error);
      return false;
    }
  }
};
