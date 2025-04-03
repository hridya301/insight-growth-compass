
import { ObjectId } from 'mongodb';
import clientPromise from '@/config/db';

export interface AttributeComparison {
  _id?: string | ObjectId;
  attribute: string;
  yourProduct: number;
  competitors: {
    name: string;
    score: number;
  }[];
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const attributeComparisonService = {
  // Get all attributes
  getAttributes: async (): Promise<AttributeComparison[]> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('attributeComparisons');
      return await collection.find({}).toArray() as unknown as AttributeComparison[];
    } catch (error) {
      console.error('Error fetching attribute comparisons:', error);
      return [];
    }
  },

  // Create or update attributes
  saveAttributes: async (attributes: Omit<AttributeComparison, '_id'>[]): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('attributeComparisons');
      
      // First clear existing attributes
      await collection.deleteMany({});
      
      // Then insert the new ones
      const attributesWithTimestamps = attributes.map(attribute => ({
        ...attribute,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      await collection.insertMany(attributesWithTimestamps as any[]);
      return true;
    } catch (error) {
      console.error('Error saving attribute comparisons:', error);
      return false;
    }
  }
};
