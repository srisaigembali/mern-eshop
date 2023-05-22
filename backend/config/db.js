import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    // console.log(`Connected tp mongodb database ${conn.connection.host}`);
  } catch (error) {
    // console.log(`Error while connecting to mongodb ${error}`);
  }
};

export default connectDB;
