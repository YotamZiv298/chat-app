import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UsersService {
    private users: User[] = [];

    addUser(nickname: string): string {
        const id = Math.random().toString();
        const newUser = new User(id, nickname);

        this.users.push(newUser);

        return id;
    }

    getUser(id: string): User {
        const [user, index] = this.findUser(id);

        return { ...user };
    }

    getUsers(): User[] {
        return [...this.users];
    }

    updateUser(id: string, nickname: string) {
        const [user, index] = this.findUser(id);
        const updatedUser = { ...user };

        if (nickname) {
            updatedUser.nickname = nickname;
        }

        this.users[index] = updatedUser;
    }

    deleteUser(id: string) {
        const [user, index] = this.findUser(id);
        this.users.splice(index, 1);
    }

    private findUser(id: string): [User, number] {
        const index = this.users.findIndex((prod) => prod.id === id);
        const user = this.users[index];

        if (!user) {
            throw new NotFoundException('Could not find user.');
        }

        return [user, index];
    }
}
