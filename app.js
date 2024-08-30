const express=require('express')
const AppError= require('./utils/appError')
const morgan = require('morgan');

const app= express()


app.use(express.json())

app.use((req,res,next)=>{
    req.requestTime= new Date().toISOString();
    console.log(req.requestTime)
    next();
})

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

module.exports=app