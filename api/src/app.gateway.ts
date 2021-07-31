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
    private id: string | string[];
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(
            `\n ---- Client connected: ----\n---- ${client.id} ----`
        );
        this.id = client.handshake.query.id;
        client.join(this.id);
    }

    handleDisconnect(client: Socket) {
        // throw new Error('Method not implemented.');
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // @SubscribeMessage('send-message')
    // handleMessage(client: Socket, text: string): void {
    //     // this.wss.emit('msgToClient', text); TO EVERYONE
    //     client.emit('msgToClient', text);
    // }

    @SubscribeMessage('send-message')
    // handleMessage(recipients: any[], text: string): void {
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody('recipients') recipients: any[],
        @MessageBody('text') text: string
    ): void {
        this.logger.log(`\n----sender-id:----\n----${this.id}----`);
        // this.logger.log(`recievers-ids:  ${recipients}`);

        recipients.forEach((recipient) => {
            this.logger.log(`\n----recieve-id:----\n----${recipient}----`);

            const newRecipients = recipients.filter((r) => r !== recipient);

            this.logger.log(
                `\n----newRecipients:----\n----${newRecipients}----`
            );
            newRecipients.push(this.id);
            this.logger.log(
                `\n----newRecipients:----\n----${newRecipients}----`
            );
            client.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients,
                sender: this.id,
                text,
            });
        });

        // recipients.forEach((recipient) => {
        //     this.logger.log(`recieve-id:   ${recipient}`);
        //     const newRecipients = recipients.filter((r) => r !== recipient);
        //     newRecipients.push(this.id);
        //     this.server.to(recipient).emit('receive-message', {
        //         recipients: newRecipients,
        //         sender: this.id,
        //         text,
        //     });
        // });
    }
}
