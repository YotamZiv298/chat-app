import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row, Tab } from 'react-bootstrap';
import Chat from '../chat/Chat';
import Message from '../message/Message';

import './ChatList.css';

type ChatListProps = {
    chatList: any[];
};

const ChatList = (props: ChatListProps) => {
    const [chatList, setChatList] = useState(props.chatList);
    const [count, setCount] = useState(0);

    const newDirect = () => {
        setChatList(prev => [...prev,
        <Nav.Item>
            <Nav.Link eventKey={count} style={{ color: 'white' }}>
                direct
            </Nav.Link>
        </Nav.Item>
        ]);
        setCount(count + 1);
    };

    const newGroup = () => {
        setChatList(prev => [...prev,
        <Nav.Item>
            <Nav.Link eventKey={count} style={{ color: 'white' }}>
                group
            </Nav.Link>
        </Nav.Item>
        ]);
        setCount(count + 1);
    };

    const getChatList = () => {
        if (chatList.length) {
            return (
                <Tab.Container>
                    <Row>
                        <Col md={2}>
                            <Nav variant="pills" className="flex-column">
                                {chatList.map((chat, index) =>
                                    <div key={index} className="chat-name">
                                        <h5>{chat}</h5>
                                    </div>
                                )}
                            </Nav>
                        </Col>
                        <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey="0">
                                    <Chat
                                        messages={{
                                            self: [
                                                // <Message
                                                //     user={{ nickname: 'yotam' }}
                                                //     value='Hey'
                                                //     date='19:00'
                                                // />
                                            ],
                                            user: [
                                                // <Message
                                                //     user={{ nickname: 'boss' }}
                                                //     value='Sup'
                                                //     date='17:00'
                                                // />
                                            ]
                                        }}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            );
        } else {
            return (
                <div className="empty-chat-list">
                    <h5 style={{ color: 'white' }}>No chats yet</h5>
                </div>
            );
        }
    };

    return (
        <React.Fragment>
            <div className="chat-list">
                <Container fluid>
                    <Row>
                        <Col>
                            <Navbar variant="dark" className="action-navbar">
                                <Container fluid>
                                    <Nav className="me-auto">
                                        <Nav.Link onClick={newDirect}>New Direct</Nav.Link>
                                        <Nav.Link onClick={newGroup}>New Group</Nav.Link>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 style={{ color: 'white' }}>Chat List</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {getChatList()}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChatList;
