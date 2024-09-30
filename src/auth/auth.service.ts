import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/Dtos/create.user.dto';
import { LoginUserDto } from 'src/user/Dtos/login.user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && await this.userService.validatePassword(password, user.password)) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async signup(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
        const user = await this.userService.createUser(createUserDto); // This should work without errors
        const accessToken = this.jwtService.sign({ id: user.id });
        return { accessToken }; // Make sure this returns the expected format
    }
    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id }; // Adjust payload as needed
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    
}
