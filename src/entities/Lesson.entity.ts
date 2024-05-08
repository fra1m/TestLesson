import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EvaluationEntity } from './Evaluation.entity';

@Entity({ name: 'lessons' })
export class LessonEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Алгебра',
    description: 'Название урока',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    example: '17',
    description: 'Код урока',
  })
  @Column({ nullable: false, unique: true })
  code: string;

  @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.lesson)
  evaluations: EvaluationEntity[];
}
