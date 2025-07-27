import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `connected to mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`mongodb connection error ${error}`.bgRed.white);
  }
};

export default connectDb;
