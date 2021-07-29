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
            <Container fluid className='home-container'>
                <Row>
                    <Col>
                        <div className='logout-container'>
                            <h4 style={{ color: 'white' }}>
                                Hello, {location.state.nickname}
                            </h4>
                            <Button
                                variant='danger'
                                onClick={() => window.location.reload()}
                            >
                                Logout
                            </Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ height: '90vh', overflow: 'auto' }}>
                        <ChatList chatList={[]} />
                    </Col>
                    {/* <Col>
                        <Chat
                            messages={{
                                current: [],
                                user: []
                            }}
                        />
                    </Col> */}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default withRouter(Home);
