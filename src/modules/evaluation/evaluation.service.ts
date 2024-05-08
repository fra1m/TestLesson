import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationEntity } from '@entities/Evaluation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(EvaluationEntity)
    private evaluationRepository: Repository<EvaluationEntity>,
    private userService: UserService,
  ) {}

  async putEvaluation(
    user_id: number,
    createEvaluationDto: CreateEvaluationDto,
  ) {
    const user = await this.userService.getUserById(user_id);
    return await this.evaluationRepository.save({
      ...createEvaluationDto,
      user,
    });
  }
}
