const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./model/http-error");

const usersRoutes = require("./routes/userRoutes");

const server = express();

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

server.use("/api/users", usersRoutes);

server.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

mongoose
  .connect(
    "mongodb+srv://aleksa:aleksa96@cluster0.w5gbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
