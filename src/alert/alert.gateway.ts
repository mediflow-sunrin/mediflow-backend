import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(12000)
export class AlertGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('alert')
  handleAlert(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('alert', data);
    return data;
  }
}
