// import mangoose

const mongoose = require('mongoose')

//connection string of mongodb

const connectionString = process.env.DATABASE

// connect to mongodb mangoose

mongoose.connect(connectionString).then((res)=>{
    console.log(`mongodb connected successfully`);
}).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
})