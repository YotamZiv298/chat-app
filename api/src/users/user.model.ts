import { Contact } from 'src/contacts/contact.model';

export class User {
    constructor(
        public id: string,
        public chats: { recipients: any; messages: any[] }[],
        public contacts: Contact[]
    ) {}
}
