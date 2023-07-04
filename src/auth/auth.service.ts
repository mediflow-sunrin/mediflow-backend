import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly config: ConfigService,
  ) {}

  async generateAccessToken(user: User) {
    return await this.jwt.signAsync(
      { ...user },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      },
    );
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

  async createUser(req: Omit<User, 'uuid' | 'building'>) {
    if (await this.user.findOneBy({ id: req.id }))
      throw new HttpException('User already exists', 409);

    const user = this.user.create({
      ...req,
      password: hashPassword(req.password),
    });
    await this.user.insert(user);
    return user;
  }
}
