const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/zoos', (req, res) => {
    db('zoos')
	.then(zoos => {
	    res.status(200).json(zoos);
	})
	.catch(err  => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

