import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { AlertGateway } from './alert.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  controllers: [AlertController],
  providers: [AlertService, AlertGateway],
})
export class AlertModule {}
