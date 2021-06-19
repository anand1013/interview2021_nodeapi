const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.set('views', path.join(__dirname + '/views'));
app.use(cors());

app.use(bodyParser.json());
const http = require('http').Server(app);  
const port = process.env.PORT || 8521;
const server = http.listen(port, () => console.log("Server Started on Port"));

const viewModule = require('./routes/viewmodule');
const apiModule = require('./routes/apimodule');

app.use("/", viewModule);
app.use("/api/v1", apiModule);

