import { Injectable, NotFoundException } from '@nestjs/common';

import { Contact } from './contact.model';

@Injectable()
export class ContactsService {
    private contacts: Contact[] = [];
}
