import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BASE_URL);

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('✅ Connected to server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
            setIsConnected(false);
        });

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
            newSocket.off('connect');
            newSocket.off('disconnect');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
