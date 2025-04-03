
import { ObjectId } from 'mongodb';
import clientPromise from '@/config/db';

export interface MarketTrend {
  _id?: string | ObjectId;
  year: number;
  yourCompany: number;
  competitors: {
    name: string;
    marketShare: number;
  }[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const marketTrendsService = {
  // Get all market trends
  getTrends: async (): Promise<MarketTrend[]> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('marketTrends');
      return await collection.find({}).sort({ year: 1 }).toArray() as unknown as MarketTrend[];
    } catch (error) {
      console.error('Error fetching market trends:', error);
      return [];
    }
  },

  // Create or update market trends
  saveTrends: async (trends: Omit<MarketTrend, '_id'>[]): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('marketTrends');
      
      // First clear existing trends
      await collection.deleteMany({});
      
      // Then insert the new ones
      const trendsWithTimestamps = trends.map(trend => ({
        ...trend,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      await collection.insertMany(trendsWithTimestamps as any[]);
      return true;
    } catch (error) {
      console.error('Error saving market trends:', error);
      return false;
    }
  }
};
