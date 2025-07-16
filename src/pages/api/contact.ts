// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface SubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface ExtendedSubmission extends SubmissionData {
  createdAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Validate environment variables
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    console.error('Missing MongoDB configuration');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate request body
  const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const submissionData: SubmissionData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  };

  let client: MongoClient | null = null;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection<ExtendedSubmission>('submissions');

    const result = await collection.insertOne({
      ...submissionData,
      createdAt: new Date()
    });

    if (!result.acknowledged) {
      throw new Error('Insert operation not acknowledged');
    }

    return res.status(201).json({ 
      success: true,
      insertedId: result.insertedId
    });

  } catch (error) {
    console.error('Database operation failed:', error);
    return res.status(500).json({ 
      error: 'Failed to process your submission',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}