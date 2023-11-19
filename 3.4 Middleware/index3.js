import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(logger);
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
