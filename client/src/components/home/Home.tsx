import React from 'react';

import './Home.css';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';

import Chat from '../chat/Chat';
import ChatList from '../chatList/ChatList';
import { useLocation, withRouter } from 'react-router-dom';

const Home = () => {
    const location = useLocation<any>();

    return (
        <React.Fragment>
            <Container fluid className="home-container">
                <Row>
                    <Col md={2}>
                        <Navbar variant="dark" className="action-navbar">
                            <Container fluid>
                                <Nav className="me-auto">
                                    <Nav.Link onClick={ChatList.newChat}>New Chat</Nav.Link>
                                    <Nav.Link onClick={ChatList.newGroup}>New Group</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>
                    <Col>
                        <div className="logout-container">
                            <h4 style={{ color: 'white' }}>
                                Hello, {location.state.nickname}
                            </h4>
                            <Button variant="danger" onClick={() => window.location.reload()}>Logout</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <ChatList chatList={[]} />
                    </Col>
                    <Col>
                        <Chat
                            messages={{
                                current: [],
                                user: []
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default withRouter(Home);
