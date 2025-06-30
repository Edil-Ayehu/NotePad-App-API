import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async create(user: Partial<User>) : Promise<User>{
        const newUser = this.userRepository.create(user)

        return await this.userRepository.save(newUser)
    }

    public async findById(id: number){
        const user = this.userRepository.findOne({where: {id}})

        if(!user) {
            throw new NotFoundException("User not found with the provided id number")
        }

        return user;
    }

    public async findByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}})

        if(!user) {
            throw new NotFoundException("User not found with the provided email.")
        }

        return user
    }
}
