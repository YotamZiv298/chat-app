import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = React.createContext<Socket | undefined>({} as Socket);

const useSocket = () => {
    return useContext(SocketContext);
};

type SocketProviderProps = {
    id: any;
    children: any;
};

const SocketProvider = (props: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            query: { id: props.id },
        });
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [props.id]);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};

export { useSocket, SocketProvider };
