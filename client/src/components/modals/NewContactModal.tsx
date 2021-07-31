import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from '../../context/ContactsProvider';

type NewContactModalProps = {
    closeModal: () => any;
};

const NewContactModal = (props: NewContactModalProps) => {
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const { createContact } = useContacts();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createContact(idRef.current?.value, nameRef.current?.value);
        props.closeModal();
    };

    return (
        <React.Fragment>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type='text' ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </React.Fragment>
    );
};

export default NewContactModal;
