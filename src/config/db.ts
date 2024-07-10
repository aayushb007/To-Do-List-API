import mongoose from 'mongoose';

const options: { useNewUrlParser: boolean; serverSelectionTimeoutMS: number;socketTimeoutMS: number; connectTimeoutMS: number }= {
    useNewUrlParser: true, // use the new MongoDB connection string parser
    serverSelectionTimeoutMS: 30000, // If the server is not selected within 30 seconds, the connection attempt will fail
    socketTimeoutMS: 45000, //  If there's no activity on the socket for 45 seconds, the connection will be closed.   
    connectTimeoutMS: 30000,  // If the connection is not established within 30 seconds, the attempt will fail.
  };
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string, options);
    console.log('MongoDB Connected');
  } catch (err:any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnect;