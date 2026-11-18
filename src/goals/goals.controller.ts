import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { goalsService } from './goals.service.js';
import { CreateGoalDto } from './creategoal.dto.js';
import { UpdateGoalDto } from './updategoal.dto.js';
import { Status } from './goals.entity.js';

@Controller('goals')
export class goalsController {
    constructor(private readonly goalsService: goalsService) {}

    @Post()
    async create(@Body() createGoalDto: CreateGoalDto, userId: string) {
        return this.goalsService.create(createGoalDto, userId);
    }

    @Get()
    async findAll(@Body('userId') userId: string, @Query('status') status?: Status) {
        return this.goalsService.findAll(userId, status);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, userId: string) {
        return this.goalsService.findOne(id, userId);
    }

    @Get(':title')
    async findByTitle(@Param('title') title: string, userId: string) {
        return this.goalsService.findByTitle(title, userId);
    }

    @Patch(':id')
    async updateGoal(@Param('id') id: string, userId: string, @Body() updateGoalDto: UpdateGoalDto) {
        return this.goalsService.updateGoal(id, userId, updateGoalDto);
    }

    @Patch(':id/complete')
    async markAsCompleted(@Param('id') id: string, userId: string) {
        return this.goalsService.complete(id, userId);
    }

    @Delete(':id')
    async deleteGoal(@Param('id') id: string, userId: string) {
        return this.goalsService.deleteGoal(id, userId);
    } 
} 