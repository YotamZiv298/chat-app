import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';

const Chats = () => {
    const { chats, selectChatIndex,selectedChat } = useChats();
    const { fetchChats } = useChats();

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {}, [selectedChat]);

    return (
        <React.Fragment>
            <div className='chats-container'>
                <ListGroup variant='flush'>
                    {chats.map((chat: any, index: number) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => selectChatIndex(index)}
                            active={chat.selected}
                            // style={{ backgroundColor: '#2a2f32' }}
                        >
                            {chat.recipients
                                .map(
                                    (r: { id: string; name: string }) => r.name
                                )
                                .join(', ')}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </React.Fragment>
    );
};
export default Chats;
