import React from "react";

import './Chat.css';
import { Col, Container, Row } from "react-bootstrap";

import Message from "../message/Message";

type ChatProps = {
    messages: {
        current: typeof Message[],
        user: typeof Message[]
    };
};

const Chat = (props: ChatProps) => {
    const displayMessages = () => {
        if (props.messages.current.length || props.messages.user.length) {
            let allMessages = [...props.messages.current, ...props.messages.user];

            return (
                allMessages.map(msg =>
                    <Row>
                        <Col>
                            {msg}
                        </Col>
                    </Row>
                )
            );
        } else {
            return (
                <Row>
                    <Col>
                        <h5 style={{ color: 'white' }}>No messages yet</h5>
                    </Col>
                </Row>
            );
        }
    };

    return (
        <React.Fragment>
            <div className="chat-container">
                <Container fluid>
                    {displayMessages()}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Chat;
