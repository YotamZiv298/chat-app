import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from 'src/contacts/contact.model';

import { User } from './user.model';

@Injectable()
export class UsersService {
    private users: User[] = [];

    addUser(id: string): void {
        const newUser = new User(id, [], []);

        this.users.push(newUser);
    }

    getUser(id: string): User {
        const [user, index] = this.findUser(id);

        return { ...user };
    }

    getContact(id: string, contactId: string) {
        const [user, index] = this.findUser(id);

        const contact = user.contacts.find(
            (contact) => contact.id === contactId
        );

        return { ...contact };
    }

    getContacts(id: string) {
        const [user, index] = this.findUser(id);

        return [...user.contacts];
    }

    getUsers(): User[] {
        return [...this.users];
    }

    updateUser(
        id: string,
        chat: { recipients: any; messages: any[] },
        contact: { id: string; name: string }
    ) {
        const [user, index] = this.findUser(id);
        const updatedUser = { ...user };

        if (chat) {
            updatedUser.chats = [...user.chats, chat];
        }
        if (contact) {
            updatedUser.contacts = [...user.contacts, contact];
        }

        this.users[index] = updatedUser;
    }

    deleteUser(id: string) {
        const [user, index] = this.findUser(id);
        this.users.splice(index, 1);
    }

    private findUser(id: string): [User, number] {
        const index = this.users.findIndex((user) => user.id === id);
        const user = this.users[index];

        if (!user) {
            throw new NotFoundException('Could not find user.');
        }

        return [user, index];
    }
}
