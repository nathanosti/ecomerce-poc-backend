import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserServiceImpl } from './users.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements UserServiceImpl {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
