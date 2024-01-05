//1) import dotenv
/* Loads .env file contents into process.env by default. */
require('dotenv').config()


//2) import express-ti create server

const express=require('express')


//3) import cors

const cors=require('cors')

//import router

const router= require('./Routes/router')

//import connection .js file

require('./DB/connection')

//4) create server
const pfServer = express()

//5) use of cors by server

pfServer.use(cors())

//6) returns middleware that only parses json and convert it into javascript object
pfServer.use(express.json())

// server use routes
pfServer.use(router)

//pf server should use uploadds folder
// first arg- how the other application should use this file 
// sec arg to export the uploads folder
pfServer.use('/Uploads',express.static('./Uploads'))

//7 custome the port - bydefault run-3000
const PORT=5000 || process.env.PORT

//8)run server
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//9) GET HTTP request//http://localhost:4000/
pfServer.get('/',(req,res)=>{
   res.send('<h1 style="color:blue">project fair server running successfully and waiting for the client request</h1>')
 })
 /*  pfServer.post('/',(req,res)=>{
    res.send('post request')
 })
 //put
 pfServer.put('/',(req,res)=>{
    res.send('put request')
 }) 
 */
