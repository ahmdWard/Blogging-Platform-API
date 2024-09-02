const dotenv= require('dotenv')
const mongoose= require('mongoose')
dotenv.config(); 

const app= require('./app');

const url= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASS)

mongoose.connect(url).then(()=>console.log('DB is sucessfully connected ! '))

const port= process.env.PORT || 8000

const server = app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
    
});

