import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useChats } from '../../context/ChatProvider';
import { useContacts } from '../../context/ContactsProvider';

type RemoveUserModalProps = {
    closeModal: () => any;
};

const RemoveUserModal = (props: RemoveUserModalProps) => {
    const [selectedContactIds, setSelectedContactIds] = useState<any>([]);
    const { contacts } = useContacts();
    const { selectedChat, updateChatRecipients } = useChats();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedContactIds.length) {
            alert('Please select contacts to remove');
            return;
        }
        if (
            !selectedChat.recipients.some((r: any) =>
                selectedContactIds.includes(r.id)
            )
        ) {
            alert('Contact is not in chat');
            return;
        }
        if (selectedContactIds.length === selectedChat.recipients.length) {
            alert('Can not remove all contacts');
            return;
        }
        updateChatRecipients([
            ...selectedChat.recipients.map((r: any) => {
                return r.id;
            }),
            -1,
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
            <Modal.Header closeButton>Remove User</Modal.Header>
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
                    <Button variant='danger' type='submit'>
                        Remove
                    </Button>
                </Form>
            </Modal.Body>
        </React.Fragment>
    );
};

export default RemoveUserModal;
