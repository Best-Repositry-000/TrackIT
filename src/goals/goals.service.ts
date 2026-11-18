import { Goal, Status } from './goals.entity.js';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoalDto } from './creategoal.dto.js';
import { UpdateGoalDto } from './updategoal.dto.js';
import { User } from '../users/users.entity.js';

@Injectable()
export class goalsService {
    constructor(
        @InjectRepository(Goal)
        private goalRepository: Repository<Goal>
    ) { }

    // Validate that the start date is not later than the deadline  
    private validateDates(startDate?: Date | null, deadline?: Date | null): void {
        if (startDate && deadline && new Date(startDate) > new Date(deadline)) {
            throw new BadRequestException(
                'The deadline cannot be earlier than the start date',
            )
        }
    }

    // Create a new goal and save it to the database
    async create(dto: CreateGoalDto, userId: string): Promise<string> {
        this.validateDates(dto.startDate, dto.deadline);
        const goal = this.goalRepository.create({ ...dto, user: { id: userId } as User, });
        await this.goalRepository.save(goal);
        return 'Goal created successfully';
    }

    // Retrieve all of a user's goals from the database
    async findAll(userId: string, status?: Status) {
        return this.goalRepository.find({
            where: { user: { id: userId }, ...(status ? { status } : {}) },
        });
    }

    // Retrieve a specific goal by its ID and the user's ID
    async findOne(id: string, userId: string) {
        const goal = await this.goalRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!goal) {
            throw new NotFoundException(`Goal with ID ${id} not found`);
        }
        return goal;
    }

    // Retrieve a specific goal(s) by its title and the user's ID
    async findByTitle(title: string, userId: string) {
        const goals = await this.goalRepository.find({
            where: { title, user: { id: userId } },
        });

        if (goals.length === 0) {
            throw new NotFoundException(`No goals found with the title: ${title}`);
        }

        return goals;
    }

    // Update a specific goal by it's ID and the user's ID
    async updateGoal(id: string, userId: string, dto: UpdateGoalDto) {
        const goal = await this.goalRepository.findOne({ where: { id, user: { id: userId } } });
        if (!goal) {
            throw new NotFoundException(`Goal with ID ${id} not found`);
        }
        const startDate = dto.startDate !== undefined ? dto.startDate : goal.startDate;
        const deadline = dto.deadline !== undefined ? dto.deadline : goal.deadline;
        this.validateDates(startDate, deadline);
        Object.assign(goal, dto);
        return this.goalRepository.save(goal);
    }

    // Mark a goal as complete 
    async complete(id: string, userId: string){
        const goal = await this.goalRepository.findOne({ where: { id, user: { id: userId } } });
        if (!goal) {
            throw new NotFoundException(`Goal with ID ${id} not found`);
        }
        goal.status = Status.COMPLETED; 
        return this.goalRepository.save(goal);
    }

    // Delete a specific goal by its ID and the user's ID
    async deleteGoal(id: string, userId: string) {
        const goal = await this.goalRepository.findOne({ where: { id, user: { id: userId } } });
        if (!goal) {
            throw new NotFoundException(`Goal with ID ${id} not found`);
        }
        return this.goalRepository.remove(goal);
    } 
}
