import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alert.entity';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  findAll(buildingId?: string) {
    return this.alertRepository.find(
      buildingId
        ? {
            where: {
              building: {
                id: buildingId,
              },
            },
          }
        : undefined,
    );
  }

  create(alert: CreateAlertDto) {
    return this.alertRepository.save(alert);
  }
}
