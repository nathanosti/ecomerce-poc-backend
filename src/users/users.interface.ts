import { LoginUserDTO, RegisterUserDTO } from 'src/auth/auth.dto';
import { User } from './entities/user.entity';

export interface UsersRepository {
  create(user: RegisterUserDTO): Promise<User>;
  findOne(email: string): Promise<User>;
}

export interface UserServiceImpl {
  createUser(user: RegisterUserDTO): Promise<User>;
  loginUser(userAuthData: LoginUserDTO): Promise<User>;
  findByPayload(payload: any): Promise<User>;
}
