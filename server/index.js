import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import postRoutes from "./routes/posts.js";
const { json, urlencoded } = bodyParser;
const app = express();
app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = "mongodb://localhost:27017/mern_stact";
const PORT = process.env.PORT || 5000;

connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database is connected successfully!"))
  .catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
