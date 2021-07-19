import React from 'react';

import './Home.css';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';

import Chat from '../chat/Chat';
import ChatList from '../chatList/ChatList';
import Login from '../login/Login';

const Home = () => {
    return (
        <React.Fragment>
            <Container fluid className="home-container">
                <Row>
                    <Col md={2}>
                        <Navbar variant="dark" className="action-navbar">
                            <Container fluid>
                                <Nav className="me-auto">
                                    <Nav.Link href="">New Chat</Nav.Link>
                                    <Nav.Link href="">New Group</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>
                    <Col>
                        <div className="logout-container">
                            <Button variant="danger" href="">Logout</Button>{' '}
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
        </React.Fragment>
    );
};

export default Home;
