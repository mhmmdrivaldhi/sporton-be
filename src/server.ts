import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || "no-port";
const MONGO_URI = process.env.MONGO_URI || "no_mongo_uri";

mongoose.connect(MONGO_URI).then(() => {
    console.log("successfully connected to MongoDB . . .")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("error connecting to MongoDB:", error);
})


