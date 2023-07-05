import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { AlertType } from 'src/entities/alert.entity';

interface RequestAlert {
  type: AlertType;
  title: string;
  message: string;
  buildingId: string;
}

@WebSocketGateway(12000)
export class AlertGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('alert')
  handleAlert(
    @MessageBody() data: RequestAlert,
  ): Omit<RequestAlert, 'buildingId'> {
    this.server.emit('alert', data);
    return data;
  }
}
