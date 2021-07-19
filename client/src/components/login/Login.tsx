import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './Login.css';

const Login = () => {
    const handleSubmit = async () => {
        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: 'Yotam',
            })
        }).then(function (res) {
            console.log(res)
        });
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="login-container">
                            <Form onSubmit={() => handleSubmit()}>
                                <Form.Control
                                    size="lg"
                                    autoFocus
                                    placeholder="Enter nickname"
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
