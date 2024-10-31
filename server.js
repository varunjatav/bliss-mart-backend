const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./database');
const findProductRouter = require('./routes/products');

dotenv.config();

const server = express();

console.log(process.env.PORT);

const PORT = process.env.PORT || 8000

server.use(cors());

database();
server.get('/api', (req, res) => {
    res.send('<h1>Hello from server</h1>')
});

server.use("/api",findProductRouter);


server.listen(PORT,() => { console.log('listening on port', PORT)});