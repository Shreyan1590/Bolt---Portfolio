// lib/mongodb.ts
import { MongoClient, Db, MongoClientOptions } from 'mongodb';

interface MongoDBConnection {
  db: Db;
  client: MongoClient;
}

// Type for our cached connection promise
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10, // Default pool size
  socketTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

function createClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection
    // across module reloads caused by HMR (Hot Module Replacement)
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, create a new connection
    const client = new MongoClient(uri, options);
    return client.connect();
  }
}

clientPromise = createClientPromise();

export async function connectToDatabase(): Promise<MongoDBConnection> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Set the cached connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  }
});

// Optional: Connection health check
export async function checkConnection(): Promise<boolean> {
  try {
    const { client } = await connectToDatabase();
    await client.db().admin().ping();
    return true;
  } catch {
    return false;
  }
}