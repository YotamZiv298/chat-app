import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: [ChatGateway, AppGateway],
})
export class AppModule {}
