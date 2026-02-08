import { Room } from "../models/roomSchema.js";
import { io } from "../socket/index.js";

export const getRooms= async(req,res)=>{
    try {
        const allRooms = await Room.find({})
        res.status(201).json({message:"default rooms created",allRooms})
        
    } catch (error) {
        res.status(500).json({message:"error while getting default rooms"})
    }

}

export const createRoom = async(req,res)=>{
    const {newRoom}=req.body
    try {
        await Room.create({name:newRoom})
        io.emit('room-created',newRoom)
        
        res.status(201).json({message:"Room created"})
    } catch (error) {
        res.status(500).json({message:"error while creating room"})
    }
}
