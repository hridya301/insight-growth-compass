
// Mock database client for browser environment
class MockMongoClient {
  private connected = false;
  private mockDb: any = null;

  constructor() {
    this.mockDb = {
      db: (name: string) => ({
        collection: (collectionName: string) => ({
          find: () => ({
            toArray: async () => {
              console.log(`Mock query on ${name}.${collectionName}`);
              return [];
            }
          }),
          findOne: async () => {
            console.log(`Mock findOne on ${name}.${collectionName}`);
            return null;
          },
          insertOne: async (doc: any) => {
            console.log(`Mock insertOne on ${name}.${collectionName}`, doc);
            return { insertedId: 'mock-id-' + Date.now() };
          },
          insertMany: async (docs: any[]) => {
            console.log(`Mock insertMany on ${name}.${collectionName}`, docs);
            return { insertedCount: docs.length };
          },
          updateOne: async (filter: any, update: any) => {
            console.log(`Mock updateOne on ${name}.${collectionName}`, { filter, update });
            return { modifiedCount: 1 };
          },
          deleteOne: async (filter: any) => {
            console.log(`Mock deleteOne on ${name}.${collectionName}`, filter);
            return { deletedCount: 1 };
          },
          deleteMany: async (filter: any) => {
            console.log(`Mock deleteMany on ${name}.${collectionName}`, filter);
            return { deletedCount: 5 };
          },
          command: async (command: any) => {
            console.log(`Mock command on ${name}`, command);
            return { ok: 1 };
          }
        })
      }),
      command: async (command: any) => {
        console.log('Mock command', command);
        return { ok: 1 };
      }
    };
  }

  connect() {
    console.log('Mock MongoDB client connected');
    this.connected = true;
    return Promise.resolve(this);
  }

  db(name?: string) {
    return this.mockDb.db(name || 'mockDb');
  }

  close() {
    console.log('Mock MongoDB client closed');
    this.connected = false;
    return Promise.resolve();
  }
}

// In browser environment, use a mock client
const client = new MockMongoClient();
const clientPromise = client.connect();

export default clientPromise;
