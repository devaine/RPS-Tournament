import "./Styles.css";
import io from "socket.io-client";
import { createContext, useEffect, useState } from "react";


export const PlayingContext = createContext();

const socket = io.connect("http://localhost:3001");//backend

function App() {
  
  const [playing,setPlaying] = useState(false);
  const [room,setRoom] = useState("");
  const [name,setName] = useState("");
  
  

  const joinRoom = ()=>{
    const data = {name:name,room:room}
    socket.emit('join_room',data);
    setPlaying(true)
  }

  const createMatch = ()=>{
    const data = {name:name,room:room}
    socket.emit('create_match',data);
  }

  const sendChoice = (choice)=>{
    const data = {id:socket.id,choice:choice};
    socket.emit('send_choice',data);
  }

  const sendRock = ()=>{
    sendChoice('rock');
  }
  const sendPaper = ()=>{
    sendChoice('paper');
  }
  const sendScissors = ()=>{
    sendChoice('scissors');
  }

  
  

  return(
    <>
    {!playing ? <div className="join-container"><input onChange={(event)=>{setRoom(event.target.value)}} placeholder="Enter Room number here"></input>
    <input onChange={(event)=>{setName(event.target.value)}} placeholder="Your Name..."></input>
    <button onClick={joinRoom}>Join</button></div> : <div className="room-container"><button onClick={sendRock}>Rock</button><button onClick={sendScissors}>Scissors</button><button onClick={sendPaper}>Paper</button><button onClick={createMatch}>START</button></div>}
    </>
  );
  
  
}

export default App;