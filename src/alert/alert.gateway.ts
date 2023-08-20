import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class AlertGateway {
  constructor(private readonly alertSerivce: AlertService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createAlert')
  handleAlert(@MessageBody() data: CreateAlertDto) {
    this.alertSerivce.create(data).then((res) =>
      this.server.emit('alert-web', {
        ...res,
        buildingId: res.building.id,
      }),
    );
    this.server.emit('alert', data);
    return data;
  }
}
