import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import socket from '../socket/socket'


const Chat = () => {

    //@ts-ignore
    const outlet = useOutletContext<any>();

    const username = outlet?.username || sessionStorage.getItem("username");

    const {room} = useParams()

    const [text, setText] = useState("")
    const anchor = useRef(null)
    const [messages, setMessages] = useState([])

    // type Message = {
    // id?: string;          // later from DB (not imp now)
    // room: string;
    // sender: string | null; // null = system
    // text: string;
    // type: "user" | "system";
    // timestamp: number;
    // };

    const giveTime = ()=>{
        let time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12:true
        })
        time = time.replace(/am|pm/, match => match.toUpperCase());
        return time
    }

    const onSend = () =>{
        if(!text || !text.trim()) return
        socket.emit("send-message",text)
        setText("")
    }

    useEffect(()=>{
        socket.emit("joined-room",({room,username}))
        socket.on("joined-user",(data:any)=>{
            //@ts-ignore
            setMessages(prev => [...prev,data])
            console.log(data.text)
        })
        return()=>{
            socket.off("joined-user")
            socket.emit("leave-room")
        }
    },[username,room])

    useEffect(()=>{
        socket.on("left-user",(data:any)=>{
            //@ts-ignore
            setMessages(prev => [...prev,data])
            console.log(data.text)
        })
        return()=>{
            socket.off("left-user")
        }
    },[])

    useEffect(()=>{
        socket.on("receive-message",(data:any)=>{
            data.timestamp = giveTime();
            // @ts-ignore
            setMessages(prev => [...prev,data])
        })
        return ()=>{
            socket.off("receive-message")
        }
    },[])

    useEffect(()=>{
        anchor.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    return (
        <div className="Container w-dvw h-dvh bg-zinc-200 flex flex-col justify-center items-center">

            <div id="chatCont" className="cont bg w-full h-full sm:w-[60%] md:w-1/2 shadow-md sm:rounded-[1.3rem] bg-zinc-100">

                <div id="header"
                    className="header refined glass w-full h-[9%] sm:rounded-t-[1.3rem] bg-white h flex justify-between items-center px-[0.8rem] text-[1rem] ">

                    <div className="profile flex items-center gap-2">

                        <div
                            className="profile rounded-[50rem] w-[2.2rem] h-[2.2rem] bg-green-800 text-white justify-center items-center flex text-[1.2rem]">
                            {room?.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex flex-col justify-center items-start">
                            <div className="roomname font-bold text-zinc-500">
                                {room} room
                            </div>
                            <div id="typingIndicator" className="text-blue-500 text-[0.8rem] opacity-80 italic font-medium flex gap-[0.1rem]">

                            </div>

                        </div>
                    </div>

                    <div className="username font-medium text-zinc-400">Signed in as <p className="inline font-bold text-zinc-500">
                            {username}
                        </p>
                    </div>

                </div>

                <div id="messageArea"
                    className="messageArea h-[82%] w-full flex flex-col gap-4  px-[0.8rem] py-[1.2rem] text-[1rem] overflow-y-auto">
                        {
                            messages.map((ele,index)=>{
                                //@ts-ignore
                                if(ele.type=="message"){
                                    let position = 'start'
                                    let color = 'glass-other'//@ts-ignore
                                    if (username == ele.sender) {
                                        position = 'end'
                                        color = 'glass-me'
                                    }
                                    return(
                                        <div key={index} className = {`messageContainer flex justify-${position}`}>
                                            <div className={`glass ${color} max-w-[75%] hyphens px-[0.9rem] py-[0.6rem] flex flex-col justify-center items-start gap-[0.3rem] rounded-[1.2rem] shadow-md`}>
                                                <div className="text hyphens leading-tight">
                                                    {ele.text}
                                                </div>
                                                <div className="info flex justify-between gap-[0.3rem] w-full text-[0.7rem]">
                                                    <div className="username font-bold text-zinc-700">{ele.sender}</div>
                                                    <div className="time text-zinc-500">{ele.timestamp}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else if(ele.type=="join"){
                                    return(
                                        <div
                                        key={index}
                                        className="announcement flex justify-center text-white  w-full"
                                        >
                                        <div className="bg-[rgb(23,81,74)] text-center glass glass-join rounded-[5rem] text-[0.8rem] px-2 py-[0.2rem]">
                                            {ele.text}
                                        </div>
                                        </div>
                                    )
                                }
                                else if(ele.type=="left"){
                                    return (
                                        <div
                                        key={index}
                                        className="announcement flex justify-center text-black  w-full"
                                        >
                                        <div className="bg-[rgb(209,233,251)] text-center glass glass-left rounded-[5rem] text-[0.8rem] px-2 py-[0.2rem]">
                                            {ele.text}
                                        </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    <div ref={anchor} className="dummy"></div>
                </div>

                <div
                    className="typing refined glass w-full h-[9%] bg-white sm:rounded-b-[1.4rem] flex justify-between items-center p-4 gap-[0.6rem] text-[1rem]">

                    <input onKeyDown={(e)=>{if(e.key=="Enter") onSend()}} onChange={(e)=>setText(e.target.value)} value={text} id="inputText" className="glass-other rounded-[5rem] border border-zinc-200 p-4 w-[88%] h-10"
                        type="text" placeholder="Type a message..."/>
                    <button onClick={onSend} id="btn"
                        className="bg-green-500 text-white h-10 w-[12%] glass glass-button rounded-[1.4rem] flex justify-center items-center text-center cursor-pointer"><img
                            className="w-6 md:w-8" src="/send.svg" alt=""/></button>
                </div>

            </div>

        </div>
    )
}

export default Chat
