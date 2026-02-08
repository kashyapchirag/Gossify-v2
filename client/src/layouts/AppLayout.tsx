import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

const AppLayout = () => {
    const [username, setUsername] = useState('')
    const saved = sessionStorage.getItem('username')
    useEffect(()=>{
        if(saved){
            setUsername(saved)
        }
    },[])
    return (
        <>
            <Outlet context={{username,setUsername}} />
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
            />
        </>
    )
}

export default AppLayout
