import { useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    const error: any = useRouteError();
    return (
        <div className="cont flex justify-center items-center w-screen h-screen bg-zinc-300">

            <div className=" md:border temp bg md:rounded-2xl h-full w-full flex justify-center items-center md:w-3/4 lg:w-1/2">

                <div className=' glass md:rounded-2xl p-6 w-full lg:h-full flex flex-col justify-center items-center gap-8'>
                    <div className='text-3xl font-bold '>
                        Something went wrong
                    </div>

                    <img className='rounded-[50rem]' src="/errorgif.gif" alt="errorGif" />

                    <div className='text-red-500 text-3xl font-bold flex flex-col justify-center items-center gap-3'>
                        {error.statusText || error.message}
                        <button onClick={()=>{
                            navigate(-1)
                        }} className='w-20 py-1 text-[1rem] font-normal rounded-2xl text-white glass-button hover:glass-button-hover cursor-pointer'>
                            Go Back
                        </button>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default ErrorPage
