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

    const createContact: any = async (id: any, name: any) => {
        const reqOptions = {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                chat: undefined,
                contact: { id, name },
            }),
        };
        await fetch(`http://localhost:5000/users/${props.id}`, reqOptions);

        setContacts((prevContacts: any) => {
            return [...prevContacts, { id, name }];
        });
    };

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {props.children}
        </ContactsContext.Provider>
    );
};

export { useContacts, ContactsProvider };
