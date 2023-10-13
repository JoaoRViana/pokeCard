import { useEffect, useState } from "react";
import socket from "../socket";
import { useLocation } from "react-router-dom";

export default function Lobby(){
    const [room,setRoom]= useState('');
    const [userName,setUserName] = useState('');
    const [enemyName,setEnemyName] = useState('');
    const location = useLocation()

    useEffect(()=>{
        setUserName(location.state.userName)
        setRoom(location.state.room);
        socket.emit("joinRoom",{room:location.state.room,userName:location.state.userName})
        socket.emit("usersInRoom",{id:location.state.room})
        socket.on("receiveConnection",(data)=>{
            if(data.length>1){
                data.forEach((e)=>{
                    if(e.id !== socket.id){
                        setEnemyName(e.userName)
                    }
                })
            }else{
                setEnemyName('')
            }
        })
        socket.emit('getRooms');
    },[socket])
    return(
        <div>
            <div>
                <h2>{room}</h2>
            </div>
            <div>
                <h2>{userName}</h2>
            </div>
            <div>
                {enemyName}
            </div>
        </div>
    )
}