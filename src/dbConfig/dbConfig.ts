import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error :", error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB :", error);
  }
}

export async function disconnectDB() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected successfully");
    }
  } catch (error) {
    console.log("Something went wrong in disconnecting to DB :", error);
  }
}
