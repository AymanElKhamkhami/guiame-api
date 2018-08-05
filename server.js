const http = require('http'); //this is how we import packages in node.js (the old way)
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
