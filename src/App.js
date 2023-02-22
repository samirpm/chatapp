import io from 'socket.io-client';
import './App.css';
import React, { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://192.168.1.44:5000")


function App() {

  const[name,setName]=useState('')
  const[room,setRoom]=useState('')
  const[chat,setChat]=useState(false)

  const joinRoom =()=>{
    if(name!==''&&room!==''){
      socket.emit("join-room",room)
      setChat(true)
    }
  }
  return (
 
  <div className='App'>
    {!chat ? (
    <div className="joinChatContainer">
    <h3>Join A Chat</h3>
    <input type="text" placeholder='Name'onChange={(e)=>{
      setName(e.target.value)
    }} />
    <input type="text" placeholder='Room id'onChange={(e)=>{
      setRoom(e.target.value)
    }} />
    <button onClick={joinRoom} >Join Room</button>
    </div>)
    :
    (<Chat  socket={socket} name={name} room={room}/>)}
  
  </div>


  );
}

export default App;
