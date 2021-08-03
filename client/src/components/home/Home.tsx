import React from 'react';

import './Home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';

import Chat from '../chat/Chat';
import ChatList from '../chatList/ChatList';
import { Redirect } from 'react-router-dom';
import { useChats } from '../../context/ChatProvider';

type HomeProps = {
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
};

const Home = (props: HomeProps) => {
    const { selectedChat } = useChats();

    if (!props.id || !props.id.length) {
        return <Redirect to='/login' />;
    }

    // const location = useLocation<any>();

    const logout = async () => {
        // const reqOptions = {
        //     method: 'DELETE',
        //     headers: { 'Content-Type': 'application/json' },
        // };
        // await fetch(`http://localhost:5000/users/${props.id}`, reqOptions);
        props.setId('');
        // window.location.reload();
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
                            <h4 style={{ color: 'white' }}>
                                {/* Hello, {location.state.nickname} */}
                                {props.id}
                            </h4>
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
                            maxWidth: '100%' /*, overflow: 'auto' */,
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

// export default withRouter(Home);
export default Home;
