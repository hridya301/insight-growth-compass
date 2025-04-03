
import { MongoClient } from 'mongodb';

// Get MongoDB URI from environment variable
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || '';

// Check if the MongoDB URI is provided
if (!MONGODB_URI) {
  console.error('Please define the VITE_MONGODB_URI environment variable');
}

// Create a new MongoClient
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!client) {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
