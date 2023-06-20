import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminUserDto } from './dto/create-user.dto';
import { Role } from 'src/entities/user.entity';

@Controller('auth/admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateAdminUserDto) {
    const user = await this.authService.createUser({
      ...body,
      type: Role.ADMIN,
    });
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }
}
