import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    // @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        // throw new Error('Method not implemented.');
        this.logger.log(`Client connected:    ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        // throw new Error('Method not implemented.');
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): void {
        // this.wss.emit('msgToClient', text); TO EVERYONE
        client.emit('msgToClient', text);
    }

}
