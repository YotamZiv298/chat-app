import { ListGroup } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';

const Chats = () => {
    const { chats, selectChatIndex } = useChats();

    return (
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
                            .map((r: { name: any }) => r.name)
                            .join(', ')}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};
export default Chats;
