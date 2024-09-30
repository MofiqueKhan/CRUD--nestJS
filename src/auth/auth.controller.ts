import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/Dtos/create.user.dto';
import { LoginUserDto } from '../user/Dtos/login.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post('login') // This will be your login endpoint
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto); // Call your AuthService login method
    }
}
