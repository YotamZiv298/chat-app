import React, { useState } from 'react';
import { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext<any | undefined>({} as any);

const useContacts = (): any => {
    return useContext(ContactsContext);
};

type ContactsProviderProps = {
    id: string;
    children: any;
};

const ContactsProvider = (props: ContactsProviderProps) => {
    // const [contacts, setContacts] = useLocalStorage('contacts', [] as any);
    const [contacts, setContacts] = useState<any>([]);

    const addToContacts = (contacts: any) => {
        setContacts((prevContacts: any) => {
            return [...prevContacts, ...contacts];
        });
    };

    const fetchContacts: any = async () => {
        await fetch(`http://localhost:5000/users/${props.id}/contacts`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length) {
                    addToContacts(data);
                }
            });
    };

    const createContact: any = async (id: any, name: any) => {
        const newContact = { id, name };
        const reqOptions = {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                chat: undefined,
                contact: newContact,
            }),
        };
        await fetch(`http://localhost:5000/users/${props.id}`, reqOptions);

        addToContacts([newContact]);
    };

    return (
        <ContactsContext.Provider
            value={{ contacts, fetchContacts, createContact }}
        >
            {props.children}
        </ContactsContext.Provider>
    );
};

export { useContacts, ContactsProvider };
