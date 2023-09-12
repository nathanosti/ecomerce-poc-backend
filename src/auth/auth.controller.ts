import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return await this.userService.createUser(registerUserDTO);
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.userService.loginUser(loginUserDTO);

    const payload = {
      email: user.email,
      seller: user.seller,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }
}
