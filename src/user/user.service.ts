import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './Dtos/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto;
    
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ username, password: hashedPassword });
        await this.userRepository.save(user);
        
        return user; // Return the created user object if needed
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
