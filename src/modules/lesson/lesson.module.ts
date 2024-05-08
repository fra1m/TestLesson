import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonEntity } from '@entities/Lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationModule } from '@modules/evaluation/evaluation.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    EvaluationModule,
    AuthModule,
    TypeOrmModule.forFeature([LessonEntity]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
