import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};