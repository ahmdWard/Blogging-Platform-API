const dotenv= require('dotenv')

dotenv.config(); 

const  postgres = require('pg');

const app= require('./app')

const client = new postgres.Client({
	user:process.env.DATABASE_USER,
	password:process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_host,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE_NAME,
});

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

const port= process.env.PORT || 8000

const server = app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
    
});

