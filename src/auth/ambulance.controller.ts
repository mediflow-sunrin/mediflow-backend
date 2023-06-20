import { Body, Controller, Post } from '@nestjs/common';
import { Role } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAmbulancUserDto } from './dto/create-user.dto';

@Controller('auth/ambulance')
export class AmbulanceController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateAmbulancUserDto) {
    const user = await this.authService.createUser({
      ...body,
      type: Role.AMBULANCE,
    });
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }
}
