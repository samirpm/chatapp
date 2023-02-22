import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import call from "./call.png"
import video from "./video.png"




function Chat({socket,name,room}){
    const[msg,setMsg]=useState('')
    const[msglist,setmsglist] = useState([])

    useEffect(()=>{        
        socket.on("receive-message",(data)=>{
          setmsglist((list)=>[...list,data])
        })
    },[socket])

    const sendmsg=async()=>{
        if(msg!==''){
            const msgdata ={
                room:room,
                author:name,
                message:msg,
                time: new Date(Date.now()).getHours()
                 +":"+ 
                 new Date(Date.now()).getMinutes()
            }
            await socket.emit("send-message",msgdata)
            setmsglist((list)=>[...list,msgdata])
            setMsg("")
        }
    }

    
    return(
        <div  className="chat-window">
            <div className="chat-header">
                <p>Live Chat
                <img src={call} className="call" alt="" />
                <img  src={video} alt="" />
                </p>
            </div>
            <div className="chat-body">
            
                <ScrollToBottom className="message-container" >
                {msglist.map((msgContent)=>{
                    return(
                       <div className="message" id={name=== msgContent.author ? "other" :"you"}>
                        <div>
                        <div className="message-content">
                            <p>{msgContent.message}</p>     
                        </div>
                        <div className="message-meta">
                            <p id="time">{msgContent.time}</p>
                            <p id="author">{msgContent.author}</p>
                        </div>
                        </div>
                        
                       </div> 
                    ) 
                })}
                </ScrollToBottom>
                
              
                
               
            </div>
            <div className="chat-footer">
                <input value={msg} type="text" placeholder="Type..." onChange={(e)=>{
                    setMsg(e.target.value)
                }}
                onKeyPress={((e)=>{
                    e.key === "Enter" && sendmsg()
                })}
                />
                <button onClick={sendmsg} >&#9658;</button>
            </div>
        </div>
    )
}
export default Chat