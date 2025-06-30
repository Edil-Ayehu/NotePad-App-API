import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Post()
    create(@Body() user: Partial<User>) {
        return this.usersService.create(user)
    }

    @Get(":email")
    findUserByEmail(@Param('email') email: string){
        return this.usersService.findByEmail(email)
    }

    @Get(":id")
    findUserById(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findById(id)
    }
}
