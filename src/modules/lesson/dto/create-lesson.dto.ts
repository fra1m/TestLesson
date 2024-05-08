import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'music', description: 'Код урока' })
  @IsString({ message: 'Должно быть строкой' })
  code: string;

  @ApiProperty({ example: 'Музыка', description: 'Название урока' })
  @IsString({ message: 'Должно быть строкой' })
  @Matches(/\S/, { message: 'Не должно быть пустым' })
  name: string;
}
