const express = require("express");
// const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
const app = express();
connectDB();

//init middleware
// app.use(logger);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/users", require("./routes/api/users"));

//test
app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}.`.blue.bold
  )
);
