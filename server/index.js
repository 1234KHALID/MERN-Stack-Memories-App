import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./routes/user.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

if (!MONGO_URI) {
    console.error("MongoDB URI is not defined.");
    process.exit(1);
}

const { json, urlencoded } = bodyParser;
const app = express();
app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database is connected successfully!"))
  .catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
