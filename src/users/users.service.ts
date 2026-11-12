import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './users.entity.js';
import {Repository} from 'typeorm';
import {CreateUserDto} from './createuser.dto.js';
import {UserLoginDto} from './userlogin.dto.js'; 
import {EditUserDto} from './edituser.dto.js';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    // create user
    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const {name, email, password} = createUserDto;
        const existing = await this.userRepository.findOne({where: {email}});
        if (existing) {
            throw new NotFoundException('User with this email already exists');
        }
        const user = this.userRepository.create({name, email, password});
        await this.userRepository.save(user);
        return createUserDto;
    }

    // log in 
    async loginUser(userLoginDto: UserLoginDto){
        const {email, password} = userLoginDto; 
        const foundUser = await this.userRepository.findOne({where: {email}});
        if (!foundUser) {
            throw new NotFoundException('User not found');
        }
        if (foundUser.password !== password){
            throw new NotFoundException('Invalid password');
        }
        return 'Login successful';
    }

    // edit 
    async editUser(editUserDto: EditUserDto, id: number){
        const {name, password} = editUserDto;
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (name) {
            user.name = name;
        }
        if (password) {
            user.password = password;
        }
        await this.userRepository.save(user);
    }

    //delete
    async deleteUser(id: number){
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
} 