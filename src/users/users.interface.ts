import { User } from './entities/user.entity';

export interface UsersRepository {
  create(user: User): Promise<User>;
  findOne(email: string): Promise<User>;
}

export interface UserServiceImpl {
  createUser(user: User): Promise<User>;
}
