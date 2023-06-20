import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import hashPassword from 'src/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async generateAccessToken(user: User) {
    return this.jwt.signAsync(user);
  }

  async validateUser(user: Pick<User, 'id' | 'password'>) {
    const { id, password } = user;
    const findUser = await this.user.findOneBy({
      id,
      password: hashPassword(password),
    });

    if (!findUser) throw new HttpException('Invalid credentials', 401);

    return findUser;
  }

  async createUser(req: Omit<User, 'uuid'>) {
    const user = this.user.create(req);
    await this.user.insert(user);
    return user;
  }
}
