const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const functionAPI = require('./functionAPIs');

// middlewares
app.use(cors());
app.use(express.json());

// inserting a new user
app.post('/users/(:id)', functionAPI.users);

// inserting leads
app.post('/users/(:user_id)/leads', functionAPI.leads);

// login 
app.put('/users/login', functionAPI.login);

// total stats
app.get('/agents/(:agent_id)/stats/', functionAPI.leadsStats);

// stats between date range
app.get('/leads/(:start_date)/(:end_date)', functionAPI.leadsFilter);

var server = http.createServer(app);

const port = 5000;
server.listen(port, function () {
    console.log((new Date()) + `: Server is listening on port ${port}`);
});