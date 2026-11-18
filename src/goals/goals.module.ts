import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Goal } from './goals.entity.js';
import { goalsController } from './goals.controller.js';
import { goalsService } from './goals.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  controllers: [goalsController],
  providers: [goalsService],
  exports: [goalsService],
})
export class GoalsModule {}