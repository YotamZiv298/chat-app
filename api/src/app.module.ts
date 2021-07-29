import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

@Module({
    // imports: [UsersModule],
    // controllers: [AppController],
    // providers: [AppService, AppGateway],
    imports: [UsersModule],
    controllers: [],
    providers: [AppGateway],
})
export class AppModule {}
