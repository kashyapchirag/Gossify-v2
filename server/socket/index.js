import { Server } from "socket.io";
let io;
const initSocket = (httpServer)=>{
    io = new Server(httpServer,{
        cors:{
            origin:'http://localhost:5173'
        }
    })

    io.on('connection',(socket)=>{
        console.log('User connected');
        socket.on("joined-room",({room,username})=>{
            socket.join(room)
            socket.data.room=room
            socket.data.username=username
            console.log(`${socket.data.username} has joined ${room}`);
            
            socket.to(room).emit("joined-user",{
                room,
                text:`${socket.data.username} has joined ${room}`,
                type:"join",             
            })

        })
        socket.on("leave-room",()=>{
            const {room,username} = socket.data
            socket.data.left=true,
            socket.leave(room)
            socket.to(room).emit("left-user",{
                room,
                text:`${username} has left ${room}`,
                type:"left",   
            })
        })

        socket.on("send-message",(text)=>{
            if(!text || !text.trim()) return
            const {room,username} = socket.data
            io.to(room).emit("receive-message",{
                room,
                sender:username,
                text,
                type:"message",
                timestamp:Date.now()
            })
        })

        socket.on("disconnect",()=>{
            const {room,username,left} = socket.data
            socket.leave(room)
            if(!room || !username || left) return
            console.log(`${username} has left ${room}`);
            socket.to(room).emit("left-user",{
                room,
                text:`${username} has left ${room}`,
                type:"left",   
            })
        })
    })
}

export {initSocket,io}