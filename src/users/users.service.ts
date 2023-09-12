import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserServiceImpl } from './users.interface';
import { User } from './entities/user.entity';
import { LoginUserDTO, RegisterUserDTO } from 'src/auth/auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements UserServiceImpl {
  constructor(private readonly userRepository: UserRepository) {}

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async createUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const { email } = registerUserDTO;

    const user = await this.userRepository.findOne(email);

    if (user) {
      throw new HttpException('User Already existis', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.userRepository.create(registerUserDTO);

    return this.sanitizeUser(createdUser);
  }

  async loginUser(userAuthData: LoginUserDTO): Promise<User> {
    const { email, password } = userAuthData;

    const user = await this.userRepository.findOne(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
