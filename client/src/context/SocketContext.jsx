import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (user?._id) {
            const newSocket = io("http://localhost:5000", {
                query: { userId: user._id },
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (userSocketMap) => {
                setOnlineUsers(userSocketMap);
            });

            newSocket.on("connect_error", (err) => {
                console.error("Socket connection error:", err);
            });

            return () => {
                newSocket.off("getOnlineUsers");
                newSocket.close();
            };
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

