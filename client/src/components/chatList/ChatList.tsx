import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    Modal,
    Nav,
    Navbar,
    Row,
    Tab,
} from 'react-bootstrap';
import Chat from '../chat/Chat';
import Message from '../message/Message';
import socket from '../socketService';

import './ChatList.css';

type ChatListProps = {
    chatList: any[];
};

const ChatList = (props: ChatListProps) => {
    const [showNewChat, setShowNewChat] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');

    const [chatList, setChatList] = useState(props.chatList);
    const [count, setCount] = useState(0);

    const newDirect = () => {
        setShowNewChat(true);

        setChatList((prev) => [
            ...prev,
            <Nav.Item>
                <Nav.Link eventKey={`chat-${count}`} style={{ color: 'white' }}>
                    direct
                </Nav.Link>
            </Nav.Item>,
        ]);
        setCount(count + 1);
    };

    const newGroup = () => {
        setChatList((prev) => [
            ...prev,
            <Nav.Item>
                <Nav.Link eventKey={`chat-${count}`} style={{ color: 'white' }}>
                    group
                </Nav.Link>
            </Nav.Item>,
        ]);
        setCount(count + 1);
    };

    const getChatList = () => {
        if (chatList.length) {
            return (
                <Tab.Container>
                    <Row>
                        <Col md={2}>
                            <Nav variant='pills' className='flex-column'>
                                {chatList.map((chatName, index) => (
                                    <div
                                        key={`chat-name-${index}`}
                                        className='chat-name'
                                    >
                                        <h5>{chatName}</h5>
                                    </div>
                                ))}
                            </Nav>
                        </Col>
                        <Col>
                            <Tab.Content>
                                {[...Array(count)].map((element, index) => (
                                    <Tab.Pane eventKey={`chat-${index}`}>
                                        <Chat
                                            messages={{
                                                self: [],
                                                user: [],
                                            }}
                                        />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            );
        } else {
            return (
                <div className='empty-chat-list'>
                    <h5 style={{ color: 'white' }}>No chats yet</h5>
                </div>
            );
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (nicknameInput) {
            socket.emit('newDirect', nicknameInput);
            setShowNewChat(false);
        }
        setNicknameInput('');
    };

    return (
        <React.Fragment>
            <Modal show={showNewChat} onHide={() => setShowNewChat(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please enter user's nickname to add:
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            autoFocus
                            placeholder='Nickname'
                            value={nicknameInput}
                            onChange={(e) => {
                                setNicknameInput(e.target.value);
                            }}
                        />
                        <Button variant='success' type='submit' className=''>
                            <b>{'Create Chat'}</b>
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <div className='chat-list'>
                <Container fluid>
                    <Row>
                        <Col>
                            <Navbar variant='dark' className='action-navbar'>
                                <Container fluid>
                                    <Nav className='me-auto'>
                                        {/* <Nav.Link onClick={newDirect}>New Direct</Nav.Link>
                                        <Nav.Link onClick={newGroup}>New Group</Nav.Link> */}
                                        <Nav.Link
                                            onClick={() => setShowNewChat(true)}
                                        >
                                            New Direct
                                        </Nav.Link>
                                        <Nav.Link
                                            onClick={() => setShowNewChat(true)}
                                        >
                                            New Group
                                        </Nav.Link>
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
                        <Col>{getChatList()}</Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChatList;
