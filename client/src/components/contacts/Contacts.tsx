import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../../context/ContactsProvider';

const Contacts = () => {
    const { contacts } = useContacts();

    return (
        <React.Fragment>
            <ListGroup variant='flush'>
                {contacts.map((contact: any) => (
                    <ListGroup.Item key={contact.id}>
                        {contact.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </React.Fragment>
    );
};

export default Contacts;
