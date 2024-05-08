import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@entities/User.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';

@ApiTags('User CRUD')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cоздание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('/registration')
  registrationUser(@Body() userDto: CreateUserDto) {
    return this.userService.registrationUser(userDto);
  }

  @ApiOperation({ summary: 'Cоздание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('/auth')
  authUser(@Body() userDto: AuthUserDto) {
    return this.userService.authUser(userDto);
  }

  @ApiOperation({ summary: 'Получение все пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.userService.getAllUsers();
  }
}
