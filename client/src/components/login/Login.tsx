import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './Login.css';

type LoginProps = {
    isAuth: boolean,
    setIsAuth: any
};

const Login = (props: LoginProps) => {
    const [formNickname, setFormNickname] = useState('');

    let nav = useHistory();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: formNickname,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            });

        props.setIsAuth(true);
        nav.push('/', { nickname: formNickname });
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="login-container">
                            <Form onSubmit={handleSubmit}>
                                <Form.Control
                                    size="lg"
                                    autoFocus
                                    placeholder="Enter nickname"
                                    value={formNickname}
                                    onChange={(e) => {
                                        setFormNickname(e.target.value)
                                    }}
                                />
                                <br />
                                <Button type="submit" className="login-submit-button">
                                    Start Chatting
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default Login;
