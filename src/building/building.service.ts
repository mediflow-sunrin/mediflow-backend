import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/entities/buliding.entity';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  findAll() {
    return this.buildingRepository.find({
      relations: ['users'],
    });
  }

  findOne(id: string) {
    return this.buildingRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
  }

  create(body: CreateBuildingDto) {
    const building = this.buildingRepository.create({
      ...body,
    });
    return this.buildingRepository.save(building);
  }

  update(id: string, body: UpdateBuildingDto) {
    const building = this.buildingRepository.update(id, {
      ...body,
    });
    return building;
  }

  delete(id: string) {
    return this.buildingRepository.delete(id);
  }
}
