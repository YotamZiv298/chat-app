import { Card } from 'react-bootstrap';

import './Message.css';

type MessageProps = {
    user: any;
    value: string;
    date: string;
};

const Message = (props: MessageProps) => {
    return (
        <Card border="dark" bg="secondary" style={{ width: '18rem' }} className="mb-2" >
            <Card.Body>
                <Card.Title className="h5">
                    {props.user.nickname}
                </Card.Title>
                <Card.Text className="h6">
                    {props.value}
                </Card.Text>
                {/* <Card.Subtitle className="mb-2 text-muted" >
                    {props.date}
                </Card.Subtitle> */}
                <Card.Title className="h6">
                    {props.date}
                </Card.Title>
            </Card.Body>
        </Card >
    );
};

export default Message;
