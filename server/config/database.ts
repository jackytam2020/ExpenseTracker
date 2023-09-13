import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        'MongoDB URI is not defined in the environment variables.'
      );
    }
    mongoose.connect(mongoUri);

    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
