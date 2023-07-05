import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  update(@Req() req: Express.Request, @Body() body: UpdateUserDto) {
    return this.userService.update(req.user, body);
  }
}
