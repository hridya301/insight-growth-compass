
import { ObjectId } from 'mongodb';
import clientPromise from '@/config/db';

export interface Competitor {
  _id?: string | ObjectId;
  name: string;
  logo: string;
  description: string;
  founded: number;
  employees: string;
  funding: string;
  locations: string[];
  strengths: string[];
  weaknesses: string[];
  marketShare: number;
  growthRate: number;
  customerSatisfaction: number;
  pricePoint: string;
  threat: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const competitorsService = {
  // Get all competitors
  getCompetitors: async (): Promise<Competitor[]> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('competitors');
      return await collection.find({}).toArray() as unknown as Competitor[];
    } catch (error) {
      console.error('Error fetching competitors:', error);
      return [];
    }
  },

  // Get a single competitor by ID
  getCompetitor: async (id: string): Promise<Competitor | null> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('competitors');
      return await collection.findOne({ _id: new ObjectId(id) }) as unknown as Competitor;
    } catch (error) {
      console.error(`Error fetching competitor with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new competitor
  createCompetitor: async (competitor: Omit<Competitor, '_id'>): Promise<Competitor | null> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('competitors');
      const newCompetitor = {
        ...competitor,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await collection.insertOne(newCompetitor as any);
      return { ...newCompetitor, _id: result.insertedId } as unknown as Competitor;
    } catch (error) {
      console.error('Error creating competitor:', error);
      return null;
    }
  },

  // Update an existing competitor
  updateCompetitor: async (id: string, competitor: Partial<Competitor>): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('competitors');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...competitor,
            updatedAt: new Date() 
          } 
        }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating competitor with ID ${id}:`, error);
      return false;
    }
  },

  // Delete a competitor
  deleteCompetitor: async (id: string): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('competitors');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting competitor with ID ${id}:`, error);
      return false;
    }
  }
};
