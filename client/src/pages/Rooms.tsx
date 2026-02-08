import React, { useEffect,useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import CreateRoomModal from '../components/CreateRoomModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import socket from '../socket/socket'

const Rooms = () => {
    //@ts-ignore
    const {username} = useOutletContext()
    // const rooms = ["general","public","coding","fashion"]
    const [rooms, setRooms] = useState(["general","coding","fashion"])
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleJoin = (room :String)=>{
        navigate(`/chat/${room}`)
    }
    
    const fetchRooms = async()=>{
        try {
            const res = await axios.get('/api/getrooms')
            res.data.allRooms.forEach((element:any) => {
                const newRoom = element.name
                if(!rooms.includes(newRoom)){
                    setRooms(prev=>[...prev,newRoom])
                }
            });
        } catch (error :any) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(()=>{
        socket.on('room-created',(newRoom)=>{
            if(!rooms.includes(newRoom)){
                setRooms(prev=>[...prev,newRoom])
            }
        })
        return()=>{
            socket.off('room-created')
        }
    },[])

    useEffect(()=>{
        fetchRooms()
    },[])

    return (
        <div className='bigCont w-screen h-screen bg-zinc-300 flex justify-center'>

            <div className="roomsCont bg md:border border-zinc-900 x md:rounded-2xl md:w-3/4 lg:w-1/2 h-full w-full flex flex-col  items-center">
            
                <div className="public h-1/2  w-full  rounded-md p-[1.3rem] bg-transparent">
                    <div className="top flex justify-between items-start">
                        <div className="title text-[1.4rem] font-extrabold h-[4rem] flex items-center">
                            Public Rooms
                        </div>

                        <div className="title text-[1.4rem] font-extrabold h-[4rem] flex items-center">
                            Join to Chat
                        </div>

                    </div>
                    <div className="publicRooms flex flex-col gap-2 h-full ">

                        <div className="bg2">
                            <div className="createPRoom rounded-md border h-16 px-8 flex justify-between items-center">
                                <p className='font-bold'>Create Room</p>
                                <button onClick={()=>setIsModalOpen(true)} className='btn-hover px-4 py-1 rounded-2xl text-white glass-button cursor-pointer'>Create</button>
                            </div>
                        </div>

                        <div className="publicRoomsContainer flex flex-col gap-2 h-full overflow-y-auto">

                            {
                                isModalOpen && <CreateRoomModal setIsModalOpen = {setIsModalOpen} rooms={rooms} setRooms={setRooms} />
                            }

                            {rooms.map((room)=>{

                                return (
                                    <div key={room}  className={`${room} glass-room border rounded-md bg-white shrink-0 h-13 md:h-12.5 flex px-8 justify-between items-center`}>
                                        <p className={`${room}`} >{room}</p>
                                        <button
                                            onClick={()=>handleJoin(room)}
                                            className="btn-hover px-4 py-1 rounded-2xl text-white glass-button cursor-pointer">Join</button>
                                    </div>
                                )

                            })} 
                        </div>
                    </div>
            </div>

            </div>
        </div>
    )
}

export default Rooms
