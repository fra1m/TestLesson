import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PutEvolutionLessonDto {
  @ApiProperty({
    example: '3',
    description: 'Айди пользователя кому ставят оценку',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  user_id: number;

  @ApiProperty({
    example: '56',
    description: 'Оценка за занятие',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  score: number;
}
