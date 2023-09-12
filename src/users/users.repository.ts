import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from 'src/auth/auth.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerUserDTO: RegisterUserDTO): Promise<User> {
    const newUser = new this.userModel(registerUserDTO);

    return newUser.save();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
