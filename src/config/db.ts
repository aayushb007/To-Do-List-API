import mongoose from 'mongoose';


const options: { useNewUrlParser: true; serverSelectionTimeoutMS: number;socketTimeoutMS: number; connectTimeoutMS: number }= {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,      
    connectTimeoutMS: 30000,     
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