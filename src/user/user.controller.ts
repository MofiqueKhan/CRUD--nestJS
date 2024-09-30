import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/create.user.dto';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
