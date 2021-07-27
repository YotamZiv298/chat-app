import { Card } from 'react-bootstrap';

import './Message.css';

type MessageProps = {
    user: any;
    value: string;
    date: string;
};

const Message = (props: MessageProps) => {
    return (
        <Card border="dark" style={{ minWidth: '300px', maxWidth: '1150px', borderRadius: '10px', display: 'inline-block' }} className="mb-2">
            <Card.Body className="message-body">
                <Card.Title className="h5" style={{ color: '#6bcbef', fontWeight: 'bold' }}>
                    {props.user.nickname}
                </Card.Title>
                <Card.Text className="h6" style={{ color: 'white' }}>
                    {props.value}
                </Card.Text>
                <Card.Title className="h6" style={{ color: '#d4d5d7', textAlign: 'right' }}>
                    {props.date}
                </Card.Title>
            </Card.Body>
        </Card >
    );
};

export default Message;
