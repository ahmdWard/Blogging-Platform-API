const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
  }
};

const disconnectDB = async () => {
  try {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (err) {
    console.error('Error disconnecting from PostgreSQL database', err);
  }
};

module.exports = {
  client,
  connectDB,
  disconnectDB
};
