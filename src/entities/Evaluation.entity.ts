import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './User.entity';
import { LessonEntity } from './Lesson.entity';

@Entity({ name: 'evolutions' })
export class EvaluationEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '56',
    description: 'Оценка за занятие',
  })
  @Column({ nullable: false })
  score: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.evaluations)
  lesson: LessonEntity;

  @ManyToOne(() => UserEntity, (user) => user.evaluations, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
