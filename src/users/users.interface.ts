import { User } from './entities/user.entity';

export interface UsersRepository {
  create(user: User): Promise<User>;
}

export interface UserService {
  createUser(user: User): Promise<User>;
}
