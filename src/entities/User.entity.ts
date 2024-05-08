import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EvaluationEntity } from './Evaluation.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Антон',
    description: 'ID пользователя из WS',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: 'user@user.ru', description: 'Почта пользователя' })
  @Column({ unique: true, nullable: false })
  email: string;

  @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.user)
  evaluations: EvaluationEntity[];
}
