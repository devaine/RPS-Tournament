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

const evaluateWinner = (playerOneChoice,playerTwoChoice)=>{

}



io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('create-room',(data)=>{
    socket.join(data.room);
    pool.query("INSERT INTO games(id) VALUES ($1)",[data.room]);

    console.log(`Created Game with id ${data.room}`);
  });

  socket.on("join_room", async (data) => {
    const validRoom = await pool.query("SELECT g FROM games g WHERE g.id=$1  ",[data.room]);
    if(validRoom.rows.length){
      pool.query("INSERT INTO players(name,game_id,socket) VALUES($1,$2,$3)",[data.name,data.room,data.socket]);
      console.log(`Player ${data.name} joined game ${data.room}`)
    }else{
      console.log("Not a Valid Game");
    }
  });

  socket.on('send_choice',async (data)=>{
    await pool.query("UPDATE players SET lastchoice = $1 WHERE socket = $2",[data.choice,data.id]);
  })

  socket.on('create_matches', async ()=>{
    const players  = (await pool.query("SELECT name,socket,lastchoice FROM players WHERE ")).rows;

    console.log(players);
  })

  
  
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});