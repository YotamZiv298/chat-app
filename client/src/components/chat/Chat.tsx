import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';
import AddUserModal from '../modals/AddUserModal';
import RemoveUserModal from '../modals/RemoveUserModal';

import './Chat.css';

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

    return (
        <React.Fragment>
            <div className='chat-container d-flex flex-column flex-grow-1'>
                <div>
                    <Button
                        variant='success'
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
                                required
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                style={{ resize: 'none' }}
                            />
                            <InputGroup.Append>
                                <Button variant='success' type='submit'>
                                    <b>{'>'}</b>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default Chat;
