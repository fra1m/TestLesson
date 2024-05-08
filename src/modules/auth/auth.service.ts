import { UserEntity } from '@entities/User.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  // TODO: Можно сделать полную регистрацию с хеширование пароля, но в ТЗ нет такого условия.
  // async registration(userDto: CreateUserDto) {
  //   const hashPassword = await bcrypt.hash(
  //     userDto.password,
  //     +this.configService.get<string>('SALT_ROUNDS'),
  //   );

  //   const user = await this.userService.createUser({
  //     ...userDto,
  //     password: hashPassword,
  //   });
  // }
}
