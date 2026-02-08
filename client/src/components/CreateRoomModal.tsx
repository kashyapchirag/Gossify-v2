import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

//@ts-ignore
const CreateRoomModal = ({setIsModalOpen,setRooms,rooms}) => {

    const [room, setRoom] = useState('')
    
    const addRooms = async()=>{
        const newRoom = room.trim().toLowerCase()
        if(!newRoom) return 
        
        if(rooms.includes(newRoom)){
            toast.info('room already exists')
            return
        }
        try {
            const res = await axios.post('/api/createroom',{newRoom})
            toast.success(res.data.message)
            // setRooms(prev=>[...prev,newRoom])
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
        setIsModalOpen(false)
    }

    return (
        <>
            <div onClick={()=>setIsModalOpen(false)} className='overlay h-screen w-screen fixed inset-0 bg-black/40 z-40'>
            
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 shadow-xl pointer-events-auto">

                    <h2 className="text-xl font-bold mb-2">
                        Create Public Room
                    </h2>

                    <input
                        value={room}
                        onChange={(e)=>setRoom(e.target.value)}
                        placeholder="Room name"
                        className="w-full border border-zinc-400 rounded-md px-3 py-2 mb-4"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                        onClick={()=>setIsModalOpen(false)}
                        className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 cursor-pointer"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={()=>addRooms()}
                        className="px-4 py-2 rounded-lg glass-button btn-hover cursor-pointer text-white"
                        >
                        Create
                        </button>
                    </div>

                </div>
        </div>
        </>
    )
}

export default CreateRoomModal
