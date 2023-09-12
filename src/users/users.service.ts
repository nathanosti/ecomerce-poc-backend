import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserServiceImpl } from './users.interface';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from 'src/auth/auth.dto';

@Injectable()
export class UsersService implements UserServiceImpl {
  constructor(private readonly userRepository: UserRepository) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
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
}
