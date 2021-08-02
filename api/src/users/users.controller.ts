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

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body('chat') chat: any,
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
