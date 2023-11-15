import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const dataBase = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to MongoDB Database ${dataBase.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
