import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';
import { useContacts } from '../../context/ContactsProvider';

type AddUserModalProps = {
    closeModal: () => any;
};

const AddUserModal = (props: AddUserModalProps) => {
    const [selectedContactIds, setSelectedContactIds] = useState<any>([]);
    const { contacts } = useContacts();
    const { selectedChat, updateChatRecipients } = useChats();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedContactIds.length) {
            alert('Please select contacts to add');
            return;
        }
        if (
            selectedChat.recipients.some((r: any) =>
                selectedContactIds.includes(r.id)
            )
        ) {
            alert('Contact already in chat');
            return;
        }
        updateChatRecipients([
            ...selectedChat.recipients.map((r: any) => {
                return r.id;
            }),
            0,
            ...selectedContactIds,
        ]);
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
            <Modal.Header closeButton>Add User</Modal.Header>
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
                    <Button variant='success' type='submit'>
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </React.Fragment>
    );
};

export default AddUserModal;
