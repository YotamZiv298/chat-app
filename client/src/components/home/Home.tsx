import React from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';
import Chat from '../chat/Chat';
import ChatList from '../chatList/ChatList';
import { Redirect } from 'react-router-dom';
import { useChats } from '../../context/ChatProvider';

import './Home.css';

type HomeProps = {
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
};

const Home = (props: HomeProps) => {
    const { selectedChat, updateChatsApi } = useChats();

    if (!props.id || !props.id.length) {
        return <Redirect to='/login' />;
    }

    const logout = () => {
        updateChatsApi();
        props.setId('');
    };

    return (
        <React.Fragment>
            <Container
                fluid
                className='home-container'
                style={{ overflow: 'hidden' }}
            >
                <Row>
                    <Col>
                        <div className='logout-container'>
                            <h4 style={{ color: 'white' }}>{props.id}</h4>
                            <Button variant='danger' onClick={() => logout()}>
                                Logout
                            </Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Col
                        md={2}
                        style={{
                            height: '85vh',
                            maxWidth: '100%',
                        }}
                    >
                        <ChatList id={props.id} />
                    </Col>
                    <Col md={{ span: 8, offset: 0 }}>
                        {selectedChat && <Chat />}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Home;
