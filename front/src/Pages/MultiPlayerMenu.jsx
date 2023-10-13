import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { useEffect, useState } from "react";
export default function MultiPlayerMenu(){
  const [allRooms,setAllRooms] = useState([]);
  const [createRoom,setCreateRoom] = useState('');
  const [userName,setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    socket.on("connect",()=>{
      socket.emit('getRooms')
    })
    socket.on("receiveRooms",(data)=>{
      const rooms = [];
      data.forEach((e)=>{
        rooms.push(e.room);
      });
      console.log(rooms)
      setAllRooms(rooms);
    })
  },[socket])
  return(
    <div>
      <div>
        <input placeholder="user name" onChange={(e)=>{
          setUserName(e.target.value)
        }}></input>
      </div>
      <div>
        <input placeholder="room" onChange={(e)=>{
          setCreateRoom(e.target.value)
        }}></input>
        <button onClick={()=>{
          if(createRoom.length>0){
            navigate(`/multiPlayer/${createRoom}`,{state:{room:createRoom,userName,}})
          }
        }}>Create</button>
      </div>
      <div>
        {allRooms.map((e)=>(
          <div>
            <h2>{e}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
