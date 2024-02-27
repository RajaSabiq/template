require('dotenv').config();
const express = require("express");
const routes = require("./src/routes");
const morgan = require("morgan");
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;
const http = require('http');

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: '*',
  })
);
app.use(express.json());


const serverChat = http.createServer(app);

app.use('/api', routes);
serverChat.listen(port, () => {
  console.log(`Example app listening at http://localhost:${ port }`);
});