const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./database");
const findProductRouter = require("./routes/products");
const findSingleProductRouter = require("./routes/singleProduct");
const cartRouter = require("./routes/cart");
const bodyParser = require("body-parser");
dotenv.config();

const server = express();

server.use(express.json());

server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log(process.env.PORT);

const PORT = process.env.PORT || 8000;

server.use(cors());

database();
server.get("/api", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

server.use("/api", findProductRouter);
server.use("/api", findSingleProductRouter);
server.use("/api", cartRouter);

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
