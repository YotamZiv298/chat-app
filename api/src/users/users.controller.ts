import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    addUser(@Body('nickname') nickname: string) {
        const generatedId = this.usersService.addUser(
            nickname,
        );

        return { id: generatedId };
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
        @Body('nickname') nickname: string,
    ) {
        this.usersService.updateUser(id, nickname);

        return null;
    }

    @Delete(':id')
    removeUser(@Param('id') prodId: string) {
        this.usersService.deleteUser(prodId);

        return null;
    }

}