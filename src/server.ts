import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(MONGO_URI).then(() => {
    console.log("successfully connected to MongoDB . . .")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("error connecting to MongoDB:", error);
    process.exit(1);
})


