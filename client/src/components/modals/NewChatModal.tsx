import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';
import { useContacts } from '../../context/ContactsProvider';

type NewChatModalProps = {
    closeModal: () => any;
};

const NewChatModal = (props: NewChatModalProps) => {
    const [selectedContactIds, setSelectedContactIds] = useState<any>([]);
    const { contacts } = useContacts();
    const { createChat, chats } = useChats();

    // check this not working after adding to group
    const isChatExist = () => {
        let flag = false;
        chats.forEach((chat: any) => {
            let count = 0;
            chat.recipients.forEach((recipient: any) => {
                count = selectedContactIds.includes(recipient.id)
                    ? count + 1
                    : count;
            });
            if (!flag) {
                flag = selectedContactIds.length === count;
            }
        });
        return flag;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedContactIds.length) {
            alert('Add contacts to create a chat');
            return;
        }
        if (chats.length && isChatExist()) {
            alert('Chat already exists');
            return;
        }
        createChat(selectedContactIds);
        props.closeModal();
    };

    const handleCheckboxChange = (contactId: any) => {
        setSelectedContactIds((prev: any[]) => {
            if (prev.includes(contactId)) {
                return prev.filter((prevId) => {
                    return contactId !== prevId;
                });
            } else {
                return [...prev, contactId];
            }
        });
    };

    return (
        <React.Fragment>
            <Modal.Header closeButton>Create Chat</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact: any) => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type='checkbox'
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() =>
                                    handleCheckboxChange(contact.id)
                                }
                            />
                        </Form.Group>
                    ))}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </React.Fragment>
    );
};

export default NewChatModal;
