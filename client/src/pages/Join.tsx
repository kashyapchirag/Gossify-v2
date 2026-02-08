import { useNavigate, useOutletContext } from "react-router-dom";

const Join = () => {
  //@ts-ignore
    const { username, setUsername } = useOutletContext();
    const navigate = useNavigate();

    const handleContinue = (e: any) => {
        e.preventDefault();
        if (!username) return;
        sessionStorage.setItem("username", username);
        navigate("/rooms");
    };

    return (
    <div className="bigCont w-screen h-screen bg-zinc-300 flex justify-center">
        <div className="loginCont bg md:border border-zinc-900 w-full md:rounded-2xl md:w-3/4 lg:w-1/2 h-full flex justify-center items-center">
            <form className="border border-zinc-800 rounded-2xl w-[85%] glass-strong p-3">
                <h1 className="text-[1.4rem] font-bold">Enter your name</h1>
                <h3 className="text-zinc-500 font-medium">
                    Enter a nickname to introduce yourself
                </h3>

            <div className="mt-2 input w-full flex flex-col gap-2">
                <input
                onKeyDown={(e) => {
                    if (e.key == "Enter") handleContinue(e);
                }}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-zinc-500 rounded-md w-full px-2 py-1 text-zinc-700"
                type="text"
                required
                placeholder="Your name (e.g. John Doe)"
                />

                <div
                    onClick={handleContinue}
                    className="button w-full flex justify-end"
                    >
                    <button className="btn-hover px-2 py-1 rounded-2xl text-white glass-button cursor-pointer">
                        Continue
                    </button>
                </div>
            </div>
            </form>
        </div>
    </div>
    );
};

export default Join;
