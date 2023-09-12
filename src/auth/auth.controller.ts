import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return await this.userService.createUser(registerUserDTO);
  }
}
