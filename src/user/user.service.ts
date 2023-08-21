import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(user: User, body: UpdateUserDto) {
    return this.userRepository.update(user.id, {
      name: body.name,
      building:
        body.buildingId === null
          ? null
          : {
              id: body.buildingId,
            },
    });
  }

  updateById(id: string, body: UpdateUserDto) {
    return this.userRepository.update(id, {
      name: body.name,
      building:
        body.buildingId === null
          ? null
          : {
              id: body.buildingId,
            },
    });
  }
}
