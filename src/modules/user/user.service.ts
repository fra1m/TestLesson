import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/User.entity';
import { Repository } from 'typeorm';
import { AuthService } from '@modules/auth/auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async registrationUser(createUserDto: CreateUserDto) {
    await this.validateUser(createUserDto.email);

    const user = await this.userRepository.save(createUserDto);
    const token = await this.authService.generateToken(user);
    return { ...user, ...token };
  }

  async authUser(authUserDto: AuthUserDto) {
    const candidate = await this.getUserByEmail(authUserDto.email);

    const token = await this.authService.generateToken(candidate);
    return { ...candidate, ...token };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        'Такой пользователь не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async validateUser(email: string) {
    const candidate = await this.getUserByEmail(email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
