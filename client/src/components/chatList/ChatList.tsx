import React, { useState } from 'react';
import { Button, Col, Container, Modal, Nav, Row, Tab } from 'react-bootstrap';
import Chats from '../chats/Chats';
import Contacts from '../contacts/Contacts';
import NewChatModal from '../modals/NewChatModal';
import NewContactModal from '../modals/NewContactModal';

import './ChatList.css';

const CHATS_KEY = 'chats';
const CONTACTS_KEY = 'contacts';

type ChatListProps = {
    id: any;
    // chatList: any[];
};

const ChatList = (props: ChatListProps) => {
    const [activeKey, setActiveKey] = useState(CHATS_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const chatsOpen = activeKey === CHATS_KEY;

    function closeModal() {
        setModalOpen(false);
    }

    // const [showNewChat, setShowNewChat] = useState(false);
    // const [nicknameInput, setNicknameInput] = useState('');

    // const [chatList, setChatList] = useState(props.chatList);
    // const [count, setCount] = useState(0);

    // const newDirect = () => {
    //     setShowNewChat(true);

    //     setChatList((prev) => [
    //         ...prev,
    //         <Nav.Item>
    //             <Nav.Link eventKey={`chat-${count}`} style={{ color: 'white' }}>
    //                 {nicknameInput}
    //             </Nav.Link>
    //         </Nav.Item>,
    //     ]);
    //     setCount(count + 1);
    // };

    // const newGroup = () => {
    //     setChatList((prev) => [
    //         ...prev,
    //         <Nav.Item>
    //             <Nav.Link eventKey={`chat-${count}`} style={{ color: 'white' }}>
    //                 {nicknameInput}
    //             </Nav.Link>
    //         </Nav.Item>,
    //     ]);
    //     setCount(count + 1);
    // };

    // const getChatList = () => {
    //     if (chatList.length) {
    //         return (
    //             <Tab.Container>
    //                 <Row>
    //                     <Col
    //                         md={2}
    //                         style={{ overflowY: 'auto', height: '750px' }}
    //                     >
    //                         <Nav variant='pills' className='flex-column'>
    //                             {chatList.map((chatName, index) => (
    //                                 <div
    //                                     key={`chat-name-${index}`}
    //                                     className='chat-name'
    //                                 >
    //                                     <h5>{chatName}</h5>
    //                                 </div>
    //                             ))}
    //                         </Nav>
    //                     </Col>
    //                     <Col>
    //                         <Tab.Content>
    //                             {[...Array(count)].map((element, index) => (
    //                                 <Tab.Pane eventKey={`chat-${index}`}>
    //                                     <Chat
    //                                         key={`chat-${index}`}
    //                                         messages={{
    //                                             self: [],
    //                                             user: [],
    //                                         }}
    //                                     />
    //                                 </Tab.Pane>
    //                             ))}
    //                         </Tab.Content>
    //                     </Col>
    //                 </Row>
    //             </Tab.Container>
    //         );
    //     } else {
    //         return (
    //             <div className='empty-chat-list'>
    //                 <h5 style={{ color: 'white' }}>No chats yet</h5>
    //             </div>
    //         );
    //     }
    // };

    // const handleSubmit = (e: any) => {
    // e.preventDefault();

    // if (!nicknameInput) return;

    // socket.emit('newDirect', nicknameInput);
    // newDirect();
    // setShowNewChat(false);
    // setNicknameInput('');
    // };

    return (
        <React.Fragment>
            {/* <Modal show={showNewChat} onHide={() => setShowNewChat(false)}>
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
                        <Button variant='success' type='submit'>
                            <b>{'Create Chat'}</b>
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer> */}
            <Modal show={modalOpen} onHide={closeModal}>
                {chatsOpen ? (
                    <NewChatModal closeModal={closeModal} />
                ) : (
                    <NewContactModal closeModal={closeModal} />
                )}
            </Modal>

            <div className='chat-list d-flex flex-column'>
                <Container fluid>
                    {/* <Row>
                        <Col>
                            <Navbar variant='dark' className='action-navbar'>
                                <Container fluid>
                                    <Nav className='me-auto'>
                                        <Nav.Link onClick={newDirect}>
                                            New Direct
                                        </Nav.Link>
                                        <Nav.Link onClick={newGroup}>
                                            New Group
                                        </Nav.Link>
                                        <Nav.Link
                                            // onClick={() => setShowNewChat(true)}
                                            onClick={() => setModalOpen(true)}
                                        >
                                            New Direct
                                        </Nav.Link>
                                        <Nav.Link
                                            // onClick={() => setShowNewChat(true)}
                                            onClick={() => setModalOpen(true)}
                                        >
                                            New Group
                                        </Nav.Link>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row> */}
                    {/* <Row>
                        <Col>
                            <h2 style={{ color: 'white' }}>Chat List</h2>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                            <Tab.Container
                                activeKey={activeKey}
                                onSelect={(k: any) => setActiveKey(k)}
                            >
                                <Nav
                                    variant='tabs'
                                    className='justify-content-center'
                                >
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey={CHATS_KEY}
                                            style={{
                                                backgroundColor: '#2a2f32',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                borderRadius: '10px 10px 0 0',
                                            }}
                                        >
                                            Chats
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey={CONTACTS_KEY}
                                            style={{
                                                backgroundColor: '#2a2f32',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                borderRadius: '10px 10px 0 0',
                                            }}
                                        >
                                            Contacts
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content /*className='border-right overflow-auto flex-grow-1'*/
                                >
                                    <Tab.Pane eventKey={CHATS_KEY}>
                                        <Chats />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={CONTACTS_KEY}>
                                        <Contacts />
                                    </Tab.Pane>
                                </Tab.Content>
                                <Button
                                    variant='success'
                                    onClick={() => setModalOpen(true)}
                                    style={{
                                        borderRadius: '0 0 10px 10px',
                                        width: '100%',
                                    }}
                                >
                                    New {chatsOpen ? 'Chat' : 'Contact'}
                                </Button>
                            </Tab.Container>
                        </Col>
                        {/* <Col>{getChatList()}</Col> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChatList;
