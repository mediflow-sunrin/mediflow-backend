import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@WebSocketGateway(12000)
export class AlertGateway {
  constructor(private readonly alertSerivce: AlertService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createAlert')
  handleAlert(@MessageBody() data: CreateAlertDto) {
    this.alertSerivce.create(data);
    this.server.emit('alert', data);
    return data;
  }
}
