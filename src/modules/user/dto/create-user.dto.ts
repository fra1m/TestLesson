import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@user.ru', description: 'Почта пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Не корректный email' })
  email: string;

  @ApiProperty({ example: 'Антон', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Matches(/\S/, { message: 'Не должно быть пустым' })
  name: string;
}
