import React, { useState } from "react";

import './Chat.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import Message from '../message/Message';

type ChatProps = {
    messages: {
        // self: typeof Message[],
        // user: typeof Message[]
        self: any[],
        user: any[]
    };
};

const Chat = (props: ChatProps) => {
    const [allMessages, setAllMessages] = useState([...props.messages.self, ...props.messages.user]);

    const [selfMessages, setSelfMessages] = useState(props.messages.self);
    const [userMessages, setUserMessages] = useState(props.messages.user);

    const [message, setMessage] = useState('');

    const addSelfMessage = (message: string) => {
        let date = new Date();

        let msg = <Message
            user={{ nickname: 'self' }}
            value={message}
            date={date.getHours() + ':' + date.getMinutes()}
        />;

        setSelfMessages(prev => [...prev, msg]);

        setAllMessages(prev => [...prev,
            msg
        ]);
    };

    const displayMessages = () => {
        if (selfMessages.length || userMessages.length) {
            // setSelfMessages(prev => [...prev,

            // ]);

            // setMessages((prev) => ({
            //     ...prev,
            //     self: props.messages.self,
            //     user: props.messages.user
            // }));

            return (
                // self
                allMessages.map((msg, index) =>
                    <Row>
                        <Col>
                            {msg}
                            <br />
                        </Col>
                    </Row>
                )
                //user

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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (message) {
            addSelfMessage(message);
        }
    };

    return (
        <React.Fragment>
            <div className="chat-container" style={{ overflow: 'auto' }}>
                <Container fluid>
                    {displayMessages()}
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                                <Form.Control
                                    autoFocus
                                    placeholder="Type a message"
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value)
                                    }}
                                    as="textarea"
                                    rows={1}
                                    style={{ resize: 'none', overflow: 'hidden' }}
                                />
                                <Button variant="success" type="submit" className="login-submit-button">
                                    <b>{'>'}</b>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Chat;
