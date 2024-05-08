import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LessonEntity } from '@entities/Lesson.entity';
import { PutEvolutionLessonDto } from './dto/update-lesson.dto';

@ApiTags('Lessons CRUD')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Cоздание урока' })
  @ApiResponse({ status: 200, type: LessonEntity })
  createLesson(@Body() lessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(lessonDto);
  }

  @Get(':id?')
  @ApiOperation({ summary: 'Получение урока' })
  @ApiParam({
    name: 'id',
    description:
      'Идентификатор урока (есил id не передавать то вернутся все уроки)',
    required: false,
  })
  @ApiResponse({ status: 200, type: [LessonEntity] })
  getAllLesson(@Param() params: { id?: number }) {
    return this.lessonService.getAllLesson(params?.id);
  }

  @Post(':id/evalutions')
  @ApiOperation({ summary: 'Проставление оценки за урок' })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор урока',
  })
  @ApiResponse({ status: 200, type: LessonEntity })
  putEvolutionLesson(
    @Param('id') id: number,
    @Body() putEvolutionLessonDto: PutEvolutionLessonDto,
  ) {
    console.log(id);
    return this.lessonService.putEvolutionLesson(+id, putEvolutionLessonDto);
  }
}
