import React, { useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './Login.css';

// type LoginProps = {
//     isAuth: boolean;
//     setIsAuth: any;
//     onIdSubmit: any;
// };
type LoginProps = {
    onIdSubmit: any;
};

const Login = (props: LoginProps) => {
    const idRef = useRef<HTMLInputElement>(null);
    // const [formNickname, setFormNickname] = useState('');

    let nav = useHistory();

    const sendToApi = async (id: string | undefined) => {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id }),
        };
        await fetch('http://localhost:5000/users', reqOptions)
            .then((res) => res.json())
            .then((data) => console.log(`user created : ${data.id}`));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = idRef.current?.value;

        await fetch(`http://localhost:5000/users/${id}`).then((res) => {
            if (res.ok) {
                sendToApi(id);
                props.onIdSubmit(id);
                nav.push('/');
            } else {
                alert('Please enter an existing user id');
            }
        });
    };

    const createNewId = () => {
        const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
        sendToApi(id);
        props.onIdSubmit(id);
        nav.push('/');
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className='login-container'>
                            <Form onSubmit={handleSubmit}>
                                <h5 style={{ color: 'white' }}>Login</h5>
                                <Form.Control
                                    type='text'
                                    size='lg'
                                    autoFocus
                                    placeholder='Enter existing id'
                                    // value={formNickname}
                                    // onChange={(e) => {
                                    //     setFormNickname(e.target.value);
                                    // }}
                                    ref={idRef}
                                    required
                                />
                                {/* <br /> */}
                                <Button
                                    type='submit'
                                    className='login-submit-button'
                                >
                                    Start Chatting
                                </Button>
                                <h5 style={{ color: 'white' }}>or</h5>
                                <Button
                                    onClick={createNewId}
                                    variant='secondary'
                                >
                                    Create A New Id
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Login;
