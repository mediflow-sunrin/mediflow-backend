import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessGuard } from './guards/access.guard';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { DebugGuard } from './guards/debug.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AccessGuard)
  async check(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.authService.createUser(body);
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }

  @Post('admin/register')
  @UseGuards(DebugGuard)
  async registerAdmin(@Body() body: CreateUserDto) {
    const user = await this.authService.createUser({
      ...body,
      isAdmin: true,
    });
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }
}
