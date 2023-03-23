import mongoose from 'mongoose';
import config from 'config';


const dbUrl = `mongodb://${config.get('dbUser')}:${config.get(
  'dbPass'
)}@localhost:6000/${config.get('dbName')}?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
