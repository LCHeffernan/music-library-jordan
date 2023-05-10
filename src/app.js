const express = require("express");
const artistRouter = require("./routes/artist");
const app = express();
const morgan = require("morgan");

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/", morgan("dev"), artistRouter);

module.exports = app;
