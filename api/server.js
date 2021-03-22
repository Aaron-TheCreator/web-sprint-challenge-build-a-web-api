const express = require('express');
const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');
const server = express();

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req,res) => {
    res.status(200).send(`
    <h2>Welcome To The Server</h2>
    <p style="color:red; font-size: 2rem;">Glad You Could Make it!</p>
    `);
})

module.exports = server;
