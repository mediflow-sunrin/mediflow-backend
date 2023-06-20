import { Body, Controller, Post } from '@nestjs/common';
import { CreateHospitalUserDto } from './dto/create-user.dto';
import { Role } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth/hospital')
export class HospitalController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateHospitalUserDto) {
    const user = await this.authService.createUser({
      ...body,
      type: Role.HOSPITAL,
    });
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }
}
