const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const app = express();
app.use(express.json());

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_URI,
  key: process.env.COSMOS_DB_KEY,
});

const database = client.database('ntmscosmos');

// GET health check
app.get('/', (req, res) => {
  res.send('Exam App Backend is running');
});

// GET all users (test Cosmos DB connection)
app.get('/users', async (req, res) => {
  const container = database.container('Users');
  const { resources: users } = await container.items.query('SELECT * FROM c').fetchAll();
  res.json(users);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
