import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Goal } from '../goals/goals.entity.js';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Goal, goal => goal.user)
    goals: Goal[];

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}