
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user');

const postRoutes = require('./routes/posts');

// console.log(postRoutes, "postRoutes");
const app = express();
// { limit: '30mb', extended: true }
// { limit: '30mb', extended: true }
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRouter);

const CONNECTION_URL = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database is connected successfully!"))
  .catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

// mongoose.set('useFindAndModify', false);