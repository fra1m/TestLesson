import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonEntity } from '@entities/Lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationService } from '@modules/evaluation/evaluation.service';
import { PutEvolutionLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
    private evaluationService: EvaluationService,
  ) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const candidate = await this.getLessonByCode(createLessonDto.code);

    console.log(candidate);
    if (candidate) {
      throw new HttpException(
        'Такой урок уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.lessonRepository.save(createLessonDto);
  }

  async getAllLesson(id?: number) {
    const queryOptions = id !== undefined ? { where: { id } } : {};
    const lessons = await this.lessonRepository.find({
      ...queryOptions,
      relations: {
        evaluations: true,
      },
    });

    if (!lessons.length) {
      throw new HttpException('Такой урок не существует', HttpStatus.NOT_FOUND);
    }

    return lessons;
  }

  async putEvolutionLesson(
    id: number,
    putEvolutionLessonDto: PutEvolutionLessonDto,
  ) {
    const { user_id, score } = putEvolutionLessonDto;
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: {
        evaluations: true,
      },
    });
    if (!lesson) {
      throw new HttpException('Такой урок не существует', HttpStatus.NOT_FOUND);
    }

    const existingEvaluation = lesson.evaluations.find(
      (evaluation) => evaluation.user.id === user_id,
    );
    if (existingEvaluation) {
      throw new HttpException(
        'Оценка уже была поставлена этому пользователю',
        HttpStatus.BAD_REQUEST,
      );
    }

    const evaluation = await this.evaluationService.putEvaluation(user_id, {
      score,
    });

    lesson.evaluations.push(evaluation);
    await this.lessonRepository.save(lesson);
    return { id, user_id, score };
  }

  async getLessonByCode(code: string) {
    return await this.lessonRepository.findOne({
      where: { code },
    });
  }
}
