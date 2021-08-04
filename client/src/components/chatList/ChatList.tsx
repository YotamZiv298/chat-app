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
};

const ChatList = (props: ChatListProps) => {
    const [activeKey, setActiveKey] = useState(CHATS_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const chatsOpen = activeKey === CHATS_KEY;

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <Modal show={modalOpen} onHide={closeModal}>
                {chatsOpen ? (
                    <NewChatModal closeModal={closeModal} />
                ) : (
                    <NewContactModal closeModal={closeModal} />
                )}
            </Modal>

            <div className='chat-list d-flex flex-column'>
                <Container fluid>
                    <Row>
                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                            <Tab.Container
                                activeKey={activeKey}
                                onSelect={(k: any) => setActiveKey(k)}
                            >
                                <Nav
                                    variant='tabs'
                                    className='justify-content-center'
                                    style={{
                                        width: '100vw!important',
                                    }}
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
                                <Tab.Content>
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
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChatList;
