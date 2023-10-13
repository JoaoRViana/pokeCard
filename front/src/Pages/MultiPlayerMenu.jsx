import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { useEffect, useState } from "react";
import Header from "../Components/Header";

export default function MultiPlayerMenu(){
  const [allRooms,setAllRooms] = useState([]);
  const [createRoom,setCreateRoom] = useState('');
  const [userName,setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    socket.emit('getRooms') 
    socket.on("receiveRooms",(data)=>{
      const rooms = [];
      data.forEach((e)=>{
        rooms.push(e);
      });
      setAllRooms(rooms);
    })
  },[socket])
  return(
    <div>
      <Header/>
      <div className="mx-auto flex justify-center p-5">
        <input className="text-center rounded-md" placeholder="user name" onChange={(e)=>{
          setUserName(e.target.value)
        }}></input>
      </div>
      <div className="mx-auto flex justify-center p-5">
        <input className="w-[80px] mx-5 text-center rounded-md" placeholder="room" onChange={(e)=>{
          setCreateRoom(e.target.value)
        }}></input>
        <button className="mx-5 styledText bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded p-3 w-[70px] h-[30px] flex justify-center items-center" onClick={()=>{
          if(createRoom.length>0){
            navigate(`/multiPlayer/${createRoom}`,{state:{room:createRoom,userName,}})
          }
        }}>Create</button>
      </div>
      <div className="bg-slate-400 mx-auto w-[50%] p-10">
        {allRooms.map((e)=>(
          <div className="flex justify-around flex wrap border-b-2 border-slate-200 w-[50%] mx-auto items-center p-2">
            <h2>{e.room}</h2>
            <h4>{e.users.length}/2</h4>
            <button className="styledText bg-green-500 hover:bg-green-400 text-white font-bold border-b-4 border-green-700 hover:border-green-500 rounded p-3 w-[70px] h-[30px] flex justify-center items-center "
            value={e.room}
            onClick={(e)=>{
              navigate(`/multiPlayer/${e.target.value}`,{state:{room:e.target.value,userName,}})
            }}>
              Join</button>
          </div>
        ))}
      </div>
    </div>
  )
}
