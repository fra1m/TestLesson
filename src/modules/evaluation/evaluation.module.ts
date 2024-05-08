import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationEntity } from '@entities/Evaluation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([EvaluationEntity]),
  ],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}
