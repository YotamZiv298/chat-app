import React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ChatsContext = React.createContext({} as any);

const useChats = () => {
    return useContext(ChatsContext);
};

type ChatsProviderProps = {
    id: any;
    children: any;
};

const ChatsProvider = (props: ChatsProviderProps) => {
    const [chats, setChats] = useState<any>([]);
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();

    const updateChatsApi = () => {
        chats.map(async (chat: any) => {
            await fetch(`http://localhost:5000/users/${props.id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    chat: chat,
                    contact: undefined,
                }),
            });
        });
    };

    const addToChats = (newChats: any[]) => {
        setChats((prevChats: any[]) => {
            return [...prevChats, ...newChats];
        });
    };

    const fetchChats = async () => {
        await fetch(`http://localhost:5000/users/${props.id}/chats`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length) {
                    addToChats(data);
                }
            });
    };

    const createChat = async (recipients: any) => {
        const newChat = { recipients, messages: [] };

        addToChats([newChat]);
    };

    const updateType = (newChat: any, recipients: any[], type: number) => {
        const msgs = chats.find(
            (c: any) =>
                JSON.stringify(c.recipients) ===
                JSON.stringify(recipients.slice(0, recipients.indexOf(type)))
        ).messages;
        newChat.messages = msgs;

        [newChat].forEach((newChat: any) => {
            if (
                chats.length &&
                chats.find(
                    (c: any) =>
                        JSON.stringify(c.recipients) ===
                        JSON.stringify(
                            newChat.recipients.slice(
                                0,
                                newChat.recipients.indexOf(type)
                            )
                        )
                )
            ) {
                let chatsCopy = [...chats];

                let firstArr: any[] = [];
                let secondArr: any[] = [];
                if (type === -1) {
                    firstArr = newChat.recipients.slice(
                        0,
                        newChat.recipients.indexOf(type)
                    );
                    secondArr = newChat.recipients.slice(
                        newChat.recipients.indexOf(type)
                    );
                }
                const index = chats.findIndex(
                    (c: any) =>
                        JSON.stringify(c.recipients) ===
                        JSON.stringify(
                            newChat.recipients.slice(
                                0,
                                newChat.recipients.indexOf(type)
                            )
                        )
                );

                newChat.recipients =
                    type === 0
                        ? newChat.recipients.filter((r: any) => {
                              return r !== type;
                          })
                        : firstArr.filter((r: any) => !secondArr.includes(r));
                chatsCopy[index] = newChat;
                setChats(chatsCopy);
            }
        });
    };

    const updateChatRecipients = (recipients: any[]) => {
        const newChat = { recipients, messages: [] };

        if (newChat.recipients.includes(0)) {
            updateType(newChat, recipients, 0);
        } else if (newChat.recipients.includes(-1)) {
            updateType(newChat, recipients, -1);
        }
    };

    const addMessageToChat = useCallback(
        ({ recipients, text, sender }) => {
            setChats((prevChats: any[]) => {
                let madeChange = false;
                const newMessage = { sender, text };
                const newChats = prevChats.map(
                    (chat: { recipients: any; messages: any }) => {
                        if (arrayEquality(chat.recipients, recipients)) {
                            madeChange = true;
                            return {
                                ...chat,
                                messages: [...chat.messages, newMessage],
                            };
                        }

                        return chat;
                    }
                );

                if (madeChange) {
                    return newChats;
                } else {
                    return [
                        ...prevChats,
                        { recipients, messages: [newMessage] },
                    ];
                }
            });
        },
        [setChats]
    );

    useEffect(() => {
        if (socket == null) return;

        socket.on('receive-message', addMessageToChat);

        return () => {
            socket.off('receive-message');
        };
    }, [socket, addMessageToChat]);

    const sendMessage = (recipients: any, text: any) => {
        socket?.emit('send-message', { recipients, text });

        addMessageToChat({ recipients, text, sender: props.id });
    };

    const formattedChats = chats.map(
        (chat: { recipients: any[]; messages: any[] }, index: number) => {
            const recipients = chat.recipients.map((recipient: any) => {
                const contact = contacts.find((contact: { id: any }) => {
                    return contact.id === recipient;
                });
                const name = (contact && contact.name) || recipient;

                return { id: recipient, name };
            });

            const messages = chat.messages.map((message: { sender: any }) => {
                const contact = contacts.find((contact: { id: any }) => {
                    return contact.id === message.sender;
                });
                const name = (contact && contact.name) || message.sender;
                const fromMe = props.id === message.sender;

                return { ...message, senderName: name, fromMe };
            });

            const selected = index === selectedChatIndex;

            return { ...chat, messages, recipients, selected };
        }
    );

    const value = {
        chats: formattedChats,
        selectedChat: formattedChats[selectedChatIndex],
        sendMessage,
        selectChatIndex: setSelectedChatIndex,
        createChat,
        updateChatRecipients,
        fetchChats,
        updateChatsApi,
    };

    return (
        <ChatsContext.Provider value={value}>
            {props.children}
        </ChatsContext.Provider>
    );
};

const arrayEquality = (a: any[], b: any[]) => {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element: any, index: number) => {
        return element === b[index];
    });
};

export { useChats, ChatsProvider };
