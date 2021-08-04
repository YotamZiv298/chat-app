import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    private ids = new Map<Socket, string | string[]>();
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(
            `\n ---- Client connected: ----\n---- ${client.id} ----`
        );
        this.ids.set(client, client.handshake.query.id);
        client.join(client.handshake.query.id);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.ids.delete(client);
    }

    @SubscribeMessage('send-message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody('recipients') recipients: any[],
        @MessageBody('text') text: string
    ): void {
        this.logger.log(
            `\n----sender-id:----\n----${this.ids.get(client)}----`
        );
        recipients.forEach((recipient) => {
            this.logger.log(`\n-----------------------------------------\n`);
            this.logger.log(`\n----recieve-id:----\n----${recipient}----`);

            const newRecipients = recipients.filter((r) => r !== recipient);

            this.logger.log(
                `\n----newRecipients:----\n----${newRecipients}----`
            );
            newRecipients.push(this.ids.get(client));
            this.logger.log(
                `\n----newRecipients:----\n----${newRecipients}----`
            );
            client.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients,
                sender: this.ids.get(client),
                text,
            });
        });
    }
}
