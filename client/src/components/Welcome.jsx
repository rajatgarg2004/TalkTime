import React from "react";
import logo from "../assets/home.png";

function Welcome() {
    //   const lightTheme = useSelector((state) => state.themeKey);
    //   const userData = JSON.parse(localStorage.getItem("userData"));
    //   console.log(userData);
    //   const nav = useNavigate();
    //   if (!userData) {
    //     console.log("User not Authenticated");
    //     nav("/");
    //   }

    return (
        <div className="flex flex-col w-[70%] justify-center items-center gap-[20px] text-black border-b-[#63d7b0] border-b-[5px] rounded-[20px]">
            <img src={logo} alt="Logo" className="h-[20vw] rounded-[20px]" />
            <p className="text-center">Text directly to people present in the chat rooms just like string telephone.</p>
        </div>
    );
}

export default Welcome;