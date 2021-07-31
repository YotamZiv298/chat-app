import React from 'react';
import { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext<any | undefined>({} as any);

const useContacts = (): any => {
    return useContext(ContactsContext);
};

type ContactsProviderProps = {
    children: any;
};

const ContactsProvider = (props: ContactsProviderProps) => {
    const [contacts, setContacts] = useLocalStorage('contacts', [] as any);

    const createContact: any = (id: any, name: any) => {
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
