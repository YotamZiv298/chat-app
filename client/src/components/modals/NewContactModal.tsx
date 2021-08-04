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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = idRef.current?.value;
        const name = nameRef.current?.value;

        await fetch(`http://localhost:5000/users/${id}`).then((res) => {
            if (res.ok) {
                createContact(id, name);
                props.closeModal();
            } else {
                alert('Please enter an existing user id');
            }
        });
        // for quick adding
        // createContact(id, name);
        // props.closeModal();
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
