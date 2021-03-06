import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    addUser(@Body('id') id: string) {
        this.usersService.addUser(id);

        return { id: id };
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    @Get(':id/contacts/:contactId')
    getContact(@Param('id') id: string, @Param('contactId') contactId: string) {
        return this.usersService.getContact(id, contactId);
    }

    @Get(':id/contacts')
    getContacts(@Param('id') id: string) {
        return this.usersService.getContacts(id);
    }

    @Get(':id/chats')
    getChats(@Param('id') id: string) {
        return this.usersService.getChats(id);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body('chat') chat: { recipients: any; messages: any[] },
        @Body('contact') contact: { id: string; name: string }
    ) {
        this.usersService.updateUser(id, chat, contact);

        return null;
    }

    @Delete(':id')
    removeUser(@Param('id') userId: string) {
        this.usersService.deleteUser(userId);

        return null;
    }
}
