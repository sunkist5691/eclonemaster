const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// fs is pre-installed library in Node.js
// so we don't need to npm install this.
// we can just import directly from Node.js
const { readdirSync } = require("fs");

require("dotenv").config();

// express() creates and return a new server to 'app'
const app = express();

// connect to mongoose database:
// first argument is connection URL,
// second argument is a config object
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("<----- MONGOOSE DB CONNECTED ----->"))
  .catch((err) => console.log(`DB CONNECTION ERROR: ${err}`));

// middlewares
app.use(morgan("dev"));
// express.json() 과 같이 모든 데이터를 json() 형태로 바꾸어준다
// If the client send a data, that data must be below 2mb
app.use(express.json());
app.use(cors());

// routes auto-loading middleware
// prefix all the '/api' as base path for using 'all the route files from routes folder' authomatically
// so we don't have manually import and export the router from every router files
// app.use('/api/, authRouter) 이런식으로 routes 폴더 안에 있는 모든 파일들을 import 하여 rendering 을 한다
readdirSync("./routes").map((eachRoutes) =>
  app.use("/api", require(`./routes/${eachRoutes}`))
);

// port
// if the process.env.PORT doesn't exist or having problem, then it automatically runs 8000
const port = process.env.PORT || 8000;

// run the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
// you can run the server typing 'node server.js' in terminal
// or do 'npm start' for 'nodemon server.js'
