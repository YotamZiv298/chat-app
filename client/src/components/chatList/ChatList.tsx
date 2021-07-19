import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import './ChatList.css';

type ChatListProps = {
    chatList: any[];
};


const ChatList = (props: ChatListProps) => {
    const getChatList = () => {
        if (props.chatList.length) {
            return (
                props.chatList.map(chat =>
                    <Row>
                        <Col>
                            <div className="chat-name">
                                <h5 style={{ color: 'white' }}>{chat}</h5>
                            </div>
                        </Col>
                    </Row>
                )
            );
        } else {
            return (
                <Row>
                    <Col>
                        <div className="chat-name">
                            <h5 style={{ color: 'white' }}>No chats yet</h5>
                        </div>
                    </Col>
                </Row>
            );
        }
    };

    return (
        <React.Fragment>
            <div className="chat-list">
                <Container fluid>
                    <Row>
                        <Col>
                            <h2 style={{ color: 'white' }}>Chat List</h2>
                        </Col>
                    </Row>
                    {getChatList()}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChatList;