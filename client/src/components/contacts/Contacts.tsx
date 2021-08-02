import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../../context/ContactsProvider';

import './Contacts.css';

const Contacts = () => {
    const { contacts } = useContacts();
    const { fetchContacts } = useContacts();

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <React.Fragment>
            <div className='contacts-container'>
                <ListGroup variant='flush'>
                    {contacts.map((contact: any) => (
                        <ListGroup.Item key={contact.id}>
                            {contact.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </React.Fragment>
    );
};

export default Contacts;
