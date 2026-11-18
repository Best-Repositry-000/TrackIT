import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity.js';

export enum Status {
    ACTIVE = 'active',
    COMPLETED = 'completed'
}

@Entity()
export class Goal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    deadline: Date;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

    @ManyToOne(() => User, user => user.goals)
    @JoinColumn({ name: 'userId' })
    user: User;
}