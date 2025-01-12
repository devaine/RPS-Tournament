const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Console } = require("console");
const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'});

const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'rps_test',
  password:process.env.PASSWORD,
  port:5432
})

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",//frontend location
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);



  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`room ${data.room} joined`)
    pool.query(`INSERT INTO game(name,ID) VALUES(${data.name},${socket.id})`,(error,res)=>{
      if(error){console.log(error)}
      else{
        res.status(201).send("CREATED TABLE");
      }
    })
  });

  socket.on("create_match",(data)=>{
    

    
  });

  
  
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});