import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return await this.userService.createUser(registerUserDTO);
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return await this.userService.loginUser(loginUserDTO);
  }
}
