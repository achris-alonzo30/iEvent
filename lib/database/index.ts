import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// It stores variables globally
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'iEvent',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
};

// We need to cached it so we can reuse the existing connection or try to create a new one.

