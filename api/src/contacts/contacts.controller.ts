import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts1241234')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}
}
