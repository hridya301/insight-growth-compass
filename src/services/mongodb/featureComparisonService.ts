
import { ObjectId } from 'mongodb';
import clientPromise from '@/config/db';

export interface FeatureComparison {
  _id?: string | ObjectId;
  feature: string;
  yourProduct: boolean;
  competitors: {
    name: string;
    hasFeature: boolean;
  }[];
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const featureComparisonService = {
  // Get all features
  getFeatures: async (): Promise<FeatureComparison[]> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('featureComparisons');
      return await collection.find({}).toArray() as unknown as FeatureComparison[];
    } catch (error) {
      console.error('Error fetching feature comparisons:', error);
      return [];
    }
  },

  // Create or update features
  saveFeatures: async (features: Omit<FeatureComparison, '_id'>[]): Promise<boolean> => {
    try {
      const client = await clientPromise;
      const collection = client.db('goalTracker').collection('featureComparisons');
      
      // First clear existing features
      await collection.deleteMany({});
      
      // Then insert the new ones
      const featuresWithTimestamps = features.map(feature => ({
        ...feature,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      await collection.insertMany(featuresWithTimestamps as any[]);
      return true;
    } catch (error) {
      console.error('Error saving feature comparisons:', error);
      return false;
    }
  }
};
