const dotenv= require('dotenv')
const postgres= require('./db/dbConnections')
const app= require('./app')

dotenv.config(); 

postgres.connectDB()


const port= process.env.PORT || 8000

const server = app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
    
});

