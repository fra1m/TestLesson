import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty({
    example: '56',
    description: 'Оценка за занятие',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  score: number;
}
