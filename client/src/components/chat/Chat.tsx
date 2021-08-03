import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';
import AddUserModal from '../modals/AddUserModal';
import RemoveUserModal from '../modals/RemoveUserModal';

import './Chat.css';
// type ChatProps = {
// messages: {
//     self: any[];
//     user: any[];
// };
// };

const Chat = () => {
    const [text, setText] = useState('');
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);
    const { sendMessage, selectedChat } = useChats();
    const [modalOpen, setModalOpen] = useState(false);
    const [addButton, setAddButton] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        sendMessage(
            selectedChat.recipients.map((r: { id: any }) => r.id),
            text
        );
        setText('');
    };

    // const [allMessages, setAllMessages] = useState([
    //     ...props.messages.self,
    //     ...props.messages.user,
    // ]);

    // const [selfMessages, setSelfMessages] = useState(props.messages.self);
    // const [userMessages, setUserMessages] = useState(props.messages.user);

    // const [message, setMessage] = useState('');

    // const addSelfMessage = (msgText: string) => {
    //     let user = { nickname: 'self' };
    //     let value = msgText;
    //     let date = new Date();
    //     let timeNow = date.getHours() + ':' + date.getMinutes();

    //     let msg = <Message user={user} value={value} date={timeNow} />;

    //     // fetch('http://localhost:5000/users', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Accept': 'application/json',
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify({
    //     //         message: {
    //     //             'user': user,
    //     //             'value': value,
    //     //             'date': timeNow
    //     //         }
    //     //     })
    //     // }).then(res => res.json())
    //     //     .then(data => {
    //     //         console.log(data);
    //     //     });

    //     setSelfMessages((prev) => [...prev, msg]);
    //     setAllMessages((prev) => [...prev, msg]);
    // };

    // const sendMessage = (recipients, text: string) => {
    //     // console.log(`send: ${msg}`);
    //     // socket.emit('msgToServer', msg);

    //     socket.emit('send-message', { recipients, text });
    //     // addMessage({ recipients, text, sender: id });
    // };

    // const receiveMessage = (msg: string) => {
    //     console.log(`recv: ${msg}`);
    //     addSelfMessage(msg);
    // };

    // const displayMessages = () => {
    //     if (selfMessages.length || userMessages.length) {
    //         // setSelfMessages(prev => [...prev,

    //         // ]);

    //         // setMessages((prev) => ({
    //         //     ...prev,
    //         //     self: props.messages.self,
    //         //     user: props.messages.user
    //         // }));

    //         return allMessages.map((msg, index) => (
    //             <Row>
    //                 <Col key={index}>
    //                     {msg}
    //                     <br />
    //                 </Col>
    //             </Row>
    //         ));
    //     } else {
    //         return (
    //             <Row>
    //                 <Col>
    //                     <h5 style={{ color: 'white' }}>No messages yet</h5>
    //                 </Col>
    //             </Row>
    //         );
    //     }
    // };

    // useEffect(() => {
    //     socket.on('msgToClient', (msg) => {
    //         receiveMessage(msg);
    //     });
    // }, []);

    // const handleSubmit = (e: any) => {
    // e.preventDefault();
    //
    // if (message) {
    // sendMessage(message);
    // addSelfMessage(message);
    // }
    // setMessage('');
    // };

    return (
        <React.Fragment>
            <div className='chat-container d-flex flex-column flex-grow-1'>
                <div>
                    <Button
                        variant='success'
                        // style={{ height: '75px' }}
                        type='button'
                        onClick={() => {
                            setAddButton(true);
                            setModalOpen(true);
                        }}
                    >
                        {'Add user'}
                    </Button>
                    <Button
                        variant='warning'
                        // style={{ height: '75px' }}
                        type='button'
                        onClick={() => {
                            setAddButton(false);
                            setModalOpen(true);
                        }}
                    >
                        {'Remove user'}
                    </Button>
                    <Modal show={modalOpen} onHide={closeModal}>
                        {addButton ? (
                            <AddUserModal closeModal={closeModal} />
                        ) : (
                            <RemoveUserModal closeModal={closeModal} />
                        )}
                    </Modal>
                </div>
                <div className='flex-grow-1 overflow-auto'>
                    <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                        {selectedChat.messages.map(
                            (message: any, index: number) => {
                                const lastMessage =
                                    selectedChat.messages.length - 1 === index;
                                return (
                                    <div
                                        ref={lastMessage ? setRef : null}
                                        key={index}
                                        className={`my-1 d-flex flex-column ${
                                            message.fromMe
                                                ? 'align-self-end align-items-end'
                                                : 'align-items-start'
                                        }`}
                                        style={{
                                            minWidth: '100px',
                                            maxWidth: '1150px',
                                            borderRadius: '10px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <div
                                            className={`rounded px-2 py-1 ${
                                                message.fromMe
                                                    ? 'bg-success text-white'
                                                    : 'bg-dark text-white'
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                        <div
                                            className={`text-muted small ${
                                                message.fromMe
                                                    ? 'text-right'
                                                    : ''
                                            }`}
                                        >
                                            {message.fromMe
                                                ? 'You'
                                                : message.senderName}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='m-2'>
                        <InputGroup>
                            <Form.Control
                                autoFocus
                                // as='textarea'
                                required
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                style={{ /*height: '75px',*/ resize: 'none' }}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant='success'
                                    // style={{ height: '75px' }}
                                    type='submit'
                                >
                                    <b>{'>'}</b>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>

            {/* <div className='chat-container'>
                <Container fluid>
                    {displayMessages()}
                    <Row>
                        <Col>
                            <Form
                                onSubmit={handleSubmit}
                                style={{ display: 'flex' }}
                            >
                                <Form.Control
                                    autoFocus
                                    placeholder='Type a message'
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                    as='textarea'
                                    rows={2}
                                    style={{ resize: 'none' }}
                                />
                                <Button
                                    variant='success'
                                    type='submit'
                                    className='login-submit-button'
                                >
                                    <b>{'>'}</b>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div> */}
        </React.Fragment>
    );
};

export default Chat;
