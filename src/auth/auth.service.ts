import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)

        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any){
        const payload = { email: user.email, sub: user.id}
        return {
            access_token: this.jwtService.signAsync(payload)
        }
    }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await this.usersService.create({email,password: hashedPassword})

        return user;
    }
}
