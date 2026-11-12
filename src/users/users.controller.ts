import {Controller, Post, Body, Patch, Delete, Param, HttpCode, HttpStatus} from '@nestjs/common';
import {UserService} from './users.service.js';
import {CreateUserDto} from './createuser.dto.js';
import {EditUserDto} from './edituser.dto.js';
import {UserLoginDto} from './userlogin.dto.js';

@Controller()
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto>{
        return this.userService.createUser(createUserDto);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    login(@Body() userLoginDto: UserLoginDto){
        return this.userService.loginUser(userLoginDto);
    }

    @Patch()
    edit(@Body() editUserDto: EditUserDto, @Param() id: number){
        return this.userService.editUser(editUserDto, id); 
    }

    @Delete()
    delete(@Param() id:number){
        return this.userService.deleteUser(id);
    }
}